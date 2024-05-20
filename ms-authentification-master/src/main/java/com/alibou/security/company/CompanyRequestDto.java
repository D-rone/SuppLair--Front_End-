package com.alibou.security.company;

import com.alibou.security.delivery.Sector;
import com.alibou.security.delivery.SectorDto;
import com.alibou.security.delivery.Wilaya;
import com.alibou.security.delivery.WilayaDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyRequestDto {
    private String name;
    private String address;
    private List<WilayaDto> wilayaList;
    private List<SectorDto> sectorList;


}
