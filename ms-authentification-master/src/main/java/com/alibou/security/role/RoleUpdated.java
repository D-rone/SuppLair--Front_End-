package com.alibou.security.role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleUpdated {
    private String companyName;
    private String oldRoleName;
    private String newRoleName;
    private List<Permission> permissions;
}
