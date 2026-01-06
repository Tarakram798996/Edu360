package com.edu360.Edu360;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.edu360.Edu360.model")
@EnableJpaRepositories("com.edu360.Edu360.repos")
public class Edu360Application {

	public static void main(String[] args) {
		SpringApplication.run(Edu360Application.class, args);
	}

}
