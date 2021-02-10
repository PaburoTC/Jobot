import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import './EmailPreferences.css';

const EmailPreferences = props =>{
    const didMount = useRef(false)

    const [emailMonday, setEmailMonday] = useState(false)
    const [emailTuesday, setEmailTuesday] = useState(false)
    const [emailWednesday, setEmailWednesday] = useState(false)
    const [emailThursday, setEmailThursday] = useState(false)
    const [emailFriday, setEmailFriday] = useState(false)
    const [emailSaturday, setEmailSaturday] = useState(false)
    const [emailSunday, setEmailSunday] = useState(false)

    useEffect(()=>{
        axios.get(`/profile/${props.user}`)
            .then(response => {
                if(response.data.exists){
                    setEmailMonday(response.data.profile[0])
                    setEmailTuesday(response.data.profile[1])
                    setEmailWednesday(response.data.profile[2])
                    setEmailThursday(response.data.profile[3])
                    setEmailFriday(response.data.profile[4])
                    setEmailSaturday(response.data.profile[5])
                    setEmailSunday(response.data.profile[6])
                    didMount.current = true;
                }
            })

    }, [props.user])

    useEffect(()=>{
        if(didMount.current){
            axios.post(`/profile/${props.user}`,
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
        }
    },[props.user, emailMonday,emailTuesday,emailWednesday,emailThursday,emailFriday,emailSaturday,emailSunday])

    return(
        <div id="email-preferences">
            <h2>Quiero recibir notificaciones de eventos que caigan en</h2>
            <div className="switch-container">
                <label className="switch">
                    <input type="checkbox" name="0" onChange={event =>setEmailMonday(event.target.checked)} checked={emailMonday}/>
                    <span className="slider"/>
                </label>
                <div>Lunes</div>
            </div>
            <div className="switch-container">
                <label className="switch">
                    <input type="checkbox" name="1" onChange={event => setEmailTuesday(event.target.checked)} checked={emailTuesday}/>
                    <span className="slider"/>
                </label>
                <div>Martes</div>
            </div>
            <div className="switch-container">
                <label className="switch">
                    <input type="checkbox" name="2" onChange={event => setEmailWednesday(event.target.checked)} checked={emailWednesday}/>
                    <span className="slider"/>
                </label>
                <div>Miércoles</div>
            </div>
            <div className="switch-container">
                <label className="switch">
                    <input type="checkbox" name="3" onChange={event => setEmailThursday(event.target.checked)} checked={emailThursday}/>
                    <span className="slider"/>
                </label>
                <div>Jueves</div>
            </div>
            <div className="switch-container">
                <label className="switch">
                    <input type="checkbox" name="4" onChange={event => setEmailFriday(event.target.checked)} checked={emailFriday}/>
                    <span className="slider"/>
                </label>
                <div>Viernes</div>
            </div>
            <div className="switch-container">
                <label className="switch">
                    <input type="checkbox" name="5" onChange={event => setEmailSaturday(event.target.checked)} checked={emailSaturday}/>
                    <span className="slider"/>
                </label>
                <div>Sábado</div>
            </div>
            <div className="switch-container">
                <label className="switch">
                    <input type="checkbox" name="6" onChange={event => setEmailSunday(event.target.checked)} checked={emailSunday}/>
                    <span className="slider"/>
                </label>
                <div>Domingo</div>
            </div>
        </div>
    )
}

export default EmailPreferences;