import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute, NavigationContainer, TabRouter} from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 
import {Icon} from 'react-native-elements';
import RegistroMedEdit from "./screens/RegistroMedEdit"
import DuracionTratamiento from './screens/DuracionTratamiento'
import FechaFinal from './screens/FechaFinal'

import FrecuenciaScreen from '../src/screens/FrecuenciaScreen';
import HoraScreen from '../src/screens/HoraScreen';

import PantallaInicio from "./screens/PantallaInicio";
import CantidadMedicamentos from "./screens/CantidadMedicamentos"
import PantallaRegistroMed from "./screens/PantallaRegistroMed";
import DosisEdit from './screens/DosisEdit';
import Configuracion from './screens/Configaracion';
import ConfiguraciónNotificación from './screens/ConfiguracionNotificación'
import DatosUsuario from "./screens/EditarDatosUsusario"
import Login from './screens/Login';
import RegistroUsuario from './screens/Registrar-Usuario';
const HomeStackNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MyStacks() {
    
    return(
        
        <HomeStackNavigator.Navigator initialRouteName='Medicate'
            >
            <HomeStackNavigator.Screen name="Recordatorios" component={PantallaInicio}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>
             
            <HomeStackNavigator.Screen name="Registro de Medicamento" component={PantallaRegistroMed}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>

            <HomeStackNavigator.Screen name="Dosis del Medicamento" component={CantidadMedicamentos}
            options={{headerTintColor: 'white',headerStyle: { backgroundColor: "#0093B7" }}} />
            <HomeStackNavigator.Screen name="Frecuencia Dosis" component={FrecuenciaScreen}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>
            <HomeStackNavigator.Screen name="Establecer horas" component={HoraScreen}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>
            <HomeStackNavigator.Screen name="DuracionTratamiento" component={DuracionTratamiento}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>
            <HomeStackNavigator.Screen name="FechaFinal" component={FechaFinal}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>
           <HomeStackNavigator.Screen name="Editar Medicamento" component={RegistroMedEdit}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>
            <HomeStackNavigator.Screen name="Editar Dosis" component={DosisEdit}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>
            <HomeStackNavigator.Screen name="Configurar Notificacion" component={ConfiguraciónNotificación}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>
            <HomeStackNavigator.Screen name="Editar datos" component={DatosUsuario}
            options={{headerTintColor: 'white',
            headerStyle:{ backgroundColor: "#0093B7"}}}/>
        </HomeStackNavigator.Navigator>
    );
}



function MyTabs() {
    return(
        <Tab.Navigator
            initialRouteName="Recordatorios"
            screenOptions={{
                tabBarActiveTintColor:'white',
                tabBarInactiveTintColor: 'black',
                tabBarStyle:{
                    backgroundColor:'#0093B7',
                    display: 'flex',
                    tabBarLabel:'inicio',
                    tabBarIcon:({color,size})=>(
                    <Icon type="material-community" name={"home"} size={size} color={color} />
                ),

                }
            }}
        >
            <Tab.Screen 
                name="tabs" 
                component={MyStacks}
                options ={{tabBarLabel:'Inicio',tabBarIcon:({color,size})=>(
                    <Icon type="material-community" name={"home"} size={size} color={color} />
                ),
                headerShown:false,}}
            />
            <Tab.Screen 
                name="Cerrar" 
                component={Configuracion}
                options ={{tabBarLabel:'Cerrar',tabBarIcon:({color,size})=>(
                    <FontAwesome name="sign-out" size={size} color={color} />
                ),
                headerStyle:{ backgroundColor: "#0093B7" },}}
            /> 
                         
        </Tab.Navigator>
    );
}
export default function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen
                name="Login" component={Login}
                options={{headerTintColor: '#001B48',
                headerStyle:{ backgroundColor: "#001B48"},
            }}/>
            <Stack.Screen name="Registro Usuario" component={RegistroUsuario}
                options={{headerTintColor: 'white',
                headerStyle:{ backgroundColor: "#0093B7"}}}/>
            <Stack.Screen name="Medicate" component={MyTabs}
                options={{headerShown:false}}
            />
            
            </Stack.Navigator>
        </NavigationContainer>
    );
}