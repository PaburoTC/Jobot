import React, {useState, useEffect, useRef} from 'react';
import './Register.css';
import Green from './img/green.png'
import Red from './img/red.png'

const Register = () => {
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
                return
            }
            if(!usernameValidator.test(username)){
                setUsernameError('Solo letras y números')
                setUsernameValid(Red)
            }else if(false){

            }else{
                setUsernameError('')
                setUsernameValid(Green)
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
            if(!emailValidator.test(email)){
                setEmailError('Email no válido')
                setEmailValid(Red)
            }else if(false){

            } else {
                setEmailError('');
                setEmailValid(Green)
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
            if(!passwordValidator.test(password)){
                setPasswordError('Mínimo 6 caracteres')
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
            setFormError('')
            console.log(username, email, password)
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
            <form className="login-form" onSubmit={handleSubmit}>
                <br/>
                <div className="login-form-input">
                    <label>Usuario</label>
                    <div className="form-error">{usernameError}</div>
                    <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
                    <img src={usernameValid} alt="" width="25"/>
                </div>

                <div className="login-form-input">
                    <label>Email</label>
                    <div className="form-error">{emailError}</div>
                    <input type="text" value={email} onChange={event => setEmail(event.target.value)}/>
                    <img src={emailValid} alt="" width="25"/>
                </div>


                <div className="login-form-input">
                    <label>Contraseña</label>
                    <div className="form-error">{passwordError}</div>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                    <img src={passwordValid} alt="" width="25"/>
                </div>
                <div className="form-error">{formError}</div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}

export default Register;