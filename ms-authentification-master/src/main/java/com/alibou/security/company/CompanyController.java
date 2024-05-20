package com.alibou.security.company;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping("/companies")
    public List<CompanyResponseDto> findCompanies() {
        return companyService.findAllCompanies();
    }


    @GetMapping("/companies/{company-name}")
    public CompanyDetailsDto findCompanyByName(
            @PathVariable("company-name") String name
    ){
        return companyService.findCompanyByname(name);
    }

    @PutMapping("/companie")
    public String updateCompanyDetails(
            @RequestBody CompanyUpdatedDto companyUpdatedDto
    ){
        return companyService.updateCompanyDetails(companyUpdatedDto);
    }


    @GetMapping("/company-infos")
    public CompanyRequestDto getCompanyInfos(
            HttpServletRequest request
    ){
        return companyService.getCompanyInfos(request);
    }

    @PutMapping("/update-company-infos")
    public String updateCompanyInfos(
            HttpServletRequest request,
            @RequestBody CompanyRequestDto companyRequest
    ){
        return companyService.update(request,companyRequest);
    }





}
