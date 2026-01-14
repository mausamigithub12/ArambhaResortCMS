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
import AddSpecial from './Component/Pagecomponent/AboutComponent/ArambhaSpecial/AddSpecial'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>} >
      <Route path="/home" element = {<Home />}/>
      <Route path="/about" element = {<AboutUs />}/>
      <Route path="/service" element = {<Service />}/>
      <Route path="/event" element = {<Events />}/>
      <Route path="/room" element = {<Rooms />}/>
      <Route path="/gallery" element = {<Gallery/>}/>
      <Route path="/contact" element = {<Contact/>}/>
      <Route path="/addspecial" element = {<AddSpecial/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App