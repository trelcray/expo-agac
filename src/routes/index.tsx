import { NavigationContainer } from '@react-navigation/native';

import { UserRoutes, AuthRoutes } from './stack.routes'
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function Routes(){
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(setUser);

        return subscriber;
    }, []);

    return (
        <NavigationContainer>
         {user ? <UserRoutes/> : <AuthRoutes />}   
        </NavigationContainer>
    )
}