import { fb } from '../service/firebase';
import { Formik, Form } from 'formik';
import FormField from './FormField';
import * as Yup from 'yup';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
    const history = useHistory();
    const [serverError, setServerError] = useState('');

    const initialValues = {
        email: '',
        password: '',
        userName: '',
        verifyPassword: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
        verifyPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
        userName: Yup.string().required('Required').matches(/^\S*$/, 'Username must contain no spaces').min(3, 'Username must be at least 3 characters'),
    });

    // Create a new user on Firebase as well as on Chat Engine
    // Utilizing the uid from Firebase as the password on Chat Engine
    const signup = ({ email, userName, password }, { setSubmitting }) => {
        fb.auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                if (res?.user?.uid) {
                    fetch('/api/newUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userName,
                            userId: res.user.uid,
                        }),
                    }).then(() => {
                        fb.firestore
                            .collection('chatUsers')
                            .doc(res.user.uid)
                            .set({ userName, avatar: '' });
                    });
                } else {
                    setServerError("We ran into an error while signing you up. Please try again!",);
                }
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    setServerError('An account with this email already exists');
                } else {
                    setServerError("We ran into an error while signing you up. Please try again!",);
                }
            })
            .finally(() => setSubmitting(false));
    };

    return(
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Sign Up</h1>
                <Formik
                    onSubmit={signup}
                    validateOnMount={true}
                    initialValues={{initialValues}}
                    validationSchema={validationSchema}
                >
                    {({ isValid, isSubmitting }) => (
                        <Form>
                            <FormField name='userName' label='Username' />
                            <FormField name='email' label="Email" type="email" />
                            <FormField name='password' label='Password' type='password' />
                            <FormField type='password' name='verifyPassword' label='Verify Password' />

                            <div className="auth-link-container">
                                Already have an account?{' '}
                                <span className="auth-link" onClick={() => history.push('login')}>
                                    Log In!
                                </span>
                            </div>

                            <div align='center'>
                                <button disabled={ isSubmitting || !isValid } type='submit' className='button'>
                                    <span>Join Chatter!</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                {!!serverError && <div className="error">{serverError}</div>}
            </div>
        </div>
    );
}

export default SignUpForm;