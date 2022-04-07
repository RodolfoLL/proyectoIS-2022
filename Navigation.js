import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

import {FrecuenciaScreen}from './Screens/FrecuenciaScreen';
import {HoraScreen} from './Screens/HoraScreen';

const HomeStackNavigator = createNativeStackNavigator();

function MyStacks(){
    return(
        <HomeStackNavigator.Navigator
            initialRouteName='Medicate'
            
        >
        <HomeStackNavigator.Screen 
            name="home"
            component={FrecuenciaScreen}
            options={{
                headerShown:false,
            }}
        />
        <HomeStackNavigator.Screen
            name="Stack"
            component={HoraScreen}

        />
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
            
            {/* <Tab.Screen
                name="ayuda" 
                component={SettingsScreen}
                options={{
                    tabBarLabel:'inicio',
                    tabBarIcon:({color,size})=>(
                        <Ionicons name="help-circle-outline" size={24} color="black" />
                    ),
                    headerShown:false,
                }}
            /> */}
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
