import { fb } from '../service/firebase';
import { Formik, Form } from 'formik';
import FormField from './FormField';
import * as Yup from 'yup';
import { useState } from "react";
import { useHistory } from "react-router-dom";
// import axios from 'axios';

const LoginForm = () => {
    const history = useHistory();
    const [serverError, setServerError] = useState('');
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState('');

    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    });

    const login = ({ email, password }, { setSubmitting }) => {
        fb.auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                if (!userCredential.user) {
                    setServerError('We ran into an error while logging you in. Please try again!');
                }
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    setServerError('The email or the password is incorrect');
                  } else if (error.code === 'auth/user-not-found') {
                    setServerError('No account has been registered with this email');
                  } else {
                    setServerError('Oops, something went wrong.');
                  }
                })
            .finally(() => setSubmitting(false));
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const authObject = { 'Project-ID': 'df2a398d-a6b6-41ce-b4fe-915701fa969d', 'User-Name': username, 'User-Secret': password };
    //     try {
    //         await axios.get('https://api.chatengine.io/chats', {headers: authObject});
    //         localStorage.setItem('username', username);
    //         localStorage.setItem('password', password);
    //         window.location.reload();
    //     } catch (error) {
    //         setError('Oops, the Username or Password is incorrect')
    //     }
    // }

    return(
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Login</h1>
                <Formik
                    onSubmit={login}
                    validateOnMount={true}
                    initialValues={{initialValues}}
                    validationSchema={validationSchema}
                >
                    {({ isValid, isSubmitting }) => (
                        <Form>
                            <FormField name='email' label="Email" type="email" />
                            <FormField name='password' label='Password' type='password' />

                            <div className="auth-link-container">
                                Don't have an account yet?{' '}
                                <span className="auth-link" onClick={() => history.push('signup')}>
                                    Sign Up!
                                </span>
                            </div>

                            <div align='center'>
                                <button disabled={ isSubmitting || !isValid } type='submit' className='button'>
                                    <span>Start Chatting</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                {!!serverError && <div className="error">{serverError}</div>}

                {/* <form onSubmit={handleSubmit}>
                    <input className='input' type="text" placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)} required />
                    <input className='input' type="password" placeholder='Password  ' value={password} onChange={(event) => setPassword(event.target.value)} required />
                    <div align='center'>
                        <button type='submit' className='button'>
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className='error'>{error}</h2>
                </form> */}
            </div>
        </div>
    );

}

export default LoginForm;