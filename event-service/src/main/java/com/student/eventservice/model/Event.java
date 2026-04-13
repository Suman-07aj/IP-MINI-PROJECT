package com.student.eventservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "events")
public class Event {
    
    @Id
    private String id;
    
    @Field("eventName")
    private String eventName;
    
    @Field("location")
    private String location;
    
    @Field("date")
    private String date;
    
    @Field("description")
    private String description;
    
    @Field("registeredStudents")
    private java.util.List<String> registeredStudents;
    
    @Field("maxCapacity")
    private Integer maxCapacity;
    
    @Field("currentCapacity")
    private Integer currentCapacity;
    
    public Event() {
        this.registeredStudents = new java.util.ArrayList<>();
        this.maxCapacity = 100;
        this.currentCapacity = 0;
    }
    
    public Event(String eventName, String location, String date, String description) {
        this();
        this.eventName = eventName;
        this.location = location;
        this.date = date;
        this.description = description;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getEventName() {
        return eventName;
    }
    
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public String getDate() {
        return date;
    }
    
    public void setDate(String date) {
        this.date = date;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public java.util.List<String> getRegisteredStudents() {
        return registeredStudents;
    }
    
    public void setRegisteredStudents(java.util.List<String> registeredStudents) {
        this.registeredStudents = registeredStudents;
        this.currentCapacity = registeredStudents != null ? registeredStudents.size() : 0;
    }
    
    public Integer getMaxCapacity() {
        return maxCapacity;
    }
    
    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }
    
    public Integer getCurrentCapacity() {
        return currentCapacity;
    }
    
    public void setCurrentCapacity(Integer currentCapacity) {
        this.currentCapacity = currentCapacity;
    }
    
    public boolean addStudent(String rollNumber) {
        if (registeredStudents == null) {
            registeredStudents = new java.util.ArrayList<>();
        }
        if (!registeredStudents.contains(rollNumber) && 
            (maxCapacity == null || currentCapacity < maxCapacity)) {
            registeredStudents.add(rollNumber);
            currentCapacity = registeredStudents.size();
            return true;
        }
        return false;
    }
    
    public boolean removeStudent(String rollNumber) {
        if (registeredStudents != null && registeredStudents.contains(rollNumber)) {
            registeredStudents.remove(rollNumber);
            currentCapacity = registeredStudents.size();
            return true;
        }
        return false;
    }
    
    public boolean isStudentRegistered(String rollNumber) {
        return registeredStudents != null && registeredStudents.contains(rollNumber);
    }
    
    public boolean isFull() {
        return maxCapacity != null && currentCapacity >= maxCapacity;
    }
}
