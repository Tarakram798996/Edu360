package com.edu360.Edu360.controllers;

import com.edu360.Edu360.config.JwtUtil;
import com.edu360.Edu360.model.Otp;
import com.edu360.Edu360.model.User;
import com.edu360.Edu360.repos.OtpRepository;
import com.edu360.Edu360.repos.UserRepo;
import com.edu360.Edu360.service.OtpService;
import com.edu360.Edu360.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private OtpService optService;


    private String sendOtp(String email, String role, String password) {
        if (userService.isEmailPresent(email)) {
            return "Email already exists!";
        }

        String otpCode = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(15);

        optService.deleteOtp(email);
        otpRepository.save(new Otp(email, otpCode, expiry, role, password)); // include role + password

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Edu360 Registration");
        message.setText("Your OTP is: " + otpCode);

        mailSender.send(message);

        return "OTP sent to email!";
    }


    @PostMapping("/register-student")
    public String registerStudent(@RequestBody Map<String, String> req) {
        return sendOtp(req.get("email"), "STUDENT", req.get("password"));
    }

     //No Teacher & Admin Login, there is only one admin and he can add teachers.
//    @PostMapping("/register-teacher")
//    public String registerTeacher(@RequestBody Map<String, String> req) {
//        return sendOtp(req.get("email"), "TEACHER", req.get("password"));
//    }
//
//    @PostMapping("/register-admin")
//    public String registerAdmin(@RequestBody Map<String, String> req) {
//        return sendOtp(req.get("email"), "ADMIN", req.get("password"));
//    }


    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String otpCode = req.get("otp");

        Optional<Otp> otpOpt = otpRepository.findByEmailAndCode(email, otpCode);
        if (otpOpt.isEmpty() || otpOpt.get().getExpiresAt().isBefore(LocalDateTime.now())) {
            return "Invalid or expired OTP!";
        }

        Otp otp = otpOpt.get();

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(otp.getPassword())); // use stored password
        user.setRole(User.Role.valueOf(otp.getRole())); // use stored role
        user.setVerified(true);

        userService.save(user);
        optService.deleteOtp(email);

        return "User registered successfully!";
    }


    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");
        System.out.println("Login attempt for email: " + email);
        User dbUser = userService.findByEmail(email);

        if(dbUser==null)
            throw new RuntimeException("User not found");

        if (!dbUser.isVerified())
            throw new RuntimeException("User not verified. Please complete OTP verification.");


        if (passwordEncoder.matches(password, dbUser.getPassword())) {
            return jwtUtil.generateToken(dbUser.getEmail(),dbUser.getRole().name());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
