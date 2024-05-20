package com.alibou.security.company;

import com.alibou.security.delivery.SectorDto;
import com.alibou.security.delivery.WilayaDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanySetupDto {
    private String name;
    private List<WilayaDto> wilayaList;
    private List<SectorDto> sectorList;
}
