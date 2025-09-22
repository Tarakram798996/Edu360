package com.edu360.Edu360.controllers;

import com.edu360.Edu360.config.JwtUtil;
import com.edu360.Edu360.model.Activity;
import com.edu360.Edu360.model.Student;
import com.edu360.Edu360.model.User;
import com.edu360.Edu360.service.ActivityService;
import com.edu360.Edu360.service.StudentService;
import com.edu360.Edu360.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo;


    @PostMapping("/profile")
    public Student createOrUpdateProfile(@RequestHeader("Authorization") String token,
                                         @RequestBody Student studentDetails) {
        Long userId = getUserIdFromToken(token);
        return studentService.createOrUpdateProfile(userId, studentDetails);
    }


    @GetMapping("/profile")
    public Student getProfile(@RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        return studentService.getProfile(userId);
    }


    @GetMapping("/activities")
    public List<Activity> getActivities(@RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        Student student = studentService.getProfile(userId);
        return activityService.getActivitiesByStudent(student.getId());
    }


    @PostMapping("/activities")
    public Activity uploadActivity(@RequestHeader("Authorization") String token,
                                   @RequestBody Activity activity) {
        Long userId = getUserIdFromToken(token);
        Student student = studentService.getProfile(userId);
        return activityService.addActivity(student, activity);
    }

    private Long getUserIdFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String email = jwtUtil.extractUsername(token);
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }
}