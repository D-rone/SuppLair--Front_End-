package com.alibou.security.auth;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@FeignClient(name="FileUploadService" , url = "localhost:3000")
public interface FileUploadProxy {

    @PostMapping("/api/upload/{directory}")
    public List<String> uploadFiles(@PathVariable String directory ,
                                    @RequestParam("files")List<MultipartFile> files );


    @PostMapping("/api/test")
    public String test();

}
