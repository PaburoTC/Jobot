import React, {useState} from "react";
import './Login.css'
import axios from "axios";
import {setCookie} from "../../cookie_manager";

const Login = props =>{

    const [email, setEmail]         = useState('')
    const [password, setPassword]   = useState('')
    const [formError, setFormError] = useState('')



    const handleSubmit = event =>{
        event.preventDefault();
        setFormError('');

        axios.post('http://api.jobot.es/auth/login',
            {
                username: email,
                email: email,
                password: password
            }
        ).then(response => {
            if(response.data.message ==='Success'){
                setCookie('current_user', response.data.user, 1)
                props.history.push('/');
            }else{
                setFormError('Usuario o contraseña incorrectos')
            }
        }, error => {
            console.log(error)
        });
    }

    return(
        <div>
            <form className="login-form" onSubmit={handleSubmit}>
                <br/>
                <div className="login-form-input">
                    <label>Email o Usuario</label>
                    <input type="text" value={email} onChange={event => setEmail(event.target.value)}/>
                </div>


                <div className="login-form-input">
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                </div>

                <div className="form-error">{formError}</div>
                <button type="submit">Login</button>
                <div>¿No tienes cuenta?</div>
                <button>Inicia sesión con Google</button>
                <button type="submit" onClick={()=>props.history.push('/register')}>Registrarse</button>
            </form>
        </div>
    )
}

export default Login;