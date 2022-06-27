
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();
const stack = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { Categoria } from '../screens/Categoria';
import { Atividade } from '../screens/Atividade';
import { CriarAtividade } from '../screens/CriarAtividade';
import { CriarCurso } from '../screens/CriarCurso';
import { Execucao } from '../screens/Execucao';
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
            <stack.Screen name='Home' options={{ title: 'Tela inicial' }} component={Home} />
            <stack.Screen name='Categoria' options={{ title: 'Categorias' }} component={Categoria} />
            <stack.Screen name='Atividade' options={{ title: 'Atividades' }} component={Atividade} />
            <stack.Screen name='CriarAtividade' options={{ title: 'Criar Atividades' }} component={CriarAtividade} />
            <stack.Screen name='CriarCurso' options={{ title: 'Criar Cursos' }} component={CriarCurso} />
            <stack.Screen name='Execucao' options={{ title: 'Execução das Atividades' }} component={Execucao} />
        </stack.Navigator>
    )
}

