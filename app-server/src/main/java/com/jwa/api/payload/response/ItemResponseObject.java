package com.jwa.api.payload.response;

import java.sql.Date;

public class ItemResponseObject {
	private String name;
	private String description;
	private int cost;   
    private Date duedate;
    
    public ItemResponseObject() {}
    
	public ItemResponseObject(String name,String description,int cost, Date duedate) {
		this.name = name;
		this.description = description;
		this.cost = cost;
		this.duedate = duedate;
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

	public Date getDuedate() {
		return duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}
	
	
    
    
}
