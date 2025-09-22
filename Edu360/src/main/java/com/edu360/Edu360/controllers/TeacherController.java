package com.edu360.Edu360.controllers;


import com.edu360.Edu360.config.JwtUtil;
import com.edu360.Edu360.model.Activity;
import com.edu360.Edu360.model.Teacher;
import com.edu360.Edu360.model.User;
import com.edu360.Edu360.repos.TeacherRepo;
import com.edu360.Edu360.repos.UserRepo;
import com.edu360.Edu360.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ActivityService activityService;

    @PostMapping("/profile")
    public String setProfile(@RequestHeader("Authorization") String token,
                             @RequestBody Map<String, String> req) {
        // Extract token
        String jwt = token.substring(7);
        String email = jwtUtil.extractUsername(jwt);

        // Get user
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.getRole() != User.Role.TEACHER){
            return "Only TEACHER can set this profile";
        }

        // Check if teacher profile exists
        Teacher teacher = teacherRepo.findByUserId(user.getId()).orElse(new Teacher());
        teacher.setUser(user);
        teacher.setFullName(req.get("fullName"));
        teacher.setDept(req.get("dept"));
        teacher.setSec(req.get("sec"));
        teacher.setYear(Integer.parseInt(req.get("year")));

        teacherRepo.save(teacher);

        return "Teacher profile saved successfully!";
    }

    // 🔹 Get teacher profile
    @GetMapping("/profile")
    public Teacher getProfile(@RequestHeader("Authorization") String token){
        String jwt = token.substring(7);
        String email = jwtUtil.extractUsername(jwt);

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return teacherRepo.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Teacher profile not found"));
    }

    // 🔹 Get pending activities for the teacher
    @GetMapping("/activities/pending")
    public List<Activity> getPendingActivities(@RequestHeader("Authorization") String token) {
        Teacher teacher = getTeacherFromToken(token);
        return activityService.getPendingActivitiesForTeacher(teacher);
    }

    // 🔹 Approve an activity
    @PatchMapping("/activities/{id}/approve")
    public Activity approveActivity(@RequestHeader("Authorization") String token,
                                    @PathVariable Long id) {
        Teacher teacher = getTeacherFromToken(token);
        return activityService.approveActivity(id, teacher);
    }

    // 🔹 Reject an activity
    @PatchMapping("/activities/{id}/reject")
    public Activity rejectActivity(@RequestHeader("Authorization") String token,
                                   @PathVariable Long id) {
        Teacher teacher = getTeacherFromToken(token);
        return activityService.rejectActivity(id, teacher);
    }

    // 🔹 Optional: Get all activities verified by this teacher
    @GetMapping("/activities/verified")
    public List<Activity> getVerifiedActivities(@RequestHeader("Authorization") String token) {
        Teacher teacher = getTeacherFromToken(token);
        return activityService.getVerifiedActivitiesByTeacher(teacher);
    }

    // 🔹 Helper method: extract Teacher from JWT
    private Teacher getTeacherFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String email = jwtUtil.extractUsername(token);
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return teacherRepo.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Teacher profile not found"));
    }
}
