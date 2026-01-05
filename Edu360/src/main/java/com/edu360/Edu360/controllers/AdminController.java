package com.edu360.Edu360.controllers;

import com.edu360.Edu360.model.User;
import com.edu360.Edu360.service.AdminService;
import com.edu360.Edu360.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    @DeleteMapping("/deleteStudent/{id}")
    public void deleteStudent(@PathVariable("id") Long id) {
        adminService.deleteStudent(id);
    }

    @DeleteMapping("/deleteTeacher/{id}")
    public void deleteTeacher(@PathVariable Long id){
        adminService.deleteTeacher(id);
    }

    @PostMapping("/addTeacher")
    public String  addTeacher(@RequestBody Map<String, String> req){
        String email = req.get("email");
        String password = req.get("password");
        return adminService.addTeacher(email,password);
    }
    @GetMapping("/getAllUsers")
    public List<List<?>> getUsers(){
        return adminService.getAll();
    }
}
