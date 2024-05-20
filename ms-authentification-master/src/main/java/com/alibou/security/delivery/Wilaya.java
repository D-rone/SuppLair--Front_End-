package com.alibou.security.delivery;

import com.alibou.security.company.Company;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Wilaya {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String date;

    @ManyToOne
    @JoinColumn(
            name = "company_id"
    )
    @JsonBackReference
    private Company company;


}
