package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.StoredProcedureParameter;

import org.springframework.stereotype.Repository;

@Entity
@Repository("userRepository")
@NamedStoredProcedureQueries({
	@NamedStoredProcedureQuery(name = "User.findByUsername", procedureName = "sp_findByUsername", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "userName", type = String.class),
			@StoredProcedureParameter(mode = ParameterMode.OUT, name = "res", type = User.class)
	})
	
})
public class User {

	@Id
	@Column(name = "Id")
	private Long userId;

	@Column(name = "userName")
	private String userName;

	@Column(name = "password")
	private String password;

	public Long getUserId() {
		return userId;
	}

	public User(Long userId, String userName, String password) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.password = password;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
