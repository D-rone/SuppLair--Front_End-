package com.alibou.security.user;

import com.alibou.security.auth.AuthenticationController;
import com.alibou.security.auth.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/invite-user")
    public User invite(
            @RequestBody UserDto userDto
    ){
        return authenticationService.invite(userDto);
    }

    @GetMapping("/users/{company-name}")
    public List<UserDetailsDto> showUser(
            @PathVariable("company-name") String companyName
    ){
        return userService.showUsers(companyName);
    }

    @PatchMapping("/users")
    public String editUser(
            @RequestBody UserUpdatedDto userUpdatedDto
    ){
        return userService.editUser(userUpdatedDto);
    }

    @GetMapping("/user-infos")
    public UserInfosDto getUser(
             HttpServletRequest request
    ){
        return userService.showUser(request);
    }



    @PutMapping("/change-password")
    public String changePassword(
            HttpServletRequest request,
            @RequestBody  PasswordChangedDto passwordChangedDto
    ){
        return userService.changePassword(request,passwordChangedDto);
    }

    @PutMapping("/update-user-infos")
    public String update(
            HttpServletRequest request,
            @RequestBody String fullname

    ){
        return userService.update(request,fullname);
    }




}
