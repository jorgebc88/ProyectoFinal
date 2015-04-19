package com.unt.repositories;

import com.unt.models.User;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Marco on 18/04/2015.
 */
@Repository("userRepository")
public interface UserRepository extends JpaRepository<User,Long>{

    List<User> findByName(String name);
}
