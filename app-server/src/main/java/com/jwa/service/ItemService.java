package com.jwa.service;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jwa.api.payload.request.ItemRequestObject;
import com.jwa.api.payload.request.ItemUpdateRequestObject;
import com.jwa.api.payload.response.ItemResponseObject;
import com.jwa.exception.ApiError;
import com.jwa.model.Dates;
import com.jwa.model.Item;
import com.jwa.model.Recurring;
import com.jwa.model.RecurringType;
import com.jwa.model.User;
import com.jwa.repository.DatesRepository;
import com.jwa.repository.ItemRepository;
import com.jwa.repository.RecurringRepository;
import com.jwa.repository.UserRepository;

@Service
public class ItemService {
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private RecurringRepository recurringRepository;
	
	@Autowired
	private DatesRepository datesRepository;
	
	@Transactional
	public boolean addItem(ItemRequestObject ItemRequest, Item item) {
    	if(ItemRequest.getCost() < 0) {
    		throw (new ApiError("Can't have negitive cost"));
    	}
    	
    	User theUser = loadUser(ItemRequest.getUserName());
    	if(item== null) {
    		checkItem(theUser, ItemRequest.getName());
    		item = new Item();
    	}
		item.setUser(theUser);
		item.setName(ItemRequest.getName());
		item.setCost(ItemRequest.getCost());
		item.setDescription(ItemRequest.getDescription());
		item.setDuedate(addDate(ItemRequest.getDuedate()));
		item.setRecurring(addRecurring(ItemRequest.getRecurringsize()));
		if(!(ItemRequest.getEndrecurring() == null)) {
			item.setEnddate(addDate(ItemRequest.getEndrecurring()));
		}
		itemRepository.save(item);
		return true;	
	}
	
	@Transactional
	public boolean editItem(ItemUpdateRequestObject itemUpdateRequest) {
		List<Item> theTaskList = itemRepository.findItemByUser(itemUpdateRequest.getOldName(), itemUpdateRequest.getUserName());
		Item theItem = theTaskList.get(0);
		ItemRequestObject updateItem = new ItemRequestObject(itemUpdateRequest);
		return addItem(updateItem, theItem);
	}
	
	public List<ItemResponseObject> getItems(String userName){
		User theUser = loadUser(userName);
		boolean enddate;
		Date endrecurring;
		List<ItemResponseObject> ItemConent = new ArrayList<ItemResponseObject>();
		for(Item item: theUser.getItems()) {
			if(item.getEnddate() == null) {
				endrecurring = null;
				enddate=false;}
			else{
				enddate= true;
				endrecurring = item.getEnddate().getThedate();}
			ItemConent.add(new ItemResponseObject(item.getName(), item.getDescription(), item.getCost(), item.getDuedate().getThedate(), item.getRecurring().isRecurring(),
					item.getRecurring().getRecurringsize(), enddate, endrecurring));
		}
		return ItemConent;
	}
	
	public boolean checkItemNameAvailable(String userName, String itemName) {
		User theUser = loadUser(userName);	
		for(Item items: theUser.getItems()) {
			if(items.getName().equals(itemName)) 
				return false;
		}
		return true;
	}
	
	public void checkItem(User theUser, String ItemName) {
		for(Item items: theUser.getItems()) {
			if(items.getName().equals(ItemName)) 
				throw (new ApiError("Expense Name already Exists"));
		}
	}
	
	public boolean deleteItem(String name, String userName) {
    	List<Item> theTaskList = itemRepository.findItemByUser(name, userName);
    	Item theItem = theTaskList.get(0);
    	itemRepository.delete(theItem);
		return true;
	}
	
	public User loadUser(String UserName) {
		Optional<User> userOption = userRepository.findByUsername(UserName);
		if(!userOption.isPresent())
			throw (new ApiError("Didn't find User"));
		return userOption.get();
	}
	
	@Transactional
	public Recurring addRecurring(RecurringType recurring) {
		Optional<Recurring> recurringOption = recurringRepository.findByRecurringsize(recurring);
		if(!recurringOption.isPresent())
			throw (new ApiError("Didn't find recurring"));
		
		return recurringOption.get();
	}
	
	/**
	 * 
	 * @param date the date to reference in the DB
	 * @return the date from the DB
	 */
	@Transactional
	public Dates addDate(Date date) {
		date = badFixForIssue(date); //bad temp fix
		System.out.println("date: "+ date);
		Optional<Dates> dateOption = datesRepository.findByThedate(date);
		System.out.println(dateOption);
		if(!dateOption.isPresent()) {
			Dates newDate = new Dates(date);
			datesRepository.save(newDate);
			System.out.println("newDate: "+ newDate);
			return newDate;
		}
		else 
			System.out.println("get: "+ dateOption.get());
			return dateOption.get();
	}
	
	/**
	 * a bad temp fix for the issue of date being 1 date behind
	 * @param date the date to change
	 * @return date 1 day ahead
	 */
	public Date badFixForIssue(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_YEAR,1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return new Date(cal.getTimeInMillis());
	}
}
