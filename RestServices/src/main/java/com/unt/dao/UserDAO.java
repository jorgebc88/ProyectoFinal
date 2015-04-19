package com.unt.dao;

import com.unt.models.User;
import com.unt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Marco on 18/04/2015.
 */
@Component
public class UserDAO {

    @Autowired
    UserRepository userRepository;

    public List<User> getUsersByName(String name){
        return userRepository.findByName(name);
    }

}
