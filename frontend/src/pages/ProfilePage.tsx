import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student, Event } from '../types';
import { eventService } from '../services/api';

const ProfilePage: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [availableEvents, setAvailableEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<'registered' | 'register'>('registered');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Get student data from localStorage
    const storedStudent = localStorage.getItem('student');
    if (!storedStudent) {
      navigate('/login');
      return;
    }

    const studentData = JSON.parse(storedStudent);
    setStudent(studentData);
    loadEventData(studentData.rollNumber);
  }, [navigate]);

  const loadEventData = async (rollNumber: string) => {
    try {
      setLoading(true);
      const [registeredEventsData, availableEventsData] = await Promise.all([
        eventService.getEventsByRollNumber(rollNumber),
        eventService.getAllAvailableEvents()
      ]);
      
      setRegisteredEvents(registeredEventsData);
      
      // Filter out events that the student is already registered for
      const availableEvents = availableEventsData.filter(event => 
        !registeredEventsData.some(registered => registered.id === event.id)
      );
      setAvailableEvents(availableEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/');
  };

  const handleRegisterEvent = async (event: Event) => {
    if (!student || !event.id) return;
    
    try {
      await eventService.registerForEvent(event.id, student.rollNumber);
      
      // Reload event data to reflect changes
      await loadEventData(student.rollNumber);
      
      alert('Successfully registered for event!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register for event');
    }
  };

  const handleUnregisterEvent = async (event: Event) => {
    if (!student || !event.id) return;
    
    try {
      await eventService.unregisterFromEvent(event.id, student.rollNumber);
      
      // Reload event data to reflect changes
      await loadEventData(student.rollNumber);
      
      alert('Successfully unregistered from event!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unregister from event');
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-soft sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-royal-600 to-navy-800 rounded-xl flex items-center justify-center shadow-medium">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-royal-700 to-navy-800 bg-clip-text text-transparent">
                  Event Portal
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="premium-button bg-red-500 hover:bg-red-600 text-white shadow-medium"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Student Info Card */}
          <div className="premium-card p-8 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Profile</h1>
                <p className="text-slate-600">Manage your event registrations and personal information</p>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-royal-600 to-navy-800 rounded-2xl flex items-center justify-center shadow-large">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-royal-50 to-royal-100 p-4 rounded-xl border border-royal-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-royal-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-royal-700">Name</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{student.name}</p>
              </div>

              <div className="bg-gradient-to-br from-navy-50 to-navy-100 p-4 rounded-xl border border-navy-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-navy-700">Roll Number</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{student.rollNumber}</p>
              </div>

              <div className="bg-gradient-to-br from-gold-50 to-gold-100 p-4 rounded-xl border border-gold-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gold-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gold-700">Email</span>
                </div>
                <p className="text-sm font-bold text-slate-900 truncate">{student.email}</p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Department</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{student.department}</p>
                <p className="text-sm text-slate-600">Batch {student.batch}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-8 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-soft animate-slide-up">
            <button
              onClick={() => setActiveTab('registered')}
              className={`premium-button flex-1 ${activeTab === 'registered' ? 'premium-gradient' : 'bg-white text-royal-700 border border-royal-200'}`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Registered Events ({registeredEvents.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`premium-button flex-1 ${activeTab === 'register' ? 'premium-gradient' : 'bg-white text-royal-700 border border-royal-200'}`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Available Events ({availableEvents.length})
              </span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message mb-8 animate-slide-up">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Content Based on Active Tab */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-royal-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-royal-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-slate-500 text-lg">Loading events...</p>
            </div>
          ) : activeTab === 'registered' ? (
            <div className="animate-fade-in">
              {registeredEvents.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">No Registered Events</h2>
                  <p className="text-slate-500 mb-8 text-lg">You haven't registered for any events yet.</p>
                  <button
                    onClick={() => setActiveTab('register')}
                    className="premium-button premium-gradient text-lg shadow-large"
                  >
                    Browse Available Events
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {registeredEvents.map((event, index) => (
                    <div
                      key={index}
                      className="premium-card p-6 animate-slide-up hover:shadow-elegant"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                            {event.eventName}
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center text-slate-700">
                              <div className="w-8 h-8 bg-royal-100 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-royal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-semibold text-sm">Location</p>
                                <p className="text-slate-600">{event.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center text-slate-700">
                              <div className="w-8 h-8 bg-gold-100 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                  <line x1="16" y1="2" x2="16" y2="6"></line>
                                  <line x1="8" y1="2" x2="8" y2="6"></line>
                                  <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                              </div>
                              <div>
                                <p className="font-semibold text-sm">Date</p>
                                <p className="text-slate-600">{new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => handleUnregisterEvent(event)}
                          className="premium-button bg-red-500 hover:bg-red-600 text-white shadow-medium"
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Unregister
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="animate-fade-in">
              {availableEvents.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">No Available Events</h2>
                  <p className="text-slate-500 text-lg">There are no events available for registration at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {availableEvents.map((event, index) => (
                    <div
                      key={index}
                      className="premium-card p-6 animate-slide-up hover:shadow-elegant"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                            {event.eventName}
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center text-slate-700">
                              <div className="w-8 h-8 bg-royal-100 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-royal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-semibold text-sm">Location</p>
                                <p className="text-slate-600">{event.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center text-slate-700">
                              <div className="w-8 h-8 bg-gold-100 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                  <line x1="16" y1="2" x2="16" y2="6"></line>
                                  <line x1="8" y1="2" x2="8" y2="6"></line>
                                  <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                              </div>
                              <div>
                                <p className="font-semibold text-sm">Date</p>
                                <p className="text-slate-600">{new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</p>
                              </div>
                            </div>
                            {event.maxCapacity && (
                              <div className="flex items-center text-slate-700">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-semibold text-sm">Capacity</p>
                                  <p className="text-slate-600">
                                    {event.currentCapacity || 0} / {event.maxCapacity}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mt-4">
                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => handleRegisterEvent(event)}
                          className="premium-button premium-gradient shadow-large"
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Register
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
