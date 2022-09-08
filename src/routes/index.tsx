import { NavigationContainer } from '@react-navigation/native';

import { UserRoutes, AuthRoutes } from './stack.routes'
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Loanding } from '../components/Loanding';
import * as ScreenOrientation from 'expo-screen-orientation';

export function Routes(){
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [isLoading, setIsLoanding] = useState(true);

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);


    useEffect(() => {
        const subscriber = auth()
            .onAuthStateChanged(response => {
            setUser(response);
            setIsLoanding(false);
        });

        return subscriber;
    }, []);

    if (isLoading) {
        return <Loanding />
    }

    return (
        <NavigationContainer>
         {user ? <UserRoutes/> : <AuthRoutes />}   
        </NavigationContainer>
    )
}