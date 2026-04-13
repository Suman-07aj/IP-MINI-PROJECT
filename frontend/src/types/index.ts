export interface Student {
  rollNumber: string;
  name: string;
  email: string;
  password: string;
  department: string;
  batch: string;
}

export interface StudentLogin {
  email: string;
  password: string;
}

export interface Event {
  id?: string;
  studentRollNumber?: string;
  eventName: string;
  location: string;
  date: string;
  description: string;
  registeredStudents?: string[];
  maxCapacity?: number;
  currentCapacity?: number;
}

export interface StudentWithEvents {
  student: Student;
  events: Event[];
}

export interface EventRegistration {
  eventName: string;
  location: string;
  date: string;
  description: string;
  maxCapacity?: number;
}
