import React, {useState, useEffect, useRef} from 'react';
import  {setCookie,getCookie} from '../../cookie_manager.js'
import './Main.scss'
import Event from "./Event/Event";
import axios from "axios";

const Main = props =>{

    const didMount = useRef(false)

    const [currentUser, setCurrentUser] = useState({
        username:"",
        profile: {
            0 : false,
            1 : false,
            2 : false,
            3 : false,
            4 : false,
            5 : false,
            6 : false
        }
    })

    const [events, setEvents] = useState([])

    const [userUUID] = useState(getCookie('current_user'))

    if(userUUID === null){
        props.history.replace('/Login')
    }

    const logout = ()=>{
        setCookie('current_user','',0)
        props.history.push('/Login')
    }

    useEffect(()=>{
        axios.get('https://api.jobot.es/events')
        .then(response => {
              setEvents(response.data)
        })
        axios.get(`https://api.jobot.es/auth/user/${userUUID}`)
            .then(response => {
                setCurrentUser(response.data.user)
                didMount.current = true;
            })
    },[userUUID])

    useEffect(()=>{
        if(didMount.current){
            axios.post(`https://api.jobot.es/profile/${userUUID}`, currentUser.profile)
                .then(() => {

                }, error => {
                    console.log(error)
                })
        }
    },[currentUser, userUUID])

    return(
        <div>
            <header>
                {currentUser.username}
                <button onClick={logout}>Cerrar sesión</button>
            </header>
            <div id="body">
                <div id="email-preferences">
                    <h2>Quiero recibir notificaciones de eventos que caigan en</h2>
                    <div className="switch-container">
                        <label className="switch">
                            <input type="checkbox" name="0" onChange={event =>setCurrentUser({...currentUser, profile: {...currentUser.profile,0: event.target.checked}})} checked={currentUser.profile[0]}/>
                            <span className="slider"/>
                        </label>
                        <div>Lunes</div>
                    </div>
                    <div className="switch-container">
                        <label className="switch">
                            <input type="checkbox" name="1" onChange={event =>setCurrentUser({...currentUser, profile: {...currentUser.profile,1: event.target.checked}})} checked={currentUser.profile[1]}/>
                            <span className="slider"/>
                        </label>
                        <div>Martes</div>
                    </div>
                    <div className="switch-container">
                        <label className="switch">
                            <input type="checkbox" name="2" onChange={event =>setCurrentUser({...currentUser, profile: {...currentUser.profile,2: event.target.checked}})} checked={currentUser.profile[2]}/>
                            <span className="slider"/>
                        </label>
                        <div>Miércoles</div>
                    </div>
                    <div className="switch-container">
                        <label className="switch">
                            <input type="checkbox" name="3" onChange={event =>setCurrentUser({...currentUser, profile: {...currentUser.profile,3: event.target.checked}})} checked={currentUser.profile[3]}/>
                            <span className="slider"/>
                        </label>
                        <div>Jueves</div>
                    </div>
                    <div className="switch-container">
                        <label className="switch">
                            <input type="checkbox" name="4" onChange={event =>setCurrentUser({...currentUser, profile: {...currentUser.profile,4: event.target.checked}})} checked={currentUser.profile[4]}/>
                            <span className="slider"/>
                        </label>
                        <div>Viernes</div>
                    </div>
                    <div className="switch-container">
                        <label className="switch">
                            <input type="checkbox" name="5" onChange={event =>setCurrentUser({...currentUser, profile: {...currentUser.profile,5: event.target.checked}})} checked={currentUser.profile[5]}/>
                            <span className="slider"/>
                        </label>
                        <div>Sábado</div>
                    </div>
                    <div className="switch-container">
                        <label className="switch">
                            <input type="checkbox" name="6" onChange={event =>setCurrentUser({...currentUser, profile: {...currentUser.profile,6: event.target.checked}})} checked={currentUser.profile[6]}/>
                            <span className="slider"/>
                        </label>
                        <div>Domingo</div>
                    </div>
                </div>
                <div id="events">
                    {events.map(event => <Event key={event.id} name={event.name} location={event.location} img={event.img} timestamp={event.timestamp} available={event.available}/>)}
                </div>
            </div>
        </div>
    )
}



export default Main;
