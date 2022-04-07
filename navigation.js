import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
//Pantallas que utilize de ejemplo para la navegacion
import DuracionTratamiento from './screens/DuracionTratamiento'
import FechaFinal from './screens/FechaFinal'
import HomeScreen from './screens/HomeScreen'

const HomeStackNavigator = createNativeStackNavigator();

function MyStacks(){
    return(
        <HomeStackNavigator.Navigator initialRouteName='Medicate'>
            <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen}/>
            <HomeStackNavigator.Screen name="DuracionTratamiento" component={DuracionTratamiento}/>
            <HomeStackNavigator.Screen name="FechaFinal" component={FechaFinal}/>
            
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