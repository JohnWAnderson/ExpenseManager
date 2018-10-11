package com.jwa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jwa.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long>{
     Optional<Item> findByName(String name);
     
     List<Item> findByUserId(Long userId);
     
     @Query("Select i FROM Item i JOIN i.user u where i.name = ?1 and u.username = ?2 ")
     List<Item> findItemByUser(String name, String username);
}
