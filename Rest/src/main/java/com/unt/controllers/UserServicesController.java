package com.unt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.unt.models.User;
import com.unt.services.UserServices;

/**
 * Created by Marco on 25/05/2015.
 */

@RestController
@RequestMapping("/user")
public class UserServicesController {

    @Autowired
    private UserServices userServices;

    @RequestMapping(value = "/test", method = RequestMethod.GET, headers="Accept=application/json")
    public @ResponseBody User prueba(){
        return this.userServices.prueba();
    }
}
