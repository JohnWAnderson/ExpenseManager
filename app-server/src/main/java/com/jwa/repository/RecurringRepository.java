package com.jwa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwa.model.Recurring;
import com.jwa.model.RecurringType;

public interface RecurringRepository extends JpaRepository<Recurring, Long> {

	Optional<Recurring> findByRecurringsize(RecurringType username);
}
