package com.alibou.security.company;

import com.alibou.security.user.StateType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyResponseDto {
    private String name;
    private String address;
    private StateType stateType;


}
