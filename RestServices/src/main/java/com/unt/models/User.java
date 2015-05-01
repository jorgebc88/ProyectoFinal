package com.unt.models;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Marco on 18/04/2015.
 */
@Entity
@Table(name = "USERS")
public class User implements Serializable{

    @Id
    @GeneratedValue
    @Column(name = "Id")
    private Long userId;

    @Column(name = "userName", unique = true)
    private String userName;

    @Column(name = "password")
    private String password;

    public Long getUserId() {
        return userId;
    }

    public User(String userName, String password) {
        super();
        this.userName = userName;
        this.password = password;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isValidPassword(String password) {
        return (this.password.equals(password));
    }

}
