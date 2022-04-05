import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import { DateTimePicker } from '@react-native-community/datetimepicker'
const FechaFinal = (props) => {
    return(
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Text style={styles.title}>Establecer la fecha final</Text>
            </View>

            <View style={[styles.box, styles.box2]}>
               
            </View>

            <View style={[styles.box, styles.box3]}>
                <TouchableOpacity style={styles.boton}
                    onPress={() => alert('Alert with one button')}  >
                    <Text style={styles.textBoton}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.boton, styles.botonCancelar]}
                    onPress={() => {props.navigation.navigate('CrearRecordatorio1')}}  >
                    <Text style={styles.textBoton}>Cancelar</Text>
                </TouchableOpacity>
            </View>
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
      //header
      box1: {
          flex: 1,
          //backgroundColor: '#2196F3',
          paddingTop: 50,
      },
      //content
      box2: {
          flex: 6,
          //backgroundColor: '#FA250B'
  
      },
      //footer
      box3: {
          flex: 4,
          //backgroundColor: '#e3aa1a'
      },
      title:{
          fontSize: 23,
          color: '#fff'
      },
      boton:{
          backgroundColor: "#0093B7",
          borderRadius: 2,
          marginBottom: 20,
          padding: 12,
          alignItems: 'center'
      },
      textBoton:{
          fontSize: 20,
          color: "#fff"
      },
      botonCancelar:{
          width: 225
      }
});

export default FechaFinal