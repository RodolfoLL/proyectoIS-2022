import { StatusBar } from 'expo-status-bar';
//import { doc, setDoc } from 'firebase/firestore';
import { StyleSheet, Text, View, Button } from 'react-native';
//import {db} from './database/firebase'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DuracionTratamiento from './screens/DuracionTratamiento'
import FechaFinal from './screens/FechaFinal'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="DuracionTratamiento" component={DuracionTratamiento}/>
        <Stack.Screen name="FechaFinal" component={FechaFinal}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
