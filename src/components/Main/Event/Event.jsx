import React from "react";
import './Event.scss'

const Event = props =>{
    return(
        <div className="event">
            <img src={props.img} alt={props.name}/>
            <div className="event-body">
                <h2>{props.name}</h2>
                <div className="event-available">{props.available ? "":"Agotado"}</div>
                <div>{props.location}</div>
                <div>{props.timestamp}</div>

            </div>
        </div>
    )
}

export default Event;
