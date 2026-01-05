package com.edu360.Edu360.service;

import com.edu360.Edu360.model.Teacher;
import com.edu360.Edu360.model.User;
import com.edu360.Edu360.repos.TeacherRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepo teacherRepo;

    public Teacher getById(Long id) {
        return teacherRepo.findById(id).orElse(null);
    }
    @Transactional
    public void delete(Long id){
        teacherRepo.deleteById(id);
    }

    public List<Teacher> findAll() {
        return teacherRepo.findAll();
    }
}
