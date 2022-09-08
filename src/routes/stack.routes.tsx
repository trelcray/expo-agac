
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();
const stack = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { CurseDetails } from '../screens/CurseDetails';
import { Activity } from '../screens/Activity';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { ActivityDetails } from '../screens/ActivityDetails';

export function AuthRoutes() {
    return (
        <Navigator>
            <Screen name='Login' options={{ headerShown: false }} component={Login} />
            <Screen name='Register' options={{ headerShown: false }} component={Register} />
        </Navigator>
    )
}

export function UserRoutes() {
    return (
        <stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#323238',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>

            <stack.Screen name='Home' options={{ title: 'Seus Cursos' }} component={Home} />            
            <stack.Screen name='CurseDetails' options={{ title: 'Detalhes do curso' }} component={CurseDetails} />
            <stack.Screen name='Activity' options={{ title: 'Suas Atividades' }} component={Activity} />
            <stack.Screen name='activityDetails' options={{ title: 'Detalhes Atividades' }} component={ActivityDetails} />

        </stack.Navigator>
    )
}

