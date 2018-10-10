package com.jwa.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.jwa.model.User;

@Entity
@Table(name = "items")
public class Item {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
    @NotBlank
    @Size(max = 40)
	private String name;

    @Size(max = 225)
	private String description;
    
    @NotNull
	private int cost;
    
    @NotNull
    private Date duedate;
    
    @NotNull
    private boolean recurring;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private RecurringType recurringsize;
    
    private Date endrecurring;
    
	@ManyToOne
	@JoinColumn(name = "user_id")
    @JsonBackReference
	private User user;
	
	public Item() {}

	public Item(String name,String description,int cost, Date duedate,boolean recurring, RecurringType recurringsize, Date endrecurring) {
		this.name = name;
		this.description = description;
		this.cost = cost;
		this.duedate = duedate;
		this.recurring = recurring;
		this.recurringsize = recurringsize;
		this.endrecurring = endrecurring;
	}


	public int getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDuedate() {
		return duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}

	public boolean isRecurring() {
		return recurring;
	}

	public void setRecurring(boolean recurring) {
		this.recurring = recurring;
	}

	public RecurringType getRecurringsize() {
		return recurringsize;
	}

	public void setRecurringsize(RecurringType recurringsize) {
		this.recurringsize = recurringsize;
	}
	
	public Date getEndrecurring() {
		return endrecurring;
	}

	public void setEndrecurring(Date endrecurring) {
		this.endrecurring = endrecurring;
	}

	@Override
	public String toString() {
		return "Item [name=" + name + ", description=" + description + ", cost=" + cost + ", duedate=" + duedate
				+ ", recurring=" + recurring + ", recurringsize=" + recurringsize + "]";
	}

}
