package com.unt.repositories;

import com.unt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



/**
 * Created by Marco on 18/04/2015.
 */
@Repository("userRepository")
public interface UserRepository extends JpaRepository<User,Long>{

    @Query("SELECT u FROM USERS WHERE userName = :name")
    User findByName(@Param("name")String name);
}