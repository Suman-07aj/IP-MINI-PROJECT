import { Student, StudentLogin, Event, EventRegistration } from '../types';

const STUDENT_API_URL = 'https://student-service-xxxx.onrender.com/api/students';
const EVENT_API_URL = 'https://event-service-k6y4.onrender.com/api/events';

export const studentService = {
  register: async (student: Student): Promise<void> => {
    const response = await fetch(`${STUDENT_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
  },

  login: async (credentials: StudentLogin): Promise<Student> => {
    const response = await fetch(`${STUDENT_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },
};

export const eventService = {
  getEventsByRollNumber: async (rollNumber: string): Promise<Event[]> => {
    const response = await fetch(`${EVENT_API_URL}/${rollNumber}`);

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return response.json();
  },

  getAllAvailableEvents: async (): Promise<Event[]> => {
    const response = await fetch(`${EVENT_API_URL}/available`);

    if (!response.ok) {
      throw new Error('Failed to fetch available events');
    }

    return response.json();
  },

  registerForEvent: async (eventId: string, rollNumber: string): Promise<void> => {
    const response = await fetch(`${EVENT_API_URL}/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rollNumber }),
    });

    if (!response.ok) {
      throw new Error('Failed to register for event');
    }
  },

  unregisterFromEvent: async (eventId: string, rollNumber: string): Promise<void> => {
    const response = await fetch(`${EVENT_API_URL}/${eventId}/unregister/${rollNumber}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to unregister from event');
    }
  },

  createEvent: async (event: EventRegistration): Promise<Event> => {
    const response = await fetch(`${EVENT_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error('Failed to create event');
    }

    return response.json();
  },
};
