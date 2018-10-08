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

@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
    private UserRepository userRepository;
	
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserBasicResponseObject getCurrentUser(@CurrentUser UserObject currentUser) {
    	UserBasicResponseObject userInfo = new UserBasicResponseObject(currentUser.getUsername(), currentUser.getName());
        return userInfo;
    }
    
    @GetMapping("/user/checkUsernameAvailable")
    public AvailableResponse checkUsernameAvailable(@RequestParam(value = "username") String username) {
    	return new AvailableResponse(!userRepository.existsByUsername(username));
    }
    
    @GetMapping("/user/checkEmailAvailable")
    public AvailableResponse checkEmailAvailable(@RequestParam(value = "email") String email) {
    	return new AvailableResponse(!userRepository.existsByEmail(email));
    }
}
