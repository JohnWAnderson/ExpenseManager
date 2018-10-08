package com.jwa.exception;

public class ApiError extends RuntimeException {

	public ApiError(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public ApiError(String arg0) {
		super(arg0);
	}

	public ApiError(Throwable arg0) {
		super(arg0);
	}

	
}
