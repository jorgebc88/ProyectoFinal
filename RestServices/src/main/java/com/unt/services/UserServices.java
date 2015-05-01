package com.unt.services;

import com.unt.models.User;

/**
 * Created by Marco on 22/04/2015.
 */
public interface UserServices {
    public User addUser(String name, String password);

    public User login(String name, String password);
}
