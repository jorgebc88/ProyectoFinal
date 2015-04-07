package repositories;

import java.util.Date;
import java.util.List;

import models.DetectedObject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;


@Repository("detectedObjectRepository")
public interface DetectedObjectRepository extends JpaRepository <DetectedObject,Long> {
	
	
	//TODO: find out hot to format dates on SQL sentences to match day/month/year
	
	@Procedure(procedureName="sp_findByDate")
	public List<DetectedObject> findByDate(Date date);
		
	@Procedure(procedureName="sp_findByDay")
	public List<DetectedObject> findByDay(int day);
	
	@Procedure(procedureName="sp_findByMonth")
	public List<DetectedObject> findByMonth(int Month);
	
	@Procedure(procedureName="sp_findByYear")
	public List<DetectedObject> findByYear(int year);
	
	@Procedure(procedureName="sp_findBetweenDates")
	public List<DetectedObject> findBetweenDates(Date startDate, Date endDate);
	
}
