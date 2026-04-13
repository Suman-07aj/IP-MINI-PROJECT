package com.student.eventservice.service;

import com.student.eventservice.model.Event;
import com.student.eventservice.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService implements CommandLineRunner {
    
    @Autowired
    private EventRepository eventRepository;
    
    public List<Event> getEventsByRollNumber(String rollNumber) {
        return eventRepository.findByRegisteredStudentsContaining(rollNumber);
    }
    
    public List<Event> getAllAvailableEvents() {
        return eventRepository.findAll();
    }
    
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }
    
    public boolean registerStudentToEvent(String eventId, String rollNumber) {
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            if (event.addStudent(rollNumber)) {
                eventRepository.save(event);
                return true;
            }
        }
        return false;
    }
    
    public boolean unregisterStudentFromEvent(String eventId, String rollNumber) {
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            if (event.removeStudent(rollNumber)) {
                eventRepository.save(event);
                return true;
            }
        }
        return false;
    }
    
    @Override
    public void run(String... args) throws Exception {
        // Add sample data for testing
        if (eventRepository.count() == 0) {
            // Sample events for different students
            Event event1 = new Event("Tech Symposium 2024", "Main Auditorium", "2024-04-15", 
                "Annual technology symposium featuring latest innovations in AI, ML, and cloud computing.");
            event1.addStudent("CS101");
            eventRepository.save(event1);
            
            Event event2 = new Event("Hackathon Weekend", "Computer Lab", "2024-04-20", 
                "48-hour hackathon to solve real-world problems using cutting-edge technologies.");
            event2.addStudent("CS101");
            eventRepository.save(event2);
            
            Event event3 = new Event("Workshop: Web Development", "Room 301", "2024-04-18", 
                "Hands-on workshop covering modern web development frameworks and best practices.");
            event3.addStudent("CS102");
            eventRepository.save(event3);
            
            Event event4 = new Event("Guest Lecture: Cybersecurity", "Conference Hall", "2024-04-22", 
                "Industry expert shares insights on emerging cybersecurity threats and defense strategies.");
            event4.addStudent("CS103");
            eventRepository.save(event4);
            
            Event event5 = new Event("Coding Competition", "Tech Center", "2024-04-25", 
                "Inter-college coding competition with exciting prizes and recognition.");
            event5.addStudent("CS103");
            eventRepository.save(event5);
            
            // Additional available events
            Event event6 = new Event("AI Workshop 2024", "Tech Lab", "2024-05-15", 
                "Hands-on workshop on artificial intelligence and machine learning");
            eventRepository.save(event6);
            
            Event event7 = new Event("Web Development Bootcamp", "Computer Lab", "2024-05-20", 
                "Intensive bootcamp covering modern web development technologies");
            eventRepository.save(event7);
            
            Event event8 = new Event("Data Science Symposium", "Conference Hall", "2024-05-25", 
                "Symposium featuring latest trends in data science and analytics");
            eventRepository.save(event8);
            
            System.out.println("Sample event data initialized successfully!");
        }
    }
}
