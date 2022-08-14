
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();
const stack = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { Atividade } from '../screens/Atividade';
import { Details } from '../screens/Details';
import { Relatorio } from '../screens/Relatorio';
import { Login } from '../screens/Login';
import { Registrar } from '../screens/Registrar';

export function AuthRoutes() {
    return (
        <Navigator>
            <Screen name='Login' options={{ headerShown: false }} component={Login} />
            <Screen name='Registrar' options={{ headerShown: false }} component={Registrar} />
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
            <stack.Screen name='Atividade' options={{ title: 'Suas Atividades' }} component={Atividade} />
            <stack.Screen name='Details' options={{ title: 'Detalhes das Atividades' }} component={Details} />
            <stack.Screen name='Relatorio' options={{ title: 'Relatório do Curso' }} component={Relatorio} />

        </stack.Navigator>
    )
}

