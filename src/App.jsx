import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import Home from './components/pages/Home'
import AboutUs from './components/pages/AboutUs'
import Service from './components/pages/Service'
import Events from './components/pages/Events'
import Rooms from './components/pages/Rooms'
import Gallery from './components/pages/Gallery'
import Contact from './components/pages/Contact'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout/>} >
      <Route path="/home" element = {<Home />}/>
      <Route path="/about" element = {<AboutUs />}/>
      <Route path="/service" element = {<Service />}/>
      <Route path="/events" element = {<Events />}/>
      <Route path="/rooms" element = {<Rooms />}/>
      <Route path="/gallery" element = {<Gallery/>}/>
      <Route path="/contact" element = {<Contact/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App