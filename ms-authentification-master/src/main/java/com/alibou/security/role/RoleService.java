package com.alibou.security.role;

import com.alibou.security.company.Company;
import com.alibou.security.company.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final CompanyRepository companyRepository;


    public Role addRole( RoleRequestDto roleRequestDto){
        Company company= companyRepository.findByName(roleRequestDto.getCompanyName()).orElseThrow();
        Role role= Role.builder()
                .name(roleRequestDto.getRoleName())
                .company(company)
                .permissions(roleRequestDto.getPermissions())
                .build();
        return roleRepository.save(role);
    }

    public List<RoleResponceDto> findAll(String companyName) {
        Company company=companyRepository.findByName(companyName).orElseThrow();
        List<Role> roles=company.getRoles();
        List<RoleResponceDto> roleResponceDtos=new ArrayList<>();
        for(Role role:roles){
            roleResponceDtos.add(RoleResponceDto.builder()
                    .roleName(role.getName())
                            .permissions(role.getPermissions())
                    .build()
            );
        }
        return roleResponceDtos;
    }

    public Role updateRole(RoleUpdated roleUpdated) {
        Company company=companyRepository.findByName(roleUpdated.getCompanyName()).orElseThrow();
        Role role=roleRepository.findByNameAndCompanyId(roleUpdated.getOldRoleName(),company.getId());
        role.setName(roleUpdated.getNewRoleName());
        role.setPermissions(roleUpdated.getPermissions());
        return roleRepository.save(role);

    }
}
