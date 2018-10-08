package com.jwa.api.payload.response;

import java.util.List;

public class PagedResponseObject<T> {
	private List<T> content;

    public PagedResponseObject() {}

    public PagedResponseObject(List<T> content) {
        this.content = content;
    }

	public List<T> getContent() {
		return content;
	}

	public void setContent(List<T> content) {
		this.content = content;
	}
    
}
