import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/screenHome";
import Screen2 from "./screens/screen2";
import Screen3 from "./screens/screen3";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();
const Stackscreen = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />
            <Stack.Screen
                name="Screen2"
                component={Screen2}
            />
            <Stack.Screen
                name="Screen3"
                component={Screen3}
            />
        </Stack.Navigator>
    )
} 

function Tabs(){
    return(
        <Tab.Navigator
         screenOptions={{
             headerShown: false
         }}
        >
            <Tab.Screen
            name="HomeScreen" component={MyStack} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stackscreen.Navigator
            initialRouteName="Login"
        >
            <Stackscreen.Screen name = "Login" component = {Login} />
            <Stackscreen.Screen name = "HomeScreen" component = {Tabs} />
        </Stackscreen.Navigator>
    </NavigationContainer>
  );
}