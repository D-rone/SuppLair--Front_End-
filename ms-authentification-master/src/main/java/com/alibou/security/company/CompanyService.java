package com.alibou.security.company;

import com.alibou.security.auth.AuthenticationService;
import com.alibou.security.delivery.*;
import com.alibou.security.role.Role;
import com.alibou.security.token.Token;
import com.alibou.security.token.TokenRepository;
import com.alibou.security.user.StateType;
import com.alibou.security.user.User;
import com.alibou.security.user.UserInfosDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final WilayaRepository wilayaRepository;
    private final SectorRepository sectorRepository;
    private final TokenRepository tokenRepository;
    private final AuthenticationService authenticationService;

    public List<CompanyResponseDto> findAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream()
                .filter(company -> !company.getName().equals("Supplier")) // Exclude the company with name "Supplier"
                .map(company -> new CompanyResponseDto(company.getName(), company.getAddress(), company.getStateType()))
                .collect(Collectors.toList());
    }


    public CompanyDetailsDto findCompanyByname(String name) {
        Company company= companyRepository.findByName(name).orElseThrow();
        return CompanyDetailsDto.builder()
                .name(company.getName())
                .address(company.getAddress())
                .fileUrls(company.getFileUrls())
                .stateType(company.getStateType())
                .categories(company.getCategories())
                .build();
    }

    public String updateCompanyDetails(CompanyUpdatedDto companyUpdatedDto) {
        Company company=companyRepository.findByName(companyUpdatedDto.getCompanyName()).orElseThrow();
        Boolean oldState=company.getStateType()==StateType.INACTIVE;
        company.setStateType(companyUpdatedDto.getStateType());
        company.setCategories(companyUpdatedDto.getCategories());
        company=companyRepository.save(company);
        Boolean newState=company.getStateType()==StateType.ACTIVE;
        if(oldState && newState){
        authenticationService.sendSetupEmail(companyUpdatedDto.getEmail(),companyUpdatedDto.getCompanyName());

        }
        return "Company inforormation has beed updated";
    }

    public Company setupCompanyDetails(CompanySetupDto companySetupDto) {
        Company company=companyRepository.findByName(companySetupDto.getName()).orElseThrow();
        for(WilayaDto wilayaDto:companySetupDto.getWilayaList()){
            wilayaRepository.save(wilayaDto.wilayaMapper(company));
        }

        for(SectorDto sectorDto:companySetupDto.getSectorList()){
            sectorRepository.save(sectorDto.sectorMapper(company));
        }
        return  company;
    }

    public CompanyRequestDto getCompanyInfos(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
            Token jwt = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Token not found"));
            if (!jwt.isExpired() && !jwt.isRevoked()) {
                User user = jwt.getUser();
                Company company=user.getCompany();
                List<WilayaDto> wilayaDtos=new ArrayList<>();
                for (Wilaya wilaya : company.getWilayaList()){
                    wilayaDtos.add(WilayaDto.builder()
                                    .name(wilaya.getName())
                                    .date(wilaya.getDate())
                            .build());
                }
                List<SectorDto> sectorDtos=new ArrayList<>();
                for (Sector sector : company.getSectorList()){
                    sectorDtos.add(SectorDto.builder()
                            .name(sector.getName())
                            .date(sector.getDate())
                            .build());
                }
                return CompanyRequestDto.builder()
                        .name(company.getName())
                        .address(company.getAddress())
                        .wilayaList(wilayaDtos)
                        .sectorList(sectorDtos)
                        .build();
            } else {
                throw new RuntimeException("Token invalide");
            }
        } else {
            throw new RuntimeException("Authorization header missing or invalid");
        }
    }

    public String update(HttpServletRequest request,CompanyRequestDto companyRequestDto) {


        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
            Token jwt = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Token not found"));
            if (!jwt.isExpired() && !jwt.isRevoked()) {
                User user = jwt.getUser();
                Company company=user.getCompany();
                company.setName(companyRequestDto.getName());
                company.setAddress(companyRequestDto.getAddress());
                wilayaRepository.deleteAll();
                sectorRepository.deleteAll();
                for (WilayaDto wilayaDto: companyRequestDto.getWilayaList()){
                    wilayaRepository.save(wilayaDto.wilayaMapper(company));
                }
                for (SectorDto sectorDto: companyRequestDto.getSectorList()){
                    sectorRepository.save(sectorDto.sectorMapper(company));
                }

                companyRepository.save(company);
                return "Okk";
            } else {
                throw new RuntimeException("Token invalide");
            }
        } else {
            throw new RuntimeException("Authorization header missing or invalid");
        }
    }

}
