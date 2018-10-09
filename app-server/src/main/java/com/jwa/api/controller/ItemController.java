package com.jwa.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwa.api.payload.request.ItemRequestObject;
import com.jwa.api.payload.request.ItemUpdateRequestObject;
import com.jwa.api.payload.response.ApiResponseObject;
import com.jwa.api.payload.response.AvailableResponse;
import com.jwa.api.payload.response.ItemResponseObject;
import com.jwa.api.payload.response.PagedResponseObject;
import com.jwa.exception.ApiError;
import com.jwa.model.Item;
import com.jwa.model.User;
import com.jwa.repository.ItemRepository;
import com.jwa.repository.UserRepository;
import com.jwa.security.CurrentUser;
import com.jwa.security.UserObject;

@RestController
@RequestMapping("/api/items")
public class ItemController {
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private ItemRepository itemRepository;
	
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponseObject CreateItem(@Valid @RequestBody ItemRequestObject ItemRequest ) {
    	if(ItemRequest.getCost() < 0) {
    		throw (new ApiError("Can't have negitive cost"));
    	}
    	
		Item item = new Item();
		item.setName(ItemRequest.getName());
		item.setCost(ItemRequest.getCost());
		item.setDescription(ItemRequest.getDescription());
		item.setDuedate(ItemRequest.getDuedate());
		Optional<User> userOption = userRepository.findByUsername(ItemRequest.getUserName());
		if(!userOption.isPresent())
			throw (new ApiError("Didn't find User"));
		
		User theUser = userOption.get();
		for(Item items: theUser.getItems()) {
			if(items.getName().equals(ItemRequest.getName())) 
				throw (new ApiError("Expense Name already Exists"));
		}
		
		item.setUser(theUser);
		System.out.println(item);
		itemRepository.save(item);
	    return (new ApiResponseObject(true, "item Created Successfully"));
    }
    
    @GetMapping("/task")
    @PreAuthorize("hasRole('USER')")
    public AvailableResponse CheckTaskNameAvailable(@CurrentUser UserObject currentUser, @RequestParam(value = "name") String name) {
    	boolean avaliable = true;
    	Optional<User> userOption = userRepository.findByUsername(currentUser.getName());
		if(!userOption.isPresent()) 
			throw (new ApiError("Didn't find User"));
		
		User theUser = userOption.get();
		for(Item items: theUser.getItems()) {
			if(items.getName().equals(name)) 
				avaliable = false;
		}
		
        return (new AvailableResponse(avaliable));
    }
    
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public PagedResponseObject<ItemResponseObject> GetItems(@CurrentUser UserObject currentUser){
    	Optional<User> userOption = userRepository.findByUsername(currentUser.getName());
		if(!userOption.isPresent()) 
			throw (new ApiError("Didn't find User"));
			
		User theUser = userOption.get();
		System.out.println(theUser.getItems());
		List<ItemResponseObject> ItemConent = new ArrayList<ItemResponseObject>();
		for(Item item: theUser.getItems())
			ItemConent.add(new ItemResponseObject(item.getName(), item.getDescription(), item.getCost(), item.getDuedate()));
		
		return (new PagedResponseObject<ItemResponseObject>(ItemConent));
    }
    
    @PutMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponseObject UpdateItem(@Valid @RequestBody ItemUpdateRequestObject itemUpdateRequest ) {
    	if(itemUpdateRequest.getCost() < 0) {
    		throw (new ApiError("Can't have negitive cost"));
    	}   	
    	System.out.println(itemUpdateRequest);
    	List<Item> theTaskList = itemRepository.findTaskByUser(itemUpdateRequest.getOldName(), itemUpdateRequest.getUserName());
    	Item theItem = theTaskList.get(0);
    	theItem.setCost(itemUpdateRequest.getCost());
    	theItem.setDescription(itemUpdateRequest.getDescription());
    	theItem.setName(itemUpdateRequest.getName());
    	theItem.setDuedate(itemUpdateRequest.getDuedate());
    	itemRepository.save(theItem);
		return (new ApiResponseObject(true, "item updated Successfully"));
    }
    
    @DeleteMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponseObject DeleteItem(@Valid @RequestBody ItemRequestObject itemUpdateRequest ) {
    	List<Item> theTaskList = itemRepository.findTaskByUser(itemUpdateRequest.getName(), itemUpdateRequest.getUserName());
    	Item theItem = theTaskList.get(0);
    	System.out.println(theItem);
    	itemRepository.delete(theItem);
    	return (new ApiResponseObject(true, "item updated Successfully"));
    }
    
}
