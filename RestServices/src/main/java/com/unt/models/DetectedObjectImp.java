package com.unt.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Calendar;
import java.util.GregorianCalendar;


/**
 * Created by Marco on 18/04/2015.
 */
public class DetectedObjectImp implements DetectedObject, Serializable{

    @Id
    @Column(name = "object_Id")
    private Long id;

    @Column(name = "direcction")
    private String direcction;

    @Column(name = "objectType")
    private String ObjectType;

    @Column(name = "date")
    private Calendar date;

    public DetectedObjectImp(Long id, String direcction, String objectType, Calendar date) {
        this.id = id;
        this.direcction = direcction;
        ObjectType = objectType;
        this.date = date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDirecction(String direcction) {
        this.direcction = direcction;
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

    public String getDirecction() {
        return direcction;
    }

    public String getObjectType() {
        return ObjectType;
    }

    public Calendar getDate() {
        return date;
    }
}
