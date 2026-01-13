import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
import Service from './Pages/Service'
import Events from './Pages/Events'
import Rooms from './Pages/Rooms'
import Gallery from './Pages/Gallery'
import Contact from './Pages/Contact'
import Layout from './HOC/Layout'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>} >
      <Route path="/home" element = {<Home />}/>
      <Route path="/about" element = {<AboutUs />}/>
      <Route path="/service" element = {<Service />}/>
      <Route path="/events" element = {<Events />}/>
      <Route path="/room" element = {<Rooms />}/>
      <Route path="/gallery" element = {<Gallery/>}/>
      <Route path="/contact" element = {<Contact/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App