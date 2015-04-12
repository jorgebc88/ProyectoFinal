DROP PROCEDURE IF EXISTS sp_findBetweenDates

DELIMITER $$
CREATE PROCEDURE sp_findBetweenDates(startDate DATE, endDate DATE)
BEGIN
	SELECT * FROM DetectedObject WHERE DetectedObject.`date` BETWEEN startDate AND endDate 
    ORDER BY `date` ASC;
END
$$