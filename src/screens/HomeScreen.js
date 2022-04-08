import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'

export const HomeScreen = (props) => {

  return (
    <View style={styles.container}>
        <Text style={styles.texto}>Home Screen</Text>
        <TouchableOpacity
            onPress={() => {props.navigation.navigate("DuracionTratamiento", {
                dosis: 2, 
                cantidadMed: 10,
                frecuencia: 2,
                hora:[new Date('December 17, 1995 08:00:00'), new Date('December 17, 1995 16:00:00')]
              });
            }}
            style={styles.button}
        >
          <Text style={{color:'white'}}>Añadir Recordatorio</Text>
        </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B48',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  texto:{
    fontSize:30,
    textAlign:"center",
    marginTop: 10,
    color: "#ffff"
  },
  button:{
    backgroundColor: "#0093B7",
    borderRadius: 2,
    marginBottom: 20,
    padding: 12,
		alignItems: 'center'
  }
})

export default HomeScreen