package com.alibou.security.company;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileMetadata {

    @Id
    @GeneratedValue
    private Integer id;
    private String fileUrl;


    @ManyToOne
    @JoinColumn(name = "company_id")
    @JsonBackReference
    private Company company;

}
