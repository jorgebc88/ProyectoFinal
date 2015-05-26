package com.unt.dao;

import com.unt.exceptions.UserNameUnavailableException;
import com.unt.exceptions.WrongPasswordException;
import com.unt.models.User;
import com.unt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Marco on 18/04/2015.
 */
@Component
public class UserDAO {

    @Autowired
    UserRepository userRepository;

    public User addUser(String userName, String password, String type) {
        if (!this.userNameAvailable(userName)) {
            throw new UserNameUnavailableException();
        }

        User user = new User(userName, password, type);
        return this.userRepository.save(user);
    }

    public User getUserByName(String name) {
        return userRepository.findByName(name);
    }

    public boolean userNameAvailable(String userName) {
        return this.userRepository.findByName(userName) == null;
    }

    public User login(String name, String password) {
        User user = getUserByName(name);

        if (user.isValidPassword(password)) {
            return user;
        } else {
            throw new WrongPasswordException();
        }
    }


}
