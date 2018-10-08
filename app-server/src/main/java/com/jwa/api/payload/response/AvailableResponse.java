package com.jwa.api.payload.response;

public class AvailableResponse {
	private Boolean available;

    public AvailableResponse(Boolean available) {
        this.available = available;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
