package com.jwa.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwa.api.payload.response.AvailableResponse;
import com.jwa.api.payload.response.UserBasicResponseObject;
import com.jwa.repository.UserRepository;
import com.jwa.security.CurrentUser;
import com.jwa.security.UserObject;
import com.jwa.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserBasicResponseObject getCurrentUser(@CurrentUser UserObject currentUser) {
    	return userService.getCurrentUserInformation(currentUser);
    }
    
    @GetMapping("/user/checkUsernameAvailable")
    public AvailableResponse checkUsernameAvailable(@RequestParam(value = "username") String username) {
    	return userService.checkUsernameAvailable(username);
    }
    
    @GetMapping("/user/checkEmailAvailable")
    public AvailableResponse checkEmailAvailable(@RequestParam(value = "email") String email) {
    	return userService.checkEmailAvailable(email);
    }
}
