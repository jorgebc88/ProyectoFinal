package com.unt;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

import com.unt.configuration.AppConfig;
import com.unt.services.UserServices;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {

        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(AppConfig.class); // another alternative: ctx.scan("com.unt");
        ctx.scan("com.unt");
        ctx.refresh();
    }
}
