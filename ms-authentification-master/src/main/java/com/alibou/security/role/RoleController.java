package com.alibou.security.role;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @PostMapping("/roles")
    public Role addRole(
            @RequestBody RoleRequestDto roleRequestDto
    ){
        return roleService.addRole(roleRequestDto);
    }

    @GetMapping("/roles/{company-name}")
    public List<RoleResponceDto> findAllRoles(
            @PathVariable("company-name") String companyName
    ){
        return roleService.findAll(companyName);

    }

    @PutMapping("/roles")
    public Role updateRole(
            @RequestBody RoleUpdated roleUpdated){
        return roleService.updateRole(roleUpdated);
    }



}
