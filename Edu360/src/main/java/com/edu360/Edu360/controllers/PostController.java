package com.edu360.Edu360.controllers;

import com.edu360.Edu360.config.JwtUtil;
import com.edu360.Edu360.model.Post;
import com.edu360.Edu360.model.Student;
import com.edu360.Edu360.model.Teacher;
import com.edu360.Edu360.model.User;
import com.edu360.Edu360.repos.PostRepo;
import com.edu360.Edu360.repos.StudentRepo;
import com.edu360.Edu360.repos.TeacherRepo;
import com.edu360.Edu360.repos.UserRepo;
import com.edu360.Edu360.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public String createPost(@RequestHeader("Authorization") String token,
                             @RequestBody Map<String, String> req) {
        String jwt = token.substring(7);
        String email = jwtUtil.extractUsername(jwt);

        User user = userService.findByEmail(email);
        if(user==null)
            throw new RuntimeException("User not found");

        Post post = new Post();
        post.setTitle(req.get("title"));
        post.setContent(req.get("content"));
        post.setCreatedBy(user);

        if (user.getRole() == User.Role.ADMIN) {
            post.setGlobal(true);
        } else if (user.getRole() == User.Role.TEACHER) {
            Teacher teacher = teacherRepo.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Teacher profile not found"));
            post.setDept(teacher.getDept());
            post.setSec(teacher.getSec());
            post.setYear(teacher.getYear());
            post.setGlobal(false);
        } else {
            return "Only TEACHER or ADMIN can create posts!";
        }

        postRepo.save(post);
        return "Post created successfully!";
    }

    // Student fetches relevant posts
    @GetMapping("/my")
    public List<Post> getMyPosts(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        String email = jwtUtil.extractUsername(jwt);

        User user = userService.findByEmail(email);
        if(user==null)
            throw new RuntimeException("User not found");

        if (user.getRole() == User.Role.STUDENT) {
            Student student = studentRepo.findByUserId(user.getId()).orElse(null);//user.getStudent();
            List<Post> globalPosts = postRepo.findByGlobalTrue();
            List<Post> deptPosts = postRepo.findByDeptAndSecAndYear(
                    student.getDept(), student.getSec(), student.getYear()
            );
            globalPosts.addAll(deptPosts);
            return globalPosts;
        } else {
            return postRepo.findAll(); // teachers/admin can see all
        }
    }
}
