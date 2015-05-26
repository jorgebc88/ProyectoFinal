package com.unt;

import com.unt.services.UserServices;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.FileSystemXmlApplicationContext;

/**
 * Hello world!
 */

//@Configuration
//@ComponentScan(basePackages = "com.unt")
//@EnableAutoConfiguration
//@SpringBootApplication
public class App {
    public static void main(String[] args)

    {
        /*
        //ConfigurableApplicationContext context = new FileSystemXmlApplicationContext()//("C:\\finalProject\\ProyectoFinal\\RestServices\\src\\main\\resources\\application.properties");//SpringApplication.run(App.class);
        //ApplicationContext ctx = new AnnotationConfigApplicationContext();
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
        ctx.register(App.class);
        ctx.scan("com.unt");
        ctx.refresh();
        UserServices userServices = ctx.getBean(UserServices.class);

        System.out.println("Hello World!");
        */
    }

}
