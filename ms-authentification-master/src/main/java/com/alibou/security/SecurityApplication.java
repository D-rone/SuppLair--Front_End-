package com.alibou.security;
import com.alibou.security.auth.AuthenticationService;
import com.alibou.security.auth.EmailSenderService;
import com.alibou.security.company.Company;
import com.alibou.security.role.Permission;
import com.alibou.security.role.Role;
import com.alibou.security.user.StateType;
import com.alibou.security.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;

import java.util.ArrayList;
import java.util.List;


@SpringBootApplication
@RequiredArgsConstructor
@EnableFeignClients
public class SecurityApplication {


	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);

	}
	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service
	) {
		return args -> {
			service.AdminRegister();
		};
	}


}
