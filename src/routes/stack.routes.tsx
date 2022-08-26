
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();
const stack = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { Activitie } from '../screens/Activitie';
import { Detail } from '../screens/Detail';
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
            <stack.Screen name='Activitie' options={{ title: 'Detalhes do curso' }} component={Activitie} />
            <stack.Screen name='Details' options={{ title: 'Suas Atividades' }} component={Detail} />
            <stack.Screen name='activityDetails' options={{ title: 'Suas Atividades' }} component={ActivityDetails} />

        </stack.Navigator>
    )
}

