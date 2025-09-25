package com.edu360.Edu360.repos;

import com.edu360.Edu360.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> findByGlobalTrue(); // admin posts

    List<Post> findByDeptAndSecAndYear(String dept, String sec, int year); // teacher posts
}
