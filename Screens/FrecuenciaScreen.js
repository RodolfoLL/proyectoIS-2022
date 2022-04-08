import React,{useState} from 'react';
import { View,Text,StyleSheet,TouchableOpacity,FlatList} from 'react-native';
// import {db} from './database/firebase';
// import { doc, setDoc } from 'firebase/firestore';


export const FrecuenciaScreen = (props) => {
  const{dosis,cantidadMed,hora} = props.route.params;
  const [numeroFrecuencia, setnumeroFrecuencia] = useState([
    {title:"Una vez al dia",frecuencia:1,key:1},
    {title:"Dos veces al dia",frecuencia:2,key:2},
    {title:"Tres veces al dia",frecuencia:3,key:3},
    {title:"Cuatro veces al dia",frecuencia:4,key:4},
    {title:"Cinco veces al dia",frecuencia:5,key:5},
    {title:"Seis veces al dia",frecuencia:6,key:6},
  ]);
  // setnumeroFrecuencia([...numeroFrecuencia,dosis,cantidadMed,hora])

  return (
    <View style ={styles.contain}>
        <Text style={styles.texto}>Frecuencia dias de las dosis</Text>
          <FlatList data={numeroFrecuencia} renderItem={({ item }) => (
          <TouchableOpacity
              onPress={() => {props.navigation.navigate('HoraScreen',props.route.params)}}
          >
            <View style={styles.button}>
              <Text style={styles.texto}>{ item.title }</Text>
            </View>
        </TouchableOpacity>
      )} />
    </View>
  )
}

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
