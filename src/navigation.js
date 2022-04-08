import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DuracionTratamiento from './screens/DuracionTratamiento'
import FechaFinal from './screens/FechaFinal'


import HomeScreen from "./screens/screenHome";
import CantidadMedicamentos from "./screens/CantidadMedicamentos"
import PantallaRegistroMed from "./screens/PantallaRegistroMed";
const HomeStackNavigator = createNativeStackNavigator();

function MyStacks() {
    return (
        <HomeStackNavigator.Navigator initialRouteName='Medicate'>
            <HomeStackNavigator.Screen name="Medicate" component={HomeScreen}
                options={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: "#0093B7" }
                }} />
            <HomeStackNavigator.Screen name="Registro de Medicamento" component={PantallaRegistroMed}
                options={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: "#0093B7" }
                }} />
            <HomeStackNavigator.Screen name="Dosis del Medicamento" component={CantidadMedicamentos}
                options={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: "#0093B7" }
                }} />
            <HomeStackNavigator.Screen name="DuracionTratamiento" component={DuracionTratamiento}
                options={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: "#0093B7" }
                }} />
            <HomeStackNavigator.Screen name="FechaFinal" component={FechaFinal}
                options={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: "#0093B7" }
                }} />


        </HomeStackNavigator.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Medicate'
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarStyle: {
                    backgroundColor: '#0093B7',
                }
            }}
        >
            <Tab.Screen
                name="Medicate"
                component={MyStacks}
                options={{
                    tabBarLabel: 'inicio',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}