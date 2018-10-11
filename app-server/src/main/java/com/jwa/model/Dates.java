package com.jwa.model;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "dates")
public class Dates{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    private Date thedate;
    
	public Dates() {
	}
    
	public Dates(Date thedate) {
		this.thedate = thedate;
	}

	public Long getId() {
		return id;
	}
	
	public Date getThedate() {
		return thedate;
	}

	public void setThedate(Date thedate) {
		this.thedate = thedate;
	}

	@Override
	public String toString() {
		return "Dates [id=" + id + ", thedate=" + thedate + "]";
	}
}
