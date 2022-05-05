import React,{useState} from 'react';
import { View,Text,StyleSheet,TouchableOpacity,FlatList} from 'react-native';



const FrecuenciaScreen = (props) => {
  
  const { uid,nombreMed,tipoAdm,dose,quantity,editar } = props.route.params;
    
  const [numeroFrecuencia, setnumeroFrecuencia] = useState([
    {title:"Una vez al dia",frecuencia:1,key:1},
    {title:"Dos veces al dia",frecuencia:2,key:2},
    {title:"Tres veces al dia",frecuencia:3,key:3},
    {title:"Cuatro veces al dia",frecuencia:4,key:4},
    {title:"Cinco veces al dia",frecuencia:5,key:5},
    {title:"Seis veces al dia",frecuencia:6,key:6},
  ]);
  // setnumeroFrecuencia([...numeroFrecuencia,dosis,cantidadMed,hora])
  
  
  const guardarFrecuencia = (item)=>{
if (editar){
   var datosRecordatorio = { 
      uid: uid,
      id: props.route.params.id,
      nombreMed: nombreMed, 
      tipoAdm: tipoAdm,
      dose: dose,
      quantity:quantity,
      item: item,
      hora: props.route.params.hora,
      duracion: props.route.params.duracion,
      editar:true
    }
  }
  else{
    var datosRecordatorio = { 
      uid:uid,
      nombreMed: nombreMed, 
      tipoAdm: tipoAdm,
      dose: dose,
      quantity:quantity,
      item: item  
    }}
    props.navigation.navigate('Establecer horas',datosRecordatorio)
  }

  return (
    <View style ={styles.contain}>
        <Text style={styles.texto}>{"¿Con que frecuencia toma el\n"+"medicamento"}</Text>
          <FlatList data={numeroFrecuencia} renderItem={({ item }) => (
          <TouchableOpacity
              onPress={() => guardarFrecuencia(item.frecuencia)}
          >
            <View style={styles.button}>
              <Text style={styles.texto}>{ item.title }</Text>
            </View>
        </TouchableOpacity>
      )} />
    </View>
  )
}
export default FrecuenciaScreen

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#001B48',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:30
  },
  texto:{
    color:'white',
    fontFamily:'sans-serif',
    fontSize:20,
    textAlign:'center'  
},
  button:{
    backgroundColor:'#0093B7',
    borderRadius:25,
    width:200,
    height:32,
    marginVertical:20,
    padding:2
},

})


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#001B48',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   texto:{
//     color:'white',
//     fontFamily:'sans-serif',
//     fontSize:20,
//     textAlign:'center'  
//   },
//   buttonDate:{
//     alignItems:'center',
//     width: 200,
//     height:32,
//     backgroundColor: '#0093B7',
//     borderRadius:25,
//     bottom:10,
// },
// });
