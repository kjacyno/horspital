import PropTypes from 'prop-types'
import {useState} from "react";
import {createNewUser} from "../firebase/usersData.js";
import {useForm} from "react-hook-form";

function SignUp({setUser, user}) {
    const [isActive, setIsActive] = useState(false);

    const {register, handleSubmit, getValues, watch, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            email: '',
            login: '',
        }
    });

    async function handleNewUser() {
        const email = getValues('email');
        const password = getValues('password');
        const login = getValues('login')
        try {
            await createNewUser(
                {
                    displayName: login
                },
                setUser, user, login, email, password
            );
            setIsActive(!isActive);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('This e-mail is already registered')
            }
        }

    }


    return (
        <section className="login-page">
            <div></div>
            <div className="login-box">
                <form onSubmit={handleSubmit(handleNewUser)}
                      className={isActive ? 'animated-box' : 'login-form'}>
                    <label htmlFor="login">SET UP YOUR ACCOUNT</label>
                    <input
                        type="text"
                        {...register('login', {
                            required: 'Tell us your name/nick',
                        })}
                        id='login'
                        name='login'
                        placeholder='Your name/nick'
                    />
                    <p className='error-message'>{errors.login?.message}</p>
                    <label htmlFor="email"></label>
                    <input type="email"
                           {...register('email', {
                               required: 'E-mail is not correct',
                               pattern: {
                                   value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                   message: 'E-mail is not correct'
                               }
                           })}
                           id="email"
                           placeholder='E-mail'
                           className={errors.email?.message ? 'error' : ''}
                    />
                    <p className='error-message'>{errors.email?.message}</p>

                    <label htmlFor="password"></label>
                    <input type="password"
                           {...register('password', {
                               required: 'Set up your password', minLength: {
                                   value: 6,
                                   message: 'Min. length = 6 characters'
                               }
                           })}
                           className={errors.password?.message ? 'error' : ''}
                           id='password'
                           placeholder='Password'
                    />
                    <p className='error-message'>{errors.password?.message}</p>

                    <label htmlFor="password"></label>
                    <input type="password"
                           {...register('confirm', {
                               required: 'Confirm password',
                               validate: (value) => value === watch("password") || "Password have to match"
                           })}
                           id='confirm'
                           placeholder='Confirm password'
                    />
                    <p className='error-message'>{errors.confirm?.message}</p>
                    <button type='submit'>Done</button>
                </form>
            </div>
            <div></div>
        </section>
    );
}

SignUp.propTypes = {
    setUser: PropTypes.func,
    user: PropTypes.any
}
export default SignUp;