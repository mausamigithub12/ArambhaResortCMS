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
import SpecialTable from './Component/Pagecomponent/AboutComponent/ArambhaSpecial/SpecialTable'
import ViewSpecial from './Component/Pagecomponent/AboutComponent/ArambhaSpecial/ViewSpecial'
import EditSpecial from './Component/Pagecomponent/AboutComponent/ArambhaSpecial/EditSpecial'
import AddHighlight from './Component/Pagecomponent/EventComponrnt/EventHighlight/AddHighlight'
import HighlightTable from './Component/Pagecomponent/EventComponrnt/EventHighlight/HighlightTable'
import EditHighlight from './Component/Pagecomponent/EventComponrnt/EventHighlight/EditHighlight'
import ViewHighlight from './Component/Pagecomponent/EventComponrnt/EventHighlight/ViewHighlight'
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
<Route path="/specialtable" element={<SpecialTable/>}/>
<Route path="/specialtable/editspecial/:id" element={<EditSpecial/>}/>
<Route path="/specialtable/viewspecial/:id" element={<ViewSpecial />}/>
<Route path="/addhighlight" element={<AddHighlight />}/>
<Route path="/highlighttable" element={<HighlightTable />}/>
<Route path="/highlighttable/view/:id" element={<ViewHighlight />} />
<Route path="/highlighttable/edit/:id" element={<EditHighlight />} />


      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App