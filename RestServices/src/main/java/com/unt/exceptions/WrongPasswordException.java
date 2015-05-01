package com.unt.exceptions;

/**
 * Created by Marco on 21/04/2015.
 */
public class WrongPasswordException extends RuntimeException{
    public WrongPasswordException() {
        super("Wrong password!");
    }
}
