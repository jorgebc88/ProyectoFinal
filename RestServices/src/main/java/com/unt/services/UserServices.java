package com.unt.services;

import com.unt.models.User;
import org.springframework.stereotype.Service;

/**
 * Created by Marco on 22/04/2015.
 */
@Service
public interface UserServices {
    public User addUser(String name, String password, String type);

    public User login(String name, String password);
}
