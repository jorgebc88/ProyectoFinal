USE objectTracking;
DROP TABLE IF EXISTS DetectedObject;

CREATE TABLE DetectedObject(
	object_Id INT NOT NULL PRIMARY KEY,
    objectType VARCHAR(10) NOT NULL,
    direction VARCHAR(5) NOT NULL,
    `date` DATE NOT NULL
)

