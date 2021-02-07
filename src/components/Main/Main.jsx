import React, {useState, useEffect} from 'react';
import  {setCookie,getCookie} from '../../cookie_manager.js'
import './Main.css'
import axios from "axios";

const Main = props =>{
    const [currentUser] = useState(getCookie('current_user'))

    if(currentUser === null){
        props.history.replace('/Login')
    }

    const [emailMonday, setEmailMonday] = useState(false)
    const [emailTuesday, setEmailTuesday] = useState(false)
    const [emailWednesday, setEmailWednesday] = useState(false)
    const [emailThursday, setEmailThursday] = useState(false)
    const [emailFriday, setEmailFriday] = useState(false)
    const [emailSaturday, setEmailSaturday] = useState(false)
    const [emailSunday, setEmailSunday] = useState(false)

    useEffect(()=>{
        axios.get(`https://api.jobot.es/profile/${currentUser}`)
            .then(response => {
                if(response.data.exists){
                    setEmailMonday(response.data.profile[0])
                    setEmailTuesday(response.data.profile[1])
                    setEmailWednesday(response.data.profile[2])
                    setEmailThursday(response.data.profile[3])
                    setEmailFriday(response.data.profile[4])
                    setEmailSaturday(response.data.profile[5])
                    setEmailSunday(response.data.profile[6])
                }
            })
    }, [currentUser])

    useEffect(()=>{
        axios.post(`https://api.jobot.es/profile/${currentUser}`,
            {
                0:emailMonday,
                1:emailTuesday,
                2:emailWednesday,
                3:emailThursday,
                4:emailFriday,
                5:emailSaturday,
                6:emailSunday
            })
            .then(() => {
            }, error => {
                console.log(error)
            })
    },[currentUser,emailMonday,emailTuesday,emailWednesday,emailThursday,emailFriday,emailSaturday,emailSunday])

    const logout = ()=>{
        console.log("POG")
        setCookie('current_user','',0)
        props.history.push('/Login')
    }

    return(
        <div>
            <button onClick={logout}>Cerrar sesión</button>
            <label className="switch">
                <input type="checkbox" name="0" onChange={event =>setEmailMonday(event.target.checked)} checked={emailMonday}/>
                <span className="slider"/>
            </label>
            <label className="switch">
                <input type="checkbox" name="1" onChange={event => setEmailTuesday(event.target.checked)} checked={emailTuesday}/>
                <span className="slider"/>
            </label>
            <label className="switch">
                <input type="checkbox" name="2" onChange={event => setEmailWednesday(event.target.checked)} checked={emailWednesday}/>
                <span className="slider"/>
            </label>
            <label className="switch">
                <input type="checkbox" name="3" onChange={event => setEmailThursday(event.target.checked)} checked={emailThursday}/>
                <span className="slider"/>
            </label>
            <label className="switch">
                <input type="checkbox" name="4" onChange={event => setEmailFriday(event.target.checked)} checked={emailFriday}/>
                <span className="slider"/>
            </label>
            <label className="switch">
                <input type="checkbox" name="5" onChange={event => setEmailSaturday(event.target.checked)} checked={emailSaturday}/>
                <span className="slider"/>
            </label>
            <label className="switch">
                <input type="checkbox" name="6" onChange={event => setEmailSunday(event.target.checked)} checked={emailSunday}/>
                <span className="slider"/>
            </label>
        </div>
    )
}

export default Main;