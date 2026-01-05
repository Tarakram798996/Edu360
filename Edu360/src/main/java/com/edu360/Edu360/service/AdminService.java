package com.edu360.Edu360.service;

import com.edu360.Edu360.model.Student;
import com.edu360.Edu360.model.Teacher;
import com.edu360.Edu360.model.User;
import com.edu360.Edu360.repos.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {
    @Autowired
    private StudentService studentService;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private TeacherService teacherService;

    public void deleteStudent(Long id){
        Student s = studentService.getById(id);
        if (s != null) {
            studentService.delete(id);
        }
    }

    public void deleteTeacher(Long id){
        Teacher t = teacherService.getById(id);
        if(t!=null){
            teacherService.delete(id);
        }
    }

    public String addTeacher(String email,String password){
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // use stored password
        user.setRole(User.Role.valueOf("TEACHER")); // use stored role
        user.setVerified(true);

        userService.save(user);
        return "Teacher Created !!";
    }

    public List<List<?>> getAll() {
        List<List<?>> list = new ArrayList<>();
        list.add(studentService.findAll());
        list.add(teacherService.findAll());
        return list;
    }
}
