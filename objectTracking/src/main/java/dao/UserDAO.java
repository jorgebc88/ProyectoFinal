package dao;

import models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import repositories.UserRepository;

@Component
public class UserDAO {
	
	@Autowired
	UserRepository userRepository;
	
	public User getUserByUsername(String username){
		return userRepository.findByUsername(username);
	}

}
