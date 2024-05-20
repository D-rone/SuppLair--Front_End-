package com.alibou.security.user;

import java.util.List;
import java.util.Optional;

import com.alibou.security.company.Company;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);
  List<User> findAllByCompany(Company company);
}
