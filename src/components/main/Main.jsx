import React from 'react';
import  {setCookie,getCookie} from '../../cookie_manager.js'
import './Main.css'

const Main = props =>{
    if(getCookie('current_user') === null){
        props.history.replace('/login')
    }
    const logout = ()=>{
        console.log("POG")
        setCookie('current_user','',0)
        props.history.push('/login')
    }
    return(
        <div>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    )
}

export default Main;