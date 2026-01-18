import React from 'react'
import EventBanner from '../Component/Pagecomponent/Banner/EventBanner'
import AddHighlight from '../Component/Pagecomponent/EventComponrnt/EventHighlight/AddHighlight'
import HighlightTable from '../Component/Pagecomponent/EventComponrnt/EventHighlight/HighlightTable'

function Events() {
  return (
    <div>
   
   <EventBanner/>
   {/* <AddHighlight/> */}
   <HighlightTable/>
    </div>
  )
}

export default Events