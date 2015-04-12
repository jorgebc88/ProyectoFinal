package repositories;

import models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

public interface UserRepository extends JpaRepository<User, Long> {

	@Procedure(procedureName = "sp_findByUsername")
	public User findByUsername(String username);
}
