package com.unt.models;




import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import java.io.Serializable;

/**
 * Created by Marco on 18/04/2015.
 */
@Entity
@Table(name = "User")
public class User implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "Id")
    private Long userId;

    @Column(name = "userName", unique = true)
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "type")
    private String type;

    public Long getUserId() {
        return userId;
    }

    public User(String userName, String password, String type) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
