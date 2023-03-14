package com.coderscampus.AssignmentSubmissionApp;

import com.coderscampus.AssignmentSubmissionApp.repository.UserRepository;
import com.coderscampus.AssignmentSubmissionApp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtFilter {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;



}
