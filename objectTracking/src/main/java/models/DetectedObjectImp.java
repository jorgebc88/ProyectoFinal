package models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.StoredProcedureParameter;
import javax.persistence.Table;

@Entity
@Table(name = "DetectedObject")
@NamedStoredProcedureQueries({
		@NamedStoredProcedureQuery(name = "DetectedObject.findByDate", procedureName = "sp_findByDate", parameters = {
				@StoredProcedureParameter(mode = ParameterMode.IN, name = "date", type = Date.class),
				@StoredProcedureParameter(mode = ParameterMode.OUT, name = "res", type = DetectedObject.class) }),

		@NamedStoredProcedureQuery(name = "DetectedObject.findByDay", procedureName = "sp_findByDay", parameters = {
				@StoredProcedureParameter(mode = ParameterMode.IN, name = "day", type = int.class),
				@StoredProcedureParameter(mode = ParameterMode.OUT, name = "res", type = DetectedObject.class) }),

		@NamedStoredProcedureQuery(name = "DetectedObject.findByMonth", procedureName = "sp_findByMonth", parameters = {
				@StoredProcedureParameter(mode = ParameterMode.IN, name = "Month", type = int.class),
				@StoredProcedureParameter(mode = ParameterMode.OUT, name = "res", type = DetectedObject.class) }),

		@NamedStoredProcedureQuery(name = "DetectedObject.findByYear", procedureName = "sp_findByYear", parameters = {
				@StoredProcedureParameter(mode = ParameterMode.IN, name = "Year", type = int.class),
				@StoredProcedureParameter(mode = ParameterMode.OUT, name = "res", type = DetectedObject.class) }),

		@NamedStoredProcedureQuery(name = "DetectedObject.findBetweenDates", procedureName = "sp_findBetweenDates", parameters = {
				@StoredProcedureParameter(mode = ParameterMode.IN, name = "startDate", type = Date.class),
				@StoredProcedureParameter(mode = ParameterMode.IN, name = "endDate", type = Date.class),
				@StoredProcedureParameter(mode = ParameterMode.OUT, name = "res", type = DetectedObject.class) }),

		@NamedStoredProcedureQuery(name = "DetectedObject.createObject", procedureName = "sp_createObject", parameters = {
				@StoredProcedureParameter(mode = ParameterMode.IN, name = "direction", type = String.class),
				@StoredProcedureParameter(mode = ParameterMode.IN, name = "objectType", type = String.class),
				@StoredProcedureParameter(mode = ParameterMode.IN, name = "date", type = Date.class) })

})
public class DetectedObjectImp implements Serializable {

	@Id
	@Column(name = "Object_Id")
	private Long id;

	@Column(name = "direcction")
	private String direcction;

	@Column(name = "ObjectType")
	private String ObjectType;

	@Column(name = "date")
	private Date date;

	public DetectedObjectImp(Long id, String direcction, String objectType,
			Date date) {
		this.id = id;
		this.direcction = direcction;
		ObjectType = objectType;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDirecction() {
		return direcction;
	}

	public void setDirecction(String direcction) {
		this.direcction = direcction;
	}

	public String getObjectType() {
		return ObjectType;
	}

	public void setObjectType(String objectType) {
		ObjectType = objectType;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
