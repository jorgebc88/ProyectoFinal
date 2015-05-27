package com.unt.services;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;

import com.unt.models.User;

/**
 * Created by Marco on 25/05/2015.
 */
@Service
@Configurable
public class UserServicesImp implements UserServices {

    public User prueba() {
        User testUser = new User("Marco","Ciotola");
        return testUser;
    }
}
