package com.alibou.security.company;

import com.alibou.security.delivery.Sector;
import com.alibou.security.delivery.Wilaya;
import com.alibou.security.role.Role;
import com.alibou.security.user.StateType;
import com.alibou.security.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Company {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String name;
    private String address;
    @Enumerated(EnumType.STRING)
    private StateType stateType;
    @ElementCollection(targetClass = Category.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "company_categories",joinColumns = @JoinColumn(name = "company_id"))
    private List<Category> categories;
    @OneToMany(mappedBy = "company")
    @JsonManagedReference
    private List<FileMetadata> fileUrls;

    @OneToMany(mappedBy = "company")
    @JsonManagedReference
    private List<User> empoloyees;

    @OneToMany(mappedBy = "company")
    @JsonManagedReference
    private List<Wilaya> wilayaList;


    @OneToMany(mappedBy = "company")
    @JsonManagedReference
    private List<Sector> sectorList;

    @OneToMany(mappedBy = "company")
    @JsonManagedReference
    private List<Role> roles;




}
