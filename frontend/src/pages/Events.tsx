import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Student, Event } from '../types';

const Events: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { student, events } = location.state as { student: Student; events: Event[] };

  if (!student || !events) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Events</h1>
          <div className="card">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Student Name: <span className="text-gray-900">{student.name}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Roll Number: <span className="text-gray-900">{student.rollNumber}</span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Back to Login
          </button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">No Events Found</h2>
            <p className="text-gray-500">There are no events registered for this student.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1">
            {events.map((event, index) => (
              <div
                key={index}
                className="card"
                style={{ transition: 'box-shadow 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.eventName}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem', color: '#6b7280' }}>
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">Location:</span>
                    <span style={{ marginLeft: '0.5rem' }}>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem', color: '#6b7280' }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className="font-medium">Date:</span>
                    <span style={{ marginLeft: '0.5rem' }}>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
