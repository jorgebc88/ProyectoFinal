DROP PROCEDURE IF EXISTS sp_findByDate;

DELIMITER $$
CREATE PROCEDURE sp_findByDate(d Date)
BEGIN
	SELECT * FROM DetectedObject WHERE `date`= d
    ORDER BY d ASC; 
END	
$$