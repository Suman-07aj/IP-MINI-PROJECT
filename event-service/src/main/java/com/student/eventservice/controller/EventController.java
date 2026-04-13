package com.student.eventservice.controller;

import com.student.eventservice.model.Event;
import com.student.eventservice.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    
    @Autowired
    private EventService eventService;
    
    @GetMapping("/{rollNumber}")
    public ResponseEntity<List<Event>> getEventsByRollNumber(@PathVariable String rollNumber) {
        List<Event> events = eventService.getEventsByRollNumber(rollNumber);
        return ResponseEntity.ok(events);
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Event>> getAllAvailableEvents() {
        List<Event> events = eventService.getAllAvailableEvents();
        return ResponseEntity.ok(events);
    }
    
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event savedEvent = eventService.saveEvent(event);
        return ResponseEntity.ok(savedEvent);
    }
    
    @PostMapping("/{eventId}/register")
    public ResponseEntity<?> registerStudentToEvent(@PathVariable String eventId, @RequestBody Map<String, String> request) {
        String rollNumber = request.get("rollNumber");
        if (rollNumber == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Roll number is required"));
        }
        
        boolean success = eventService.registerStudentToEvent(eventId, rollNumber);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Successfully registered for event"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to register - event may be full or already registered"));
        }
    }
    
    @DeleteMapping("/{eventId}/unregister/{rollNumber}")
    public ResponseEntity<?> unregisterStudentFromEvent(@PathVariable String eventId, @PathVariable String rollNumber) {
        boolean success = eventService.unregisterStudentFromEvent(eventId, rollNumber);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Successfully unregistered from event"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to unregister - student may not be registered for this event"));
        }
    }
}
