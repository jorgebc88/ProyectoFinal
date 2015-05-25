package com.unt.configuration;

import com.unt.services.UserServices;
import com.unt.services.UserServicesImp;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Marco on 25/05/2015.
 */
@Configuration
@ComponentScan(basePackages = "com.unt")
public class AppConfig {

    @Bean
    public UserServices userServices () {
        return new UserServicesImp();
    }
}
