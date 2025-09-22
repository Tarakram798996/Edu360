package com.edu360.Edu360.service;

import com.edu360.Edu360.model.Student;
import com.edu360.Edu360.model.User;
import com.edu360.Edu360.repos.StudentRepo;
import com.edu360.Edu360.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private UserRepo userRepo;

    public Student createOrUpdateProfile(Long userId, Student studentDetails) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student = studentRepo.findByUserId(userId).orElse(new Student());
        student.setUser(user);
        student.setFullName(studentDetails.getFullName());
        student.setRegNo(studentDetails.getRegNo());
        student.setYear(studentDetails.getYear());
        student.setSem(studentDetails.getSem());
        student.setCgpa(studentDetails.getCgpa());
        student.setDept(studentDetails.getDept());
        student.setSec(studentDetails.getSec());

        return studentRepo.save(student);
    }

    public Student getProfile(Long userId) {
        return studentRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
}
