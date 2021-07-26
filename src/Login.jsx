import './Login.css'
import {Button, ButtonBase} from '@material-ui/core'
import imgLogo from './assets/Logo-192.png'
import imgBackground from './assets/brick.png'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'


function Login() {

    const [{}, dispatch] = useStateValue()
    
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message))
        }
    

    return (
        <div className="login">
            <div className="loginContainer">
                <img src={imgLogo} 
                     alt=""
                />

                <div className="loginText">
                    <h1>Login to AldoChat</h1>
                </div>

                <Button onClick={signIn}>
                    Login with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
