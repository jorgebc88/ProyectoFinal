package com.unt.services;

import com.unt.dao.UserDAO;
import com.unt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;

/**
 * Created by Marco on 22/04/2015.
 */

@Service
@Configurable
public class UserServicesImp implements UserServices {

    @Autowired
    UserDAO userDao;

    @Override
    public User addUser(String name, String password, String type) {
        return this.userDao.addUser(name, password, type);
    }

    @Override
    public User login(String name, String password) {
        return this.userDao.login(name, password);
    }
}
