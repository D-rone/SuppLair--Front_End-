package com.alibou.security.company;

import com.alibou.security.user.StateType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyUpdatedDto {
    private String email;
    private String companyName;
    @Enumerated(EnumType.STRING)
    private StateType stateType;
    private List<Category> categories;
}
