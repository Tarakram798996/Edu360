package com.edu360.Edu360.repos;

import com.edu360.Edu360.model.Activity;
import com.edu360.Edu360.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepo extends JpaRepository<Activity, Long> {

    List<Activity> findByStudentId(Long studentId);

    List<Activity> findAllByStatusAndStudent_DeptAndStudent_SecAndStudent_Year(
            Activity.Status status, String dept, String sec, int year);

    List<Activity> findByVerifiedBy(Teacher teacher);

}