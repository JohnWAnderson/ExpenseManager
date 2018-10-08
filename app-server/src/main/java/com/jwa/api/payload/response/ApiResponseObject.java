package com.jwa.api.payload.response;

public class ApiResponseObject {
    private Boolean available;
    private String message;

    public ApiResponseObject(Boolean available, String message) {
		super();
		this.available = available;
		this.message = message;
	}

    public Boolean getAvailable() {
		return available;
	}

	public void setAvailable(Boolean available) {
		this.available = available;
	}

	public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
