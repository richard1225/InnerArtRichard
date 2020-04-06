import React from 'react'
import './App.css'
import Navbar from './components/layouts/Navbar'
import SlideShow from './components/slider/Slideshow'
import Login from './components/auth/Login.js'
import Register from './components/auth/Register'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute
} from 'react-router-dom'

const navProps = { title: 'custom Title' }

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar {...navProps} />

        <Switch>
          <Route exact path="/">
            <SlideShow />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
