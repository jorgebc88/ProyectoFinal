package dao;

import java.util.Date;
import java.util.List;

import models.DetectedObject;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

import repositories.DetectedObjectRepository;

@Component
public class DetectedObjectDAO{
	
	@Autowired 
	DetectedObjectRepository detectedObjectRepository;

	public List<DetectedObject> getObjectsOnADate(Date date) {
		return detectedObjectRepository.findByDate(date);
	}
	
	public List<DetectedObject> getObjectsOnADay(int day) {
		return detectedObjectRepository.findByDay(day);
	}

	public List<DetectedObject> getObjectsOnAMonth(int month) {
		return detectedObjectRepository.findByMonth(month);
	}

	public List<DetectedObject> getObjectsOnAYear(int year) {
		return detectedObjectRepository.findByYear(year);
	}

	public List<DetectedObject> getObjectsBetweenDates(Date startDate,
			Date endDate) {
		return detectedObjectRepository.findBetweenDates(startDate, endDate);
	}

}
