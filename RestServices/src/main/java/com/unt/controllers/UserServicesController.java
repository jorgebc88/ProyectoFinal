package com.unt.controllers;

import com.unt.models.User;
import com.unt.models.UserSession;
import com.unt.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Marco on 01/05/2015.
 */

@RestController
@RequestMapping("/users")
public class UserServicesController {

    @Autowired
    private UserServices userServices;
    @Autowired
    private UserSession userSession;


    /**
     * Creates a new user for the system
     *
     * @param userName The new user name
     * @param password The password for the new user
     * @param type     The type of user to be created (Admin or a regular user)
     * @return
     */
    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public @ResponseBody User addUser(@RequestParam("name") String userName, @RequestParam("password") String password, @RequestParam("type") String type) {
        return this.userServices.addUser(userName, password, type);
    }

    @RequestMapping(value = "/prueba", method = RequestMethod.GET)
    public @ResponseBody String prueba(){
        return "Hello World!!";
    }

    
    /**
     * Provides the service required for the user to login
     *
     * @param userName The name of the user who wants to login.
     * @param password The user's password.
     * @return
     */

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody User login(@RequestParam("userName") String userName, @RequestParam("password") String password) {
        User user = this.userServices.login(userName, password);
        userSession.setUser(user);
        return user;
    }

}
