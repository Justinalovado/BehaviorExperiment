import React from 'react'
import EventPlanning from './pages/EventPlanning'
import PostActivity from './pages/PostActivity'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventPlanning />} />
        <Route path="/PostActivity" element={<PostActivity />} />
      </Routes>
    </Router>
  )
}

export default App