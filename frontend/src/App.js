import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Homepage from './pages/Homepage';
import Home from './pages/Home';
import Applications from './components/Applications';
import JobFilter from './pages/JobFilter';
import JobPosting from './pages/JobPosting';
import ApplyToJob from './pages/ApplyToJob';
import SavedJobs from './pages/Wishlist';
import Schedule from './pages/Schedule';
import FriendsList from './pages/FriendsList';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import BottomNav from './components/BottomNav';
import Jobs from './components/Jobs';
import authService from './services/authService';
import './App.css';

function RequireAuth({ children }) {
  const location = useLocation();
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// Temporary Dashboard component
const Dashboard = () => {
  const user = authService.getCurrentUser();
  
  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on app load
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user && (
          <button 
            style={{position:'fixed', top:10, right:20, zIndex:200}} 
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={
            user ? <Navigate to="/home" /> : <Login />
          } />
          <Route path="/create-account" element={
            user ? <Navigate to="/home" /> : <CreateAccount />
          } />
          <Route path="/home" element={
            <RequireAuth>
              <Homepage />
            </RequireAuth>
          }>
            <Route index element={<Home />} />
            <Route path="applications" element={<Applications />} />
            <Route path="job-listings">
              <Route index element={<Jobs />} />
              <Route path="filter" element={<JobFilter />} />
              <Route path=":jobId" element={<JobPosting />} />
              <Route path=":jobId/apply" element={<ApplyToJob />} />
            </Route>
            <Route path="schedule" element={<Schedule />} />
            <Route path="profile" element={<Profile />} />
            <Route path="friends">
              <Route index element={<FriendsList />} />
              <Route path=":friendId/profile" element={<Profile />} />
            </Route>
            <Route path="wishlist" element={<SavedJobs />} />
          </Route>
          <Route path="/notifications" element={
            <RequireAuth>
              <Notifications />
            </RequireAuth>
          } />
          <Route path="/register" element={<CreateAccount />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
        <BottomNav loggedIn={!!user} />
      </div>
    </Router>
  );
}

export default App;
