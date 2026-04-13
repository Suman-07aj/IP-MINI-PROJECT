package com.student.studentservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "students")
public class Student {
    
    @Id
    private String id;
    
    @Field("rollNumber")
    private String rollNumber;
    
    @Field("name")
    private String name;
    
    @Field("email")
    private String email;
    
    @Field("password")
    private String password;
    
    @Field("department")
    private String department;
    
    @Field("batch")
    private String batch;
    
    public Student() {}
    
    public Student(String rollNumber, String name, String email, String password, String department, String batch) {
        this.rollNumber = rollNumber;
        this.name = name;
        this.email = email;
        this.password = password;
        this.department = department;
        this.batch = batch;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getRollNumber() {
        return rollNumber;
    }
    
    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getBatch() {
        return batch;
    }
    
    public void setBatch(String batch) {
        this.batch = batch;
    }
}
