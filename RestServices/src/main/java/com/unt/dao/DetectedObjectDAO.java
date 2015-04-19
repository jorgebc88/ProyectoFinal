package com.unt.dao;

import com.unt.models.DetectedObject;
import com.unt.repositories.DetectedObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.List;

/**
 * Created by Marco on 18/04/2015.
 */
@Component
public class DetectedObjectDAO {
    @Autowired
    DetectedObjectRepository detectedObjectRepository;

    public List<DetectedObject> getObjectsOnADate(Calendar date){
        return detectedObjectRepository.findByDate(date);
    }

    public List<DetectedObject> getObjectsOnaDay(Calendar day){
        return detectedObjectRepository.findByDay(day);
    }

    public List<DetectedObject> getObjectsOnAMonth(Calendar month){
        return detectedObjectRepository.findByMonth(month);
    }

    public List<DetectedObject> getObjectsOnAYear(Calendar year){
        return detectedObjectRepository.findbyYear(year);
    }

    public List<DetectedObject> getObjectsBetweenDates(Calendar startDate, Calendar endDate){
        return detectedObjectRepository.findByDatesBetween(startDate,endDate);
    }

}
