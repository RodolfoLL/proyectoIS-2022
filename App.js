import { StatusBar } from 'expo-status-bar';
import { doc, setDoc } from 'firebase/firestore';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import {db} from './database/firebase'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CrearRecordatorio1 from './screens/CrearRecordatorio1'
import FechaFinal from './screens/FechaFinal'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="CrearRecordatorio1" component={CrearRecordatorio1}/>
        <Stack.Screen name="FechaFinal" component={FechaFinal}/>
        
      </Stack.Navigator>
    </NavigationContainer>

    /*<View style={styles.container}>
      <Button title = 'create New' onPress={Create}></Button>
      <StatusBar style="auto" />
    </View>*/
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
