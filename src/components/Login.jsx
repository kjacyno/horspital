import PropTypes from "prop-types";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {resetPassword, signIn} from "../firebase/usersData.js";

function Login({setUser}) {

    const [isActive, setIsActive] = useState(false)
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('')
    const {register, handleSubmit, getValues, formState: {errors}, setValue} = useForm();

    const email = getValues('email');
    const password = getValues('password')

    async function handleUserLogin() {
        try {
            await signIn(email, password, setUser);
            setIsActive(!isActive);
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                alert('Password is incorrect')
            } else if (error.code === 'auth/too-many-requests') {
                alert('Too many attempts, try again later')
            } else if (error.code === 'auth/invalid-email') {
                alert('The e-mail is not recognized')
            } else if (error.code === 'auth/user-not-found') {
                alert('User not found')
            }
        }
    }

    const handleResetPassword = async () => {
        try {
            await resetPassword(registerEmail);
        } catch (error) {
            if (error.code === 'auth/missing-email') {
                alert('Please provide your e-mail');
            } else if (error.code === 'auth/user-not-found') {
                alert('User not found')
            } else if (error.code === 'auth/invalid-email') {
                alert('The e-mail is not recognized')
            }
        }}
        ;

        return (
            <section className="login-page">
                <div></div>
                <div className="login-box">
                    <form id='login-form'
                          onSubmit={handleSubmit(handleUserLogin)}
                          className={isActive ? 'animated-box' : 'login-form'}>
                        <label htmlFor="email">LOG IN</label>
                        <input type="email"
                               {...register('email', {
                                   required: 'The e-mail is incorrect',
                                   pattern: {
                                       value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                       message: 'The e-mail is incorrect'
                                   }
                               })}
                               onChange={(e) => {setRegisterEmail(e.target.value); setValue('email', e.target.value)}}
                               value={registerEmail}
                               id='email'
                               placeholder='E-mail'
                               className={errors.email?.message ? 'error' : ''}
                        />
                        <p className='error-message'>{errors.email?.message}</p>
                        <label htmlFor="pwd"></label>
                        <input type="password"
                               {...register('password', {
                                   required: 'Enter your password', minLength: {
                                       value: 6,
                                       message: 'Min. length = 6 characters'
                                   }
                               })}
                               id='pwd'
                               value={registerPassword}
                               placeholder='Password'
                               onChange={(e) => {setRegisterPassword(e.target.value); setValue('password', e.target.value)}}
                               className={errors.password?.message ? 'error' : ''}
                        />
                        <p className='error-message'>{errors.password?.message}</p>
                        <button className='btn' type='submit'
                        >
                            OK
                        </button>
                    </form>
                    <button className='btn pass-btn' onClick={handleResetPassword}>Reset password</button>

                </div>
                <div></div>
            </section>
        );
    }

    Login.propTypes = {
        setUser: PropTypes.func,
    }
    export default Login;