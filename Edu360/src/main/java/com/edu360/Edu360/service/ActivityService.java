package com.edu360.Edu360.service;

import com.edu360.Edu360.model.Activity;
import com.edu360.Edu360.model.Student;
import com.edu360.Edu360.model.Teacher;
import com.edu360.Edu360.repos.ActivityRepo;
import com.edu360.Edu360.repos.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepo activityRepo;

    @Autowired
    private TeacherRepo teacherRepo;

    // 1️⃣ Add activity (student uploads)
    public Activity addActivity(Student student, Activity activity) {
        activity.setStudent(student);
        activity.setStatus(Activity.Status.PENDING);
        return activityRepo.save(activity);
    }

    // 2️⃣ Get all activities of a student
    public List<Activity> getActivitiesByStudent(Long studentId) {
        return activityRepo.findByStudentId(studentId);
    }

    public List<Activity> getVerifiedActivitiesByTeacher(Teacher teacher) {
        return activityRepo.findByVerifiedBy(teacher);
    }

    // 3️⃣ Get pending activities for teacher
    public List<Activity> getPendingActivitiesForTeacher(Teacher teacher) {
        return activityRepo.findAllByStatusAndStudent_DeptAndStudent_SecAndStudent_Year(
                Activity.Status.PENDING,
                teacher.getDept(),
                teacher.getSec(),
                teacher.getYear()
        );
    }

    // 4️⃣ Approve activity
    public Activity approveActivity(Long activityId, Teacher teacher) {
        Activity activity = activityRepo.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
        activity.setStatus(Activity.Status.APPROVED);
        activity.setVerifiedBy(teacher);
        return activityRepo.save(activity);
    }

    // 5️⃣ Reject activity
    public Activity rejectActivity(Long activityId, Teacher teacher) {
        Activity activity = activityRepo.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
        activity.setStatus(Activity.Status.REJECTED);
        activity.setVerifiedBy(teacher);
        return activityRepo.save(activity);
    }
}
