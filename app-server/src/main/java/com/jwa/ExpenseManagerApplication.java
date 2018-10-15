package com.jwa;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
@SpringBootApplication
@EntityScan(basePackageClasses = { 
		ExpenseManagerApplication.class,
		Jsr310JpaConverters.class 
})
public class ExpenseManagerApplication {
	
	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	public static void main(String[] args) {
		SpringApplication.run(ExpenseManagerApplication.class, args);
	}
	
}
