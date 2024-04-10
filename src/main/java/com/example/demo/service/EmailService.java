package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;



    public void sendVerificationEmail(String to, String verificationLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Verify Your Email Address");
        message.setText("Dear User,\n\n"
                + "Thank you for registering with our service. Please click on the following link to verify your email address:\n"
                + verificationLink + "\n\n"
                + "Best regards,\n"
                + "YourService Team");
        javaMailSender.send(message);
    }
}
