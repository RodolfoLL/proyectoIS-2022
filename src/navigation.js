import React from "react";
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ScrollView, Image,Button} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from "./screens/screenHome";
import Screen2 from "./screens/screen2";
import Screen3 from "./screens/screen3";
import Login from "./screens/Login";
import Screen4 from "./screens/Screen4";
import Screen5 from "./screens/Screen5";
import CustomDrawerContent from "./Componentes/customDrawer";


const Stack = createNativeStackNavigator();
const Stackscreen = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stacks = createNativeStackNavigator();


function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="Inicio"
            // screenOptions={{
            //     headerShown: false
            // }}
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
            <Stackscreen.Screen name = "Screen4" component = {Screen4} options={{}} />
            <Stackscreen.Screen name = "Screen5" component = {Screen5} />
        </Stack.Navigator>
    );
} 
function Nstacks(){
    return(
        <Stacks.Navigator >
            <Stackscreen.Screen name = "Screen4" component = {Screen4} options={{}} />
            <Stackscreen.Screen name = "Screen5" component = {Screen5} />
        </Stacks.Navigator>
    )
}
function Draws() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="HomeScreen" component={Tabs} options={{headerShown:false,swipeEnabled:false,drawerLabel:()=>null,title:undefined,drawerIcon:()=>null,drawerActiveBackgroundColor:'white',drawerStyle:'white'}}/>
            <Drawer.Screen name="Screen4" component={Nstacks} options ={{headerShown:false,swipeEnabled:false}}/>
            {/* <Drawer.Screen name="Screen5" component={Screen5} options={{headerShown:false}}/> */}

        </Drawer.Navigator>

    );
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
        <Stackscreen.Navigator>
            <Stackscreen.Screen name = "Login" component = {Login} />
            <Stackscreen.Screen name = "Drawer" component = {Draws} options={{headerShown:false}}/>
            <Stackscreen.Screen name = "Tabs" component = {Tabs} />
            {/* <Stackscreen.Screen name = "Screen4" component = {Screen4} />
            <Stackscreen.Screen name = "Screen5" component = {Screen5} /> */}
        </Stackscreen.Navigator>
    </NavigationContainer>
  );
}