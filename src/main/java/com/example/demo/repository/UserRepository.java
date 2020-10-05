package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM users as u INNER  JOIN role as r ON u.role_id = r.id WHERE u.role_id = 2", nativeQuery = true)
    List<User> getAllStudents();

    @Query(value = "SELECT * FROM users as u INNER  JOIN role as r ON u.role_id = r.id WHERE u.role_id = 3", nativeQuery = true)
    List<User> getAllLecturers();

    @Query(value = "SELECT * FROM users as u WHERE u.email = ?1", nativeQuery = true)
    User getUserByEmail(@Param("email") String email);
}
