import { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Chat from './components/Chat';
import { useAuth, useResolved } from './hooks';
import { ChatProvider } from './context';
import PulseLoader from 'react-spinners/PulseLoader';
import './App.css';

const App = () => {
    const { authUser } = useAuth();
    const authResolved = useResolved(authUser);
    const history = useHistory();

    useEffect(() => {
        // Redirect to login page if no user is logged in
        if (authResolved) {
            history.push(!!authUser ? '/' : '/login');
        }
    }, [authUser, authResolved, history]);

    return (
        authResolved 
        ? <ChatProvider authUser={authUser}>
            <Switch>
                <Route exact path='/' component={Chat} />
                <Route path='/signup' component={SignUpForm} />
                <Route path='/login' component={LoginForm} />
            </Switch>
        </ChatProvider> 
        : <div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PulseLoader color='#00A389' loading={true} css='' size={30} />
        </div>
    );
}

export default App;