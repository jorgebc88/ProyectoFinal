package com.unt.exceptions;

/**
 * Created by Marco on 21/04/2015.
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String user) {
        super("Username " + "\"" + user + "\"" + "not found");
    }
}
