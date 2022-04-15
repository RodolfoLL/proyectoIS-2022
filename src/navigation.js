import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import RegistroMedEdit from "./screens/RegistroMedEdit"
import DuracionTratamiento from './screens/DuracionTratamiento'
import FechaFinal from './screens/FechaFinal'

import FrecuenciaScreen from '../src/screens/FrecuenciaScreen';
import HoraScreen from '../src/screens/HoraScreen';

import pantallaInicio from "./screens/PantallaInicio";
import CantidadMedicamentos from "./screens/CantidadMedicamentos"
import PantallaRegistroMed from "./screens/PantallaRegistroMed";
import DosisEdit from './screens/DosisEdit';
const HomeStackNavigator = createNativeStackNavigator();

function MyStacks(){
    return(
        <HomeStackNavigator.Navigator initialRouteName='Medicate'>
            <HomeStackNavigator.Screen name="Recordatorio De Medicamentos" component={pantallaInicio}
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
            <HomeStackNavigator.Screen name="HoraScreen" component={HoraScreen}
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
        
        </HomeStackNavigator.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator
            initialRouteName='Medicate'
            screenOptions={{
                tabBarActiveTintColor:'black',
                tabBarStyle:{
                    backgroundColor:'#0093B7',
                }
            }}
        >
            <Tab.Screen 
                name="Medicate" 
                component={MyStacks}
                options={{
                    tabBarLabel:'inicio',
                    tabBarIcon:({color,size})=>(
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                    headerShown:false,
                }}
            />
        </Tab.Navigator>
    );
}
export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}