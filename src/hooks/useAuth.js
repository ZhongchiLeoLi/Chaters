import { fb } from '../service';
import { useEffect, useState } from 'react';

// authUser is initialized as undefined
// After the hook is resolved, authUser is set to sn user object or null for not logged in

export const useAuth = () => {
    const [authUser, setAuthUser] = useState(); // undefined | firebase.User | null
  
    useEffect(() => {
        const unsubscribe = fb.auth.onAuthStateChanged(user => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return unsubscribe;
    }, []);
  
    return {
        authUser,
    };
  };