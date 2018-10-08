package com.jwa.api.payload.request;

import java.sql.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ItemUpdateRequestObject {	
    @NotBlank
    @Size(max = 40)
	private String name;
    
    @NotBlank
    @Size(max = 40)
	private String oldName;   

    @Size(max = 225)
	private String description;
    
    @NotNull
	private int cost;
    
    @NotBlank
    private String userName;

    @NotNull
    private Date duedate;
    
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getOldName() {
		return oldName;
	}

	public void setOldName(String oldName) {
		this.oldName = oldName;
	}

	public Date getDuedate() {
		return duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}

	@Override
	public String toString() {
		return "ItemUpdateRequestObject [name=" + name + ", oldName=" + oldName + ", description=" + description
				+ ", cost=" + cost + ", userName=" + userName + ", duedate=" + duedate + "]";
	}
}
