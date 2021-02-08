import React, {useState} from 'react';
import  {setCookie,getCookie} from '../../cookie_manager.js'
import './Main.css'
import EmailPreferences from "./EmailPreferences/EmailPreferences";

const Main = props =>{
    const [currentUser] = useState(getCookie('current_user'))

    if(currentUser === null){
        props.history.replace('/Login')
    }


    const logout = ()=>{
        console.log("POG")
        setCookie('current_user','',0)
        props.history.push('/Login')
    }

    return(
        <div>
            <button onClick={logout}>Cerrar sesión</button>
            <EmailPreferences user={currentUser}/>
        </div>
    )
}

export default Main;