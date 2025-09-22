package com.edu360.Edu360.service;

import com.edu360.Edu360.model.Otp;
import com.edu360.Edu360.repos.OtpRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    public void saveOtp(String email, String code, LocalDateTime expiry) {
        otpRepository.deleteByEmail(email); // clear old OTP
        Otp otp = new Otp();
        otp.setEmail(email);
        otp.setCode(code);
        otp.setExpiresAt(expiry);
        otpRepository.save(otp);
    }

    public boolean verifyOtp(String email, String code) {
        Optional<Otp> otpOpt = otpRepository.findByEmailAndCode(email, code);
        return otpOpt.isPresent() && otpOpt.get().getExpiresAt().isAfter(LocalDateTime.now());
    }

    @Transactional
    public void deleteOtp(String email) {
        otpRepository.deleteByEmail(email);
    }
}
