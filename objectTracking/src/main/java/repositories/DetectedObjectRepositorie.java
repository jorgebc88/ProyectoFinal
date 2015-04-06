package repositories;

import java.util.Date;
import java.util.List;

import models.DetectedObject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository("detectedObjectRepository")
public interface DetectedObjectRepositorie extends JpaRepository <DetectedObject,Long> {
	
	@Query("SELECT do FORM DetectedObject do WHERE do.date = :input")
	public List<DetectedObject> findByDate(@Param("input") Date date);
	
	
	// TO-DO: find out hot to format dates on SQL sentences to match day/month/year 
	
	@Query("SELECT do FROM detectedObject do WHERE do.date = :input")
	public List<DetectedObject> findByDay(@Param("input") Date day);
	
	@Query("SELECT do FROM detectedObject do WHERE do.date = :input")
	public List<DetectedObject> findByMonth(@Param("input") Date Month);
	
	@Query("SELECT do FROM detectedObject do WHERE do.date = :input")
	public List<DetectedObject> findByYear(@Param("input") Date year);
	
	@Query("SELEC * FROM DetectedObject do WHERE do.date BETWEEN :startDate AND :endDate")
	public List<DetectedObject> findBetweenDates(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
	
}
