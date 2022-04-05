import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity} from 'react-native'

export const ButtonDate=()=>{
  return (
    <TouchableOpacity
        onPress={()=>alert('23/34/2022')}
    >
        <View style={styles.buttonDate}>
            <Text style={styles.texto}>Fecha</Text>
        </View>
    </TouchableOpacity>
  )
}
export const ButtonFecha=()=>{
  return(
    <TouchableOpacity
        onPress={()=>alert('07:20')}
    >
        <View style={styles.buttonTime}>
            <Text style={styles.texto}>Hora</Text>
        </View>
            
    </TouchableOpacity>

   )
}
export const ButtonCont=()=>{
    return(
      <TouchableOpacity
        onPress={()=>alert('desea continuar?')}
      >
          <View style={styles.buttonCont}>
              <Text style={styles.texto}>Continuar</Text>
          </View>
              
      </TouchableOpacity>
  
  )
}
export const ButtonCancel=()=>{
    return(
      <TouchableOpacity
        onPress={()=>alert('Se cerro')}
      >
          <View style={styles.buttonCancel}>
             <Text style={styles.texto}>Cancelar</Text>
          </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    buttonDate:{
        alignItems:'center',
        width: 200,
        height:32,
        backgroundColor: '#0093B7',
        borderRadius:25,
        bottom:10,
    },
    buttonTime:{
        backgroundColor: '#0093B7',
        width:200,
        height:32,
        borderRadius:25,
        marginVertical:10,
    },
    buttonCont:{
        backgroundColor:'#0093B7',
        borderRadius:25,
        width:150,
        height:35,
        marginVertical:20,
        top:5,
        padding:2
    },
    texto:{
        color:'white',
        fontFamily: "Roboto",
        fontSize:20,
        textAlign:'center'  
    },
    buttonCancel:{
        backgroundColor:'#0093B7',
        borderRadius:25,
        width:150,
        height:35,
    },
})