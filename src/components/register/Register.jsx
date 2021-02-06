import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import  {getCookie, setCookie} from '../../cookie_manager.js'

import './Register.css';
import Green from './img/green.png'
import Red from './img/red.png'

const Register = props => {
    if(getCookie('current_user') !== null){
        props.history.replace('/')
    }

    const didMountUsernameRef = useRef(false)
    const didMountEmailRef = useRef(false)
    const didMountPasswordRef = useRef(false)

    const [username, setUsername]                 = useState('');
    const [usernameError, setUsernameError]       = useState('');
    const [usernameValid, setUsernameValid]       = useState('');
    const [usernameValidator]                     = useState(new RegExp('[a-zA-Z0-9]+$'));

    const [email, setEmail]                       = useState('');
    const [emailError, setEmailError]             = useState('');
    const [emailValid, setEmailValid]             = useState('');
    const [emailValidator]                        = useState(new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[]|\\\\[])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[]|\\\\[])+)])'));

    const [password, setPassword]                 = useState('');
    const [passwordError, setPasswordError]       = useState('');
    const [passwordValid, setPasswordValid]       = useState('');
    const [passwordValidator]                     = useState(new RegExp('.{6,}'));

    const [formError, setFormError]               = useState('');


    /***
     * Username
     */
    useEffect(()=>{
        if(didMountUsernameRef.current){
            if(username ===''){
                setUsernameError('Campo obligatorio')
                setUsernameValid(Red)

            }else if(!usernameValidator.test(username)){
                setUsernameError('Solo letras y números')
                setUsernameValid(Red)
            }else{
                axios.get(`https://api.jobot.es/auth/user/${username}`)
                .then(response => {
                    if(response.data.exists){
                        setUsernameError('Nombre de Usuario no disponible')
                        setUsernameValid(Red)
                    }else {
                        setUsernameError('')
                        setUsernameValid(Green)
                    }
                });
            }
        }else {
            didMountUsernameRef.current = true;
        }
    }, [username, usernameValidator])


    /**
     * EMAIL
     */
    useEffect(()=>{
        if(didMountEmailRef.current){
            if(email ===''){
                setEmailError('Campo obligatorio')
                setEmailValid(Red)
            }else if(!emailValidator.test(email)){
                setEmailError('Email no válido')
                setEmailValid(Red)
            } else {
                axios.get(`https://api.jobot.es/auth/user/${email}`)
                    .then(response => {
                        if(response.data.exists){
                            setEmailError('Email ya en uso')
                            setEmailValid(Red)
                        }else {
                            setEmailError('')
                            setEmailValid(Green)
                        }
                    });
            }
        }else {
            didMountEmailRef.current = true;
        }
    },[email, emailValidator]);

    /***
     * PASSWORD
     */
    useEffect(()=>{
        if(didMountPasswordRef.current){
            if(password ===''){
                setPasswordError('Campo obligatorio')
                setPasswordValid(Red)
            }else if(!passwordValidator.test(password)){
                const remaining = 6-password.length
                if(remaining !==1){
                    setPasswordError(`Faltan ${remaining} caracteres`)
                }else {
                    setPasswordError(`Falta ${6-password.length} caracter`)
                }

                setPasswordValid(Red)
            }else {
                setPasswordError('')
                setPasswordValid(Green)
            }
        }else {
            didMountPasswordRef.current = true;
        }
    }, [password, passwordValidator])

    const handleSubmit = event => {
        event.preventDefault();
        if(isValid()){
            setFormError('');
            axios.post('https://api.jobot.es/auth/register',
                {
                    username: username,
                    email: email,
                    password: password
                }
            ).then(response => {
                    setCookie('current_user', response.data.user, 1)
                    props.history.push('/');
            }, error => {
                    console.log(error)
            });
        }else{
            setFormError('Revisa antes de enviar!')
        }
    }


    const isValid = ()=>{
        return usernameValid === Green &&
               emailValid    === Green &&
               passwordValid === Green;
    }


    return(
        <div>
            <form className="register-form" onSubmit={handleSubmit}>
                <br/>
                <div className="register-form-input">
                    <label>Usuario</label>
                    <div>
                        <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
                        <img src={usernameValid} alt="" width="25"/>
                    </div>
                    <div className="form-error">{usernameError}</div>
                </div>

                <div className="register-form-input">
                    <label>Email</label>
                    <div>
                        <input type="text" value={email} onChange={event => setEmail(event.target.value)}/>
                        <img src={emailValid} alt="" width="25"/>
                    </div>
                    <div className="form-error">{emailError}</div>
                </div>


                <div className="register-form-input">
                    <label>Contraseña</label>
                    <div>
                        <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                        <img src={passwordValid} alt="" width="25"/>
                    </div>
                    <div className="form-error">{passwordError}</div>
                </div>
                <div className="form-error">{formError}</div>
                <button type="submit">Registrarse</button>
                <div>¿Ya tienes cuenta?</div>
                <button type="submit" onClick={()=>props.history.push('/login')}>Iniciar sesión</button>
            </form>
        </div>
    )
}

export default Register;