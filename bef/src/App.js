import React from 'react'
import EventPlanning from './pages/EventPlanning'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PreActivity from './pages/PreActivity';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<EventPlanning />} />
        <Route path='/pre-activity' element={<PreActivity />} />
        <Route path='*' element={<h1>Error404</h1>} />
      </Routes>
    </Router>

  )
}

export default App