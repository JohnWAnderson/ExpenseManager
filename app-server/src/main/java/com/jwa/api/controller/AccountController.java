package com.jwa.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.Optional;

import com.jwa.api.payload.request.LoginRequestObject;
import com.jwa.api.payload.request.SignUpRequestObject;
import com.jwa.api.payload.response.ApiResponseObject;
import com.jwa.api.payload.response.JwtResponseObject;
import com.jwa.exception.ApiError;
import com.jwa.model.Role;
import com.jwa.model.RoleType;
import com.jwa.model.User;
import com.jwa.repository.RoleRepository;
import com.jwa.repository.UserRepository;
import com.jwa.security.JwtToken;

@RestController
@RequestMapping("/api/auth")
public class AccountController {
    @Autowired
    AuthenticationManager authenticationManager; 
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    RoleRepository roleRepository;
    
    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Autowired
    JwtToken jwtToken;

    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@Valid @RequestBody LoginRequestObject loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(),loginRequest.getPassword()));     
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtToken.generateToken(authentication);
        return ResponseEntity.ok(new JwtResponseObject(jwt));
    }
       
	@PostMapping("/signup")
    public ResponseEntity<?> signupUser(@Valid @RequestBody SignUpRequestObject signUpRequest) {	
        if(userRepository.existsByUsername(signUpRequest.getUsername())) 
            return new ResponseEntity<Object>(new ApiResponseObject(false, "Username is already in use"), HttpStatus.BAD_REQUEST);

        if(userRepository.existsByEmail(signUpRequest.getEmail())) 
            return new ResponseEntity<Object>(new ApiResponseObject(false, "Email Address already in use"),  HttpStatus.BAD_REQUEST);

        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Optional<Role> userRoleOption = roleRepository.findByName(RoleType.ROLE_USER);        
        if(!userRoleOption.isPresent()) 
        	throw (new ApiError("User Role Not Valid"));
        
        Role userRole = userRoleOption.get();       
        user.setRoles(Collections.singleton(userRole));
        User result = userRepository.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}").buildAndExpand(result.getUsername()).toUri();
        return ResponseEntity.created(location).body(new ApiResponseObject(true, "User registered successfully"));
    }
}