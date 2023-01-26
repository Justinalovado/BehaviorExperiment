import React from 'react'
import EventPlanning from './pages/EventPlanning'
import ReEventPlanning from './pages/ReEventPlanning';
import PostActivity from './pages/PostActivity'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PreActivity from './pages/PreActivity';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ReEventPlanning />} />
        {/* <Route path='/' element={<EventPlanning />} /> */}
        <Route path='/PreActivity' element={<PreActivity />} />
        <Route path="/PostActivity" element={<PostActivity />} />
        <Route path='*' element={<h1>Error404</h1>} />
      </Routes>
    </Router>

  )
}

export default App