package com.student.studentservice.service;

import com.student.studentservice.model.Student;
import com.student.studentservice.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    public Student registerStudent(Student student) {
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (studentRepository.existsByRollNumber(student.getRollNumber())) {
            throw new RuntimeException("Roll number already exists");
        }
        return studentRepository.save(student);
    }
    
    public Student loginStudent(String email, String password) {
        Student student = studentRepository.findByEmailAndPassword(email, password);
        if (student == null) {
            throw new RuntimeException("Invalid email or password");
        }
        return student;
    }
    
    public Optional<Student> getStudentByEmail(String email) {
        Student student = studentRepository.findByEmail(email);
        return Optional.ofNullable(student);
    }
    
    public Optional<Student> getStudentByRollNumber(String rollNumber) {
        return studentRepository.findAll().stream()
                .filter(student -> student.getRollNumber().equals(rollNumber))
                .findFirst();
    }
}
