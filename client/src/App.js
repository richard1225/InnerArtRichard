import React from 'react'
import './App.css'
import Navbar from './components/layouts/Navbar'
import SlideShow from './components/slider/Slideshow'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App () {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <SlideShow />
      </Router>
    </div>
  )
}

export default App
