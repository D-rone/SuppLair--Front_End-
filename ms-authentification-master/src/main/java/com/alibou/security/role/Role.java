package com.alibou.security.role;

import com.alibou.security.company.Company;
import com.alibou.security.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    @ElementCollection(targetClass = Permission.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "role_permissions",joinColumns = @JoinColumn(name = "role_id"))
    private List<Permission> permissions;
    @OneToMany(
            mappedBy = "role"
    )
    @JsonManagedReference
    private List<User> users;

    @ManyToOne
    @JoinColumn(name = "company_id")
    @JsonBackReference
    private Company company;


}
