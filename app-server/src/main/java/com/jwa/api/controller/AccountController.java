package com.jwa.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import com.jwa.api.payload.request.LoginRequestObject;
import com.jwa.api.payload.request.SignUpRequestObject;
import com.jwa.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AccountController {
    @Autowired
    UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@Valid @RequestBody LoginRequestObject loginRequest) {
        return userService.loginRequest(loginRequest);
    }
       
	@PostMapping("/signup")
    public ResponseEntity<?> signupUser(@Valid @RequestBody SignUpRequestObject signUpRequest) {	
		return userService.signupRequest(signUpRequest);
    }
}