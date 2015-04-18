package com.unt.repositories;

import com.unt.models.DetectedObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.Calendar;
import java.util.List;

/**
 * Created by Marco on 18/04/2015.
 */
@Repository("detectedObjectRepository")
public interface DetectedObjectRepository extends JpaRepository<DetectedObject,Long> {

    @Query("SELECT do FROM DetectedObject WHERE do.Date = :date")
    List<DetectedObject> findByDate(@Param("date")Calendar date);

    @Query("SELECT do FROM DetectedObject WHERE :day = EXTRACT(DAY FROM do.Date)")
    List<DetectedObject> findByDay(@Param("day")Calendar day);

    @Query("SELECT do FROM DetectedObject WHERE :month = EXTRACT(DAY FROM do.Date)")
    List<DetectedObject> findByMonth(@Param("month")Calendar month);

    @Query("SELECT do FROM DetectedObject WHERE :year = EXTRACT(MONTH FROM do.Date)")
    List<DetectedObject> findbyYear(@Param("year")Calendar Year);

    @Query("SELECT do FROM DetectedObject WHERE do.Date BETWEEN :startDate AND :endDate")
    List<DetectedObject> findByDatesBetween(@Param("startDate")Calendar startDate, @Param("endDate")Calendar endDate);
}
