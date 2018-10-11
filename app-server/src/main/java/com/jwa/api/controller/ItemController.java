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
import com.jwa.model.Dates;
import com.jwa.model.Item;
import com.jwa.model.Recurring;
import com.jwa.model.User;
import com.jwa.repository.DatesRepository;
import com.jwa.repository.ItemRepository;
import com.jwa.repository.RecurringRepository;
import com.jwa.repository.UserRepository;
import com.jwa.security.CurrentUser;
import com.jwa.security.UserObject;
import com.jwa.service.ItemService;

@RestController
@RequestMapping("/api/items")
public class ItemController {
	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private ItemService itemService;
	
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponseObject createItem(@Valid @RequestBody ItemRequestObject ItemRequest ) {
    	return (new ApiResponseObject(itemService.addItem(ItemRequest, null), "item Created Successfully"));
    }
    
    @GetMapping("/task")
    @PreAuthorize("hasRole('USER')")
    public AvailableResponse checkItemNameAvailable(@CurrentUser UserObject currentUser, @RequestParam(value = "name") String name) {
        return (new AvailableResponse(itemService.checkItemNameAvailable(currentUser.getUsername(), name)));
    }
    
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public PagedResponseObject<ItemResponseObject> getItems(@CurrentUser UserObject currentUser){
		return (new PagedResponseObject<ItemResponseObject>(itemService.getItems(currentUser.getUsername())));
    }
    
    @PutMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponseObject updateItem(@Valid @RequestBody ItemUpdateRequestObject itemUpdateRequest ) {
		return (new ApiResponseObject(itemService.editItem(itemUpdateRequest), "item updated Successfully"));
    }
    
    @DeleteMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponseObject deleteItem(@Valid @RequestBody ItemRequestObject itemUpdateRequest ) {
    	return (new ApiResponseObject(itemService.deleteItem(itemUpdateRequest.getName(), itemUpdateRequest.getUserName()), "item updated Successfully"));
    }
    
}
