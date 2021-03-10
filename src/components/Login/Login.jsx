import React, {useState} from "react";
import './Login.scss'
import axios from "axios";
import {setCookie, getCookie} from "../../cookie_manager";
import {GoogleLogin} from 'react-google-login';

const Login = props =>{

    const [email, setEmail]         = useState('')
    const [password, setPassword]   = useState('')
    const [formError, setFormError] = useState('')

    const clientID = '780234949397-80ds1tk4arnth6ch6is95e98lqgps8k1.apps.googleusercontent.com'

    const handleSubmit = event =>{
        event.preventDefault();
        setFormError('');

        axios.post('https://jobot.es/api/auth/login',
            {
                username: email,
                email: email,
                password: password
            },
            {
                headers: {'X-CSRFToken': getCookie('csrftoken'), 'xD':'xD', lol:'lol'}
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
                <GoogleLogin
                    clientId={clientID}
                    buttonText="Inicia sesión con Google"
                    onSuccess={response => console.log('SUCCESS: ',response)}
                    onFailure={response => console.log('FAILURE: ', response.profileObj)}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
                <button type="submit" onClick={()=>props.history.push('/Register')}>Registrarse</button>
            </form>
        </div>
    )
}

export default Login;
