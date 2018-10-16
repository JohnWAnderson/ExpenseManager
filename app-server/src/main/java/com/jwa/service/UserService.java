package com.jwa.service;

import java.net.URI;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.jwa.api.payload.request.LoginRequestObject;
import com.jwa.api.payload.request.SignUpRequestObject;
import com.jwa.api.payload.response.ApiResponseObject;
import com.jwa.api.payload.response.AvailableResponse;
import com.jwa.api.payload.response.JwtResponseObject;
import com.jwa.api.payload.response.UserBasicResponseObject;
import com.jwa.exception.ApiError;
import com.jwa.model.Role;
import com.jwa.model.RoleType;
import com.jwa.model.User;
import com.jwa.repository.RoleRepository;
import com.jwa.repository.UserRepository;
import com.jwa.security.JwtToken;
import com.jwa.security.UserObject;

@Service
public class UserService {
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
    
    public  ResponseEntity<?> loginRequest(LoginRequestObject loginRequest) {
	    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(),loginRequest.getPassword()));     
	    SecurityContextHolder.getContext().setAuthentication(authentication);
	    String jwt = jwtToken.generateToken(authentication);
	    return  ResponseEntity.ok(new JwtResponseObject(jwt));
    }
	
    @Transactional
    public  ResponseEntity<?> signupRequest(SignUpRequestObject signUpRequest){
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
    
    public UserBasicResponseObject getCurrentUserInformation(UserObject currentUser) {
    	return new UserBasicResponseObject(currentUser.getUsername(), currentUser.getName());
    }
    
    public AvailableResponse checkUsernameAvailable(String username) {
    	return new AvailableResponse(!userRepository.existsByUsername(username));
    }
    
    public AvailableResponse checkEmailAvailable(String email) {
    	return new AvailableResponse(!userRepository.existsByEmail(email));
    }
}





