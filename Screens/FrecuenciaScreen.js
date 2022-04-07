import React,{useState} from 'react';
import { View,Text,StyleSheet,TouchableOpacity,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native'


export const FrecuenciaScreen = () => {
  const navigation = useNavigation();
  const [numeroFrecuencia, setnumeroFrecuencia] = useState([
    {title:"Una vez al dia",frecuencia:1,key:1},
    {title:"Dos veces al dia",frecuencia:1,key:2},
    {title:"Tres veces al dia",frecuencia:1,key:3},
    {title:"Cuatro veces al dia",frecuencia:1,key:4},
    {title:"Cinco veces al dia",frecuencia:1,key:5},
    {title:"Seis veces al dia",frecuencia:1,key:6},
  ]);

  return (
    <View style ={styles.contain}>
        <Text style={styles.texto}>Frecuencia dias de las dosis</Text>
          <FlatList data={numeroFrecuencia} renderItem={({ item }) => (
          <TouchableOpacity
              onPress={() => {navigation.navigate('Stack', item)}}
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
    paddingTop:120
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
  top:10,
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
