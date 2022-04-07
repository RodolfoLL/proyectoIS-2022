import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/screenHome";
import Screen2 from "./screens/screen2";
import Screen3 from "./screens/screen3";

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
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

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}