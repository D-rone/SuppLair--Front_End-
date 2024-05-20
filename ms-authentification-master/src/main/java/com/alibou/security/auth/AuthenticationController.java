package com.alibou.security.auth;

import com.alibou.security.company.Company;
import com.alibou.security.company.CompanyDto;
import com.alibou.security.company.CompanyService;
import com.alibou.security.company.CompanySetupDto;
import com.alibou.security.role.Role;
import com.alibou.security.role.RoleRepository;
import com.alibou.security.user.User;
import com.alibou.security.user.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService authenticationService;
  private final CompanyService companyService;

  @PostMapping("/register/user-infos")
  public String userRegister(
      @RequestBody RegisterRequest request
  ) {
    return authenticationService.userRegister(request);
  }

  @PostMapping("/register/company-infos")
  public String companyRegister(
          @ModelAttribute CompanyDto companyDto,
          @RequestParam("files") List<MultipartFile> files
          ){
    return authenticationService.companyRegister(companyDto, files);
  }


  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(authenticationService.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    authenticationService.refreshToken(request, response);
  }

  @PutMapping("/company/setup")
  public Company setupCompany(
          @RequestBody CompanySetupDto companySetupDto
  ){
    return companyService.setupCompanyDetails(companySetupDto);
  }

  @PostMapping("/send-email")
  public String sendEmail(
          @RequestBody String email
  ){
     return authenticationService.sendEmail(email);
  }

  @PostMapping("/reset-password")
  public String resetPassword(
          @RequestBody PasswordDto passwordDto
  ){
    return authenticationService.resetPassword(passwordDto);
  }

  @PostMapping("/is-password-forgetten")
  public Boolean isPasswordForgetten(
          @RequestBody String token){
    return authenticationService.isPasswordForgetten(token);
  }


  @PutMapping("/authenticate-as-invited")
  public ResponseEntity<AuthenticationResponse> authenticateMembre(
          @RequestBody AuthenticationRequest request
  ){
      return ResponseEntity.ok(authenticationService.authenticateMembre(request));
  }











}
