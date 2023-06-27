import {signIn} from "../firebase/usersData.js";
import {useState} from "react";
import {useForm} from "react-hook-form";
import PropTypes from "prop-types";

function Login({setUser}) {

    const [isActive, setIsActive] = useState(false)
    const {register, handleSubmit, getValues, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    async function handleUserLogin() {
        const email = getValues('email');
        const password = getValues('password')
        try{
            await signIn(email, password, setUser);
            setIsActive(!isActive);
        }
        catch (error){
            if (error.code === 'auth/wrong-password') {
                alert('Password is incorrect')
            } else if (error.code === 'auth/too-many-requests') {
                alert('Too many attempts, try again later')
            } else if (error.code === 'auth/invalid-email'){
                alert('The e-mail is not recognized')
            } else if (error.code === 'auth/user-not-found'){
                alert('User not found')
            }
        }
    }

    return (
        <section className="login-page">
            <div></div>
            <div className="login-box">
                <form
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
                           placeholder='Password'
                           className={errors.password?.message ? 'error' : ''}
                    />
                    <p className='error-message'>{errors.password?.message}</p>
                    <button type='submit'
                            >
                        OK
                    </button>
                </form>
            </div>
            <div></div>
        </section>
    );
}

Login.propTypes = {
    setUser: PropTypes.func,
}
export default Login;