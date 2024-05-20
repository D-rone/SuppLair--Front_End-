package com.alibou.security.delivery;

import com.alibou.security.company.Company;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WilayaDto {
    private String name;
    private String date;

    public Wilaya wilayaMapper(Company company){
        return Wilaya.builder()
                .name(this.name)
                .date(this.date)
                .company(company)
                .build();
    }


}
