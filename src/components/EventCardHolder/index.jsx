import React from "react";
import EventCard from "../EventCard";
import './EventCardHolder.css';

function EventCardHolder ({event}) {

    return (
        <>
        <div class="grid">
        {
            event.map((eachEvent, index) => {
              return (
                <div class="grid-item">
                <EventCard 
                key={eachEvent.id}
                index={index}
                id={eachEvent.id}
                data={eachEvent} />
                </div>
              )
        })
        }
        
        </div>
        </>
    )
}

export default EventCardHolder;