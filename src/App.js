import { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import ChatList from './components/ChatList';
import ChatFeed from './components/ChatFeed';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Chat from './components/Chat';
import { useAuth, useResolved } from './hooks';
import { ChatProvider } from './context';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from "@emotion/core";

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

    // if(!localStorage.getItem('username')) return <LoginForm />

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

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
            <PulseLoader color='#A1E5AB' loading={true} css='' size={30} />
        </div>

        // <ChatEngine
        //     hideUI={true}
        //     height='100vh'
        //     projectID='df2a398d-a6b6-41ce-b4fe-915701fa969d'
        //     userName={localStorage.getItem('username')}
        //     userSecret={localStorage.getItem('password')}
        //     renderChatList={(chatAppProps) => <ChatList {...chatAppProps}/>}
        //     renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
        // />
    );
}

export default App;