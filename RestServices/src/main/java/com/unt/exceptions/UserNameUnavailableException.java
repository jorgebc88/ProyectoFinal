package com.unt.exceptions;

/**
 * Created by Marco on 21/04/2015.
 */
public class UserNameUnavailableException extends RuntimeException{
    public UserNameUnavailableException() {
        super("User not available!");
    }
}
