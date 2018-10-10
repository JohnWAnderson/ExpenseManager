package com.jwa.api.payload.request;

import java.sql.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.jwa.model.RecurringType;

public class ItemRequestObject {
	@NotBlank
    @Size(max = 40)
	private String name;

    @Size(max = 225)
	private String description;
    
    @NotNull
	private int cost;
    
    @NotBlank
    private String userName;
    
    @NotNull
    private Date duedate;
    
    @NotNull
    private boolean recurring;
    
    @Enumerated(EnumType.STRING)
    private RecurringType recurringsize;
    
    private Date endrecurring;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDuedate() {
		return duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
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
		return "ItemRequestObject [name=" + name + ", description=" + description + ", cost=" + cost + ", userName="
				+ userName + ", duedate=" + duedate + ", recurring=" + recurring + ", recurringsize=" + recurringsize
				+ ", endrecurring=" + endrecurring + "]";
	}
}
