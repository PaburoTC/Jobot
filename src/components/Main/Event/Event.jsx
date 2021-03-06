import React from "react";
import './Event.scss'

const Event = props =>{
    return(
        <div className="event">
            <img src={props.img} alt=""/>
            <div className="event-body">
                <h2>{props.name}</h2>
                <div>{props.location}</div>
                <div>
                    {props.endTimestamp === null ?
                        props.startTimestamp :
                        props.startTimestamp + " - " + props.endTimestamp}
                </div>
                <div className="event-available">{props.available ? "":"Agotado"}</div>
            </div>
        </div>
    )
}

export default Event;
