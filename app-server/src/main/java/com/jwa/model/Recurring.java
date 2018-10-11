package com.jwa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "recurring")
public class Recurring {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    private boolean recurring;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private RecurringType recurringsize;

	public Long getId() {
		return id;
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

	@Override
	public String toString() {
		return "Recurring [id=" + id + ", recurring=" + recurring + ", recurringsize=" + recurringsize + "]";
	}
       
}
