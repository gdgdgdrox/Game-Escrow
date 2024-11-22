package com.escrowforgame.server.entity;

import java.time.Instant;
import java.time.format.DateTimeFormatter;

public abstract class BaseTransactionStep {
 private String createdDate;
    private String completedDate;
    private String status;
    private final DateTimeFormatter ISO_FORMATTER = DateTimeFormatter.ISO_INSTANT;


    public void setCreatedDate(){
        this.createdDate = ISO_FORMATTER.format(Instant.now());
    }

    public void setCompletedDate(){
        this.completedDate = ISO_FORMATTER.format(Instant.now());
    }

    public void setStatus(String status){
        this.status = status;
    }

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getCompletedDate() {
		return completedDate;
	}

	public void setCompletedDate(String completedDate) {
		this.completedDate = completedDate;
	}

	public String getStatus() {
		return status;
	}
}
