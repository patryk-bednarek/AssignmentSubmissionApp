package com.coderscampus.AssignmentSubmissionApp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("hello")
public class HelloRestController {
    @GetMapping("user")
    public String helloUser(Principal principal)
    {
        return "Hello User " + principal.getName();
    }

    @GetMapping("admin")
    public String helloAdmin() {
        return "Hello Admin";
    }
}
