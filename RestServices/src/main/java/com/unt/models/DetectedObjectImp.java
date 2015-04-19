package com.unt.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Calendar;


/**
 * Created by Marco on 18/04/2015.
 */
public class DetectedObjectImp implements DetectedObject, Serializable{

    @Id
    @Column(name = "object_Id")
    private Long id;

    @Column(name = "direction")
    private String direction;

    @Column(name = "objectType")
    private String ObjectType;

    @Column(name = "date")
    private Calendar date;

    public DetectedObjectImp(Long id, String direcction, String objectType, Calendar date) {
        this.id = id;
        this.direction = direcction;
        ObjectType = objectType;
        this.date = date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public void setObjectType(String objectType) {
        ObjectType = objectType;
    }

    public void setDate(Calendar date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public String getDirection() {
        return direction;
    }

    public String getObjectType() {
        return ObjectType;
    }

    public Calendar getDate() {
        return date;
    }
}
