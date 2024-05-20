package com.alibou.security.auth;

import com.alibou.security.company.Company;
import com.alibou.security.company.CompanyDto;
import com.alibou.security.company.CompanyRepository;
import com.alibou.security.config.JwtService;
import com.alibou.security.role.Permission;
import com.alibou.security.role.Role;
import com.alibou.security.role.RoleRepository;
import com.alibou.security.token.Token;
import com.alibou.security.token.TokenRepository;
import com.alibou.security.token.TokenType;
import com.alibou.security.user.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final CompanyRepository companyRepository;
  private final EmailSenderService emailSenderService;

  @Autowired
  FileUploadProxy fileUploadProxy;

  public String userRegister(RegisterRequest request) {
    Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
    if (existingUser.isEmpty()) {
      Company company = Company.builder()
              .name(request.getCompanyName())
              .stateType(StateType.INACTIVE)
              .build();
      Company savedCompany = companyRepository.save(company);
      Role role = Role.builder()
              .name("admin")
              .permissions(List.of(
                      Permission.HOME,
                      Permission.INVENTORY,
                      Permission.SALES,
                      Permission.ANNOUCEMENT,
                      Permission.USERS,
                      Permission.BILLING))
              .company(savedCompany)
              .build();
      Role savedRole = roleRepository.save(role);
      User user = User.builder()
              .fullname(request.getFullname())
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .stateType(StateType.ACTIVE)
              .company(savedCompany)
              .role(savedRole)
              .build();
      userRepository.save(user);
      return "user created successfully";
    } else {
      throw new RuntimeException("Email already exists: " + request.getEmail());
    }
  }


  public String companyRegister(CompanyDto companyDto,List<MultipartFile> files) {
    Company savedCompany = companyRepository.findByName(companyDto.getName()).orElseThrow();
    savedCompany.setAddress(companyDto.getAddress());
//    savedCompany.setFileUrls();
    companyRepository.save(savedCompany);
    return "Company created successfully";


  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = userRepository.findByEmail(request.getEmail())
        .orElseThrow();
    var company=companyRepository.findById(user.getCompany().getId()).orElseThrow();
    if(user.getStateType()==StateType.INACTIVE || company.getStateType()!=StateType.ACTIVE){
      throw new RuntimeException("Account inactive");
    }
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
        .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.userRepository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }

  public String sendSetupEmail(String email,String companyName) {

    String subject = "Your Account Activation";
    String message = "Hello,\n" +
            "\n" +
            "We hope this email finds you well. We wanted to inform you that your account for " +companyName+" Company has" +
            " been successfully activated. Thank you for choosing us as your service provider.\n" +
            "Please follow the link to complete the setup of your company information: http://localhost:8080/api/v1/auth/setup/"+companyName+
            "\n" +
            "Thank you,\n";
    emailSenderService.sendEmail(email, subject, message);
    return "email sended";
  }

  public String sendEmail(String email) {
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new NoSuchElementException("User not found for email: " + email));
    Token token=tokenRepository.findValidTokenByUser(user.getId());
    token.setPasswordforgetten(true);
    tokenRepository.save(token);

    String subject = "Password Reset";
    String message = "Hello,\n" +
            "\n" +
            "You've requested to reset your password. Please follow the link to proceed:\n" +
            "http://localhost:8080/api/v1/auth/reset-password/"+token.getToken() +
            "\n" +
            "Thank you,\n";
    emailSenderService.sendEmail(email, subject, message);
    return "email sended";
  }


  public String resetPassword(PasswordDto passwordDto) {
    Token token=tokenRepository.findByToken(passwordDto.getToken()).orElseThrow();
    if(token.expired==false && token.revoked==false && token.passwordforgetten==true){
      User user=token.getUser();
      user.setPassword(passwordEncoder.encode(passwordDto.getPassword()));
      userRepository.save(user);
      token.passwordforgetten=false;
      tokenRepository.save(token);
    }else{
      throw new RuntimeException("Token invalide");
    }
    return "OK";
  }

  public User invite(UserDto userDto) {
      Company company=companyRepository.findByName(userDto.getCompanyName()).orElseThrow();
      Role role=roleRepository.findByNameAndCompanyId(userDto.getRoleName(),company.getId());
      User user =userRepository.save(User
                      .builder()
                      .stateType(StateType.ACTIVE)
                      .company(company)
                      .role(role)
                      .email(userDto.getEmail())
                      .fullname(userDto.getFullname())
                      .build());
      sendInvitationEmail(user.getEmail(),userDto.getCompanyName());
      return user;
  }
  public String sendInvitationEmail(String email,String companyName) {
    String subject = "Registration invitation";
    String message = "Hello,\n" +
            "\n" +
            "Join us on Supplier Platform!\n" +
            "\n" +
            "You are invite by " +companyName+ " Company to register on the Supplier palteform\n" +
            "\n" +
            "Register here: http://localhost:8080/api/v1/auth/register?email="+email + "\n"+
            "\n" +
            "Looking forward to seeing you there!\n" +
            "\n" +
            "Best regards,\n";
    emailSenderService.sendEmail(email, subject, message);
    return "email sended";
  }

  public AuthenticationResponse authenticateMembre(AuthenticationRequest request) {
    User user=userRepository.findByEmail(request.getEmail()).orElseThrow();
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    userRepository.save(user);
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
  }

  public Boolean isPasswordForgetten(String token) {
    Token jwt=tokenRepository.findByToken(token).orElseThrow();
    return jwt.passwordforgetten;
  }

  public Boolean isAdminRegister(){
    Optional<User> user=userRepository.findByEmail("admin@gmail.com");
    return user.isPresent();

  }


  public String AdminRegister() {
    RegisterRequest request=RegisterRequest.builder()
            .companyName("Supplier")
            .email("admin@gmail.com")
            .fullname("superadmin")
            .password("aaa")
            .build();
    if (!isAdminRegister())  { userRegister(request); };
    User user=userRepository.findByEmail("admin@gmail.com").orElseThrow();
    List<Permission> permissions=new ArrayList<>();
    permissions.add(Permission.SUPERADMIN);
    Role role=user.getRole();
    role.setPermissions(permissions);
    user.setStateType(StateType.ACTIVE);
    Company company=user.getCompany();
    company.setAddress("sba");
    roleRepository.save(role);
    company.setStateType(StateType.ACTIVE);
    userRepository.save(user);
    companyRepository.save(company);
    return "Admin register";

  }
}
