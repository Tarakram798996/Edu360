package com.edu360.Edu360.controllers;

import com.edu360.Edu360.config.JwtUtil;
import com.edu360.Edu360.model.Activity;
import com.edu360.Edu360.model.Teacher;
import com.edu360.Edu360.model.User;
import com.edu360.Edu360.repos.TeacherRepo;
import com.edu360.Edu360.repos.UserRepo;
import com.edu360.Edu360.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    //  Create teacher profile
    @PostMapping("/profile")
    public ResponseEntity<Teacher> setProfile(@RequestHeader("Authorization") String token,
                                              @RequestBody Map<String, String> req) {
        Long userId = getUserIdFromToken(token);

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != User.Role.TEACHER) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Teacher teacher = teacherRepo.findByUserId(user.getId()).orElse(new Teacher());
        teacher.setUser(user);
        teacher.setFullName(req.get("fullName"));
        teacher.setDept(req.get("dept"));
        teacher.setSec(req.get("sec"));
        teacher.setYear(Integer.parseInt(req.get("year")));

        Teacher savedTeacher = teacherRepo.save(teacher);
        return ResponseEntity.ok(savedTeacher);
    }

    //  Update teacher profile
    @PutMapping("/profile")
    public ResponseEntity<Teacher> updateProfile(@RequestHeader("Authorization") String token,
                                                 @RequestBody Teacher teacherDetails) {
        Long userId = getUserIdFromToken(token);
        Teacher updatedTeacher = createOrUpdateProfile(userId, teacherDetails);

        return updatedTeacher != null
                ? ResponseEntity.ok(updatedTeacher)
                : ResponseEntity.notFound().build();
    }

    private Teacher createOrUpdateProfile(Long userId, Teacher teacherDetails) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Teacher teacher = teacherRepo.findByUserId(userId).orElse(new Teacher());
        teacher.setUser(user);
        teacher.setFullName(teacherDetails.getFullName());
        teacher.setDept(teacherDetails.getDept());
        teacher.setSec(teacherDetails.getSec());
        teacher.setYear(teacherDetails.getYear());

        return teacherRepo.save(teacher);
    }

    //  Get teacher profile
    @GetMapping("/profile")
    public ResponseEntity<Teacher> getProfile(@RequestHeader("Authorization") String token) {
        Teacher teacher = getTeacherFromToken(token);
        return ResponseEntity.ok(teacher);
    }

    //  Get pending activities for the teacher
    @GetMapping("/activities/pending")
    public ResponseEntity<List<Activity>> getPendingActivities(@RequestHeader("Authorization") String token) {
        Teacher teacher = getTeacherFromToken(token);
        return ResponseEntity.ok(activityService.getPendingActivitiesForTeacher(teacher));
    }

    //  Approve an activity
    @PatchMapping("/activities/{id}/approve")
    public ResponseEntity<Activity> approveActivity(@RequestHeader("Authorization") String token,
                                                    @PathVariable Long id) {
        Teacher teacher = getTeacherFromToken(token);
        return ResponseEntity.ok(activityService.approveActivity(id, teacher));
    }

    //  Reject an activity
    @PatchMapping("/activities/{id}/reject")
    public ResponseEntity<Activity> rejectActivity(@RequestHeader("Authorization") String token,
                                                   @PathVariable Long id) {
        Teacher teacher = getTeacherFromToken(token);
        return ResponseEntity.ok(activityService.rejectActivity(id, teacher));
    }

    //  Get all activities verified by this teacher
    @GetMapping("/activities/verified")
    public ResponseEntity<List<Activity>> getVerifiedActivities(@RequestHeader("Authorization") String token) {
        Teacher teacher = getTeacherFromToken(token);
        return ResponseEntity.ok(activityService.getVerifiedActivitiesByTeacher(teacher));
    }

    //  Helper: extract userId from JWT
    private Long getUserIdFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String email = jwtUtil.extractUsername(token);
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    //  Helper: extract Teacher from JWT
    private Teacher getTeacherFromToken(String token) {
        Long userId = getUserIdFromToken(token);
        return teacherRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Teacher profile not found"));
    }
}
