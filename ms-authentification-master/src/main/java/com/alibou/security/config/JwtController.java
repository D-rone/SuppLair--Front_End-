package com.alibou.security.config;

import com.alibou.security.company.Company;
import com.alibou.security.delivery.SectorDto;
import com.alibou.security.delivery.WilayaDto;
import com.alibou.security.token.Token;
import com.alibou.security.token.TokenRepository;
import com.alibou.security.user.User;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class JwtController {
    private final TokenRepository tokenRepository;

    @PostMapping("/verify-token")
    public JwtDto verifyToken(@RequestParam String token) {
        JwtDto jwtDto = JwtDto.builder()
                .isValid(false) // corrected spelling
                .userId(0)
                .build();
        Optional<Token> jwt = tokenRepository.findByToken(token);
        if(jwt.isPresent()){
            if (!jwt.get().isExpired() && !jwt.get().isRevoked()) {
                jwtDto.setIsValid(true);
                jwtDto.setUserId(jwt.get().getUser().getId());
                return jwtDto;
            }
        }
        return jwtDto;


    }


}
