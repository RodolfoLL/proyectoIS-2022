import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import QuantityOfMedicationsScreen from "./src/Components/quantityOfMedications";



const Stack = createNativeStackNavigator() // contien nuestra navegación
function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Dosis Del Medicamento" component={QuantityOfMedicationsScreen} options={{headerTintColor: 'white',
                                                                                                  headerStyle:{ backgroundColor: "#0093B7"}}}/>
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
