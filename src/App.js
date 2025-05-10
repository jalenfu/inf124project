import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Homepage from './pages/Homepage';
import Home from './pages/Home';
import ApplicationList from './pages/ApplicationList';
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
import './App.css';

function RequireAuth({ loggedIn, children }) {
  const location = useLocation();
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const loggedIn = !!user;

  return (
    <Router>
      <div className="App">
        {loggedIn && (
          <button style={{position:'fixed',top:10,right:20,zIndex:200}} onClick={() => setUser(null)}>
            Logout
          </button>
        )}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/create-account" element={<CreateAccount onCreate={setUser} />} />
          <Route path="/home" element={
            loggedIn ? <Homepage /> : <Home notLoggedIn />
          }>
            <Route index element={loggedIn ? <Home /> : <Home notLoggedIn />} />
            <Route path="applications" element={
              <RequireAuth loggedIn={loggedIn}><ApplicationList /></RequireAuth>
            } />
            <Route path="job-listings">
              <Route index element={<SavedJobs />} />
              <Route path="filter" element={
                <RequireAuth loggedIn={loggedIn}><JobFilter /></RequireAuth>
              } />
              <Route path=":jobId" element={
                <RequireAuth loggedIn={loggedIn}><JobPosting /></RequireAuth>
              } />
              <Route path=":jobId/apply" element={
                <RequireAuth loggedIn={loggedIn}><ApplyToJob /></RequireAuth>
              } />
            </Route>
            <Route path="schedule" element={
              <RequireAuth loggedIn={loggedIn}><Schedule /></RequireAuth>
            } />
            <Route path="friends">
              <Route index element={
                <RequireAuth loggedIn={loggedIn}><FriendsList /></RequireAuth>
              } />
              <Route path=":friendId/profile" element={
                <RequireAuth loggedIn={loggedIn}><Profile /></RequireAuth>
              } />
            </Route>
            <Route path="saved" element={
              <RequireAuth loggedIn={loggedIn}><SavedJobs /></RequireAuth>
            } />
          </Route>
          <Route path="/notifications" element={
            <RequireAuth loggedIn={loggedIn}><Notifications /></RequireAuth>
          } />
        </Routes>
        <BottomNav loggedIn={loggedIn} />
      </div>
    </Router>
  );
}

export default App;
