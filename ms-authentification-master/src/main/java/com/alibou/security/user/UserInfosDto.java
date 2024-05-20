package com.alibou.security.user;

import com.alibou.security.role.Permission;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfosDto {
    private String fullname;
    private String email;
    private List<Permission> permissions;
}
