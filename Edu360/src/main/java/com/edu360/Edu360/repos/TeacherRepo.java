package com.edu360.Edu360.repos;


import com.edu360.Edu360.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher, Long> {

    // Find teacher by their user ID
    Optional<Teacher> findByUserId(Long userId);

    // Optional: Find teacher by department and section (if needed)
    Optional<Teacher> findByDeptAndSec(String dept, String sec);
}