package com.jwa.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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
    
	@ManyToOne
	@JoinColumn(name = "user_id")
    @JsonBackReference
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "recurring_id")
    @JsonBackReference
	private Recurring recurring;
	
	@ManyToOne
	@JoinColumn(name = "dates_id")
    @JsonBackReference
    private Dates duedate;
	
	@ManyToOne(optional = true, fetch = FetchType.LAZY)
	@JoinColumn(name = "enddates_id")
    @JsonBackReference
    private Dates enddate;   
	
	public Item() {}

	public Item(String name, String description, int cost) {
		this.name = name;
		this.description = description;
		this.cost = cost;
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
	
	public Dates getDuedate() {
		return duedate;
	}

	public void setDuedate(Dates duedate) {
		this.duedate = duedate;
	}
	
	public Recurring getRecurring() {
		return recurring;
	}

	public void setRecurring(Recurring recurring) {
		this.recurring = recurring;
	}

	public Dates getEnddate() {
		return enddate;
	}

	public void setEnddate(Dates enddate) {
		this.enddate = enddate;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", name=" + name + ", description=" + description + ", cost=" + cost + "]";
	}

}
