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
public class SectorDto {
    private String name;
    private String date;
    public Sector sectorMapper(Company company){
        return Sector.builder()
                .name(this.name)
                .date(this.date)
                .company(company)
                .build();
    }
}
