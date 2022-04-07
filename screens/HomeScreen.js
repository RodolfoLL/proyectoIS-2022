import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'

export const HomeScreen = (props) => {

  return (
    <View>
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
    texto:{
        fontSize:30,
        textAlign:"center",
        marginTop:"20%"
    },
    button:{
      backgroundColor:'purple',
      padding:10,
      marginTop:"20%",
      width:"50%",
      alignSelf:"center",
      borderRadius:10
    }

})

export default HomeScreen