package com.alibou.security.role;

import com.alibou.security.company.Company;
import com.alibou.security.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role,Integer> {
    public Role findByName(String name);
    public  Role findByNameAndCompanyId(String name, Integer companyId);
}
