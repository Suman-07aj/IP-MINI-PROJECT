package com.student.studentservice.repository;

import com.student.studentservice.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    Student findByEmail(String email);
    Student findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByRollNumber(String rollNumber);
}
