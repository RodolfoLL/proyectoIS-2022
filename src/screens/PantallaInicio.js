import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity,SafeAreaView,Alert,FlatList} from "react-native";
import {db} from '../../database/firebase'
import { StatusBar } from 'expo-status-bar';
import { collection,doc, deleteDoc, onSnapshot} from "firebase/firestore";
import { ListItem ,Icon} from 'react-native-elements';




const PantallaInicio = ({ navigation  }) => {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity
            onPress={() => navigation.navigate("Registro de Medicamento")}
            style={{
                width: 100,
                height: 40,
                borderRadius: 50,
                backgroundColor:'#40AEC9',
                borderColor:'#000000' ,
                justifyContent: "center"
            }}
        >
            <Text
                style={{
                    fontSize: 25,
                    textAlign: "center",
                    color: "white",
                    marginBottom:0,
                    paddingBottom:0,
                    lineHeight:24
                }}
            >{'+'}</Text>
            <Text
                style={{
                    fontSize: 17,
                    textAlign: "center",
                    color: "white",
                    lineHeight:16
                }}
            >{'añadir'}</Text>
        </TouchableOpacity>)}
        
    );

    const [recordatorios, setRecordatorios] = useState([]);
    console.log(recordatorios)
    useEffect(
        () => 
            onSnapshot(collection(db,"Recordatorios"), (snapshot) =>
                setRecordatorios(snapshot.docs.map((doc) => ({...doc.data(),id: doc.id})))

            ),
            []
            );

    const elimnarRecordatorio = async (id) =>{
        console.log(id)
        const docRef = doc(db,"Recordatorios",id)
        console.log(docRef)
         deleteDoc(docRef)
        navigation.navigate("screenHome")
    }
    const confirmarElimniar = (id) => {
        Alert.alert("Eliminar recordatorio", "estas seguro?",[
       {text: "Si" ,onPress: () =>{ elimnarRecordatorio(id)} },
       {text: "No" ,onPress: () =>{ console.log("ok sin elimnar")} }
        ])

    }

    return (
      
        <SafeAreaView style={{ backgroundColor: '#001B48' }}>  
          
      
      
         
            <View style={{
                fontSize: 30,
                alignItems: "center",
                marginTop: "5%"
                
            }}>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold',marginBottom:"-6%",bottom:20 }}>
                    MEDICATE 
                </Text>
                                  
                
            </View>
            
       
        
        <FlatList
            data={recordatorios}
            keyExtractor =  {(item) => item.id}
            renderItem = { ({item,index}) => 
            
            <View style={{width: "80%", height: "20%",alignContent:"center",marginLeft:"10%",position:'relative',flex:1,marginBottom:-40}}>
            <ListItem key={item.id} style={{marginBottom:"15%"}}>
                            
            <ListItem.Content bottomDivider style={{width: "100%", height:120}}>
             
            <ListItem.Title style={{ color: "black", fontSize: 25, fontWeight: "bold"}}>{item.nombreMed}</ListItem.Title>  
            <ListItem.Subtitle style={{ color: "black"}}>Tipo de administracion: {item.tipoAdm}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ color: "black"}}>Dosis: {item.dose}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ color: "black"}}>Cantidad de medicamentos: {item.quantity}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ color: "black"}}>Hora: {item.hora.toString()}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ color: "black"}}>Duracion hasta: {item.duracion}</ListItem.Subtitle>

              
            </ListItem.Content>

           
            
            <View style={{ flexDirection: "column", height: "100%"}}>
                <Icon type="material-community" 
                    name={"pencil-circle"} size={50} 
                    color={"#0093B7"} 
                    onPress={() => navigation.navigate("Editar Medicamento",{
                        id: item.id,
                        nombreMed:item.nombreMed,
                        tipoAdm: item.tipoAdm,
                        dose: item.dose,
                        quantity: item.quantity,
                        item: item.item,
                        hora: item.hora,
                        duracion: item.duracion,

                    })}

                    style={{ marginTop: "0%"}}/>
                <Icon type="material-community" 
                    name={"delete-circle"} 
                    size={50} color={"#0093B7"} 
                    onPress={() => confirmarElimniar(item.id)} 
                    style={{ marginTop: "80%"}}/>
            </View>
          </ListItem>
          </View>
          }
                    
        />
       
       {/* <TouchableOpacity
                    onPress={() => navigation.navigate("Registro de Medicamento")}
                    style={{
                        backgroundColor: "#001B48",
                        width: 80,
                        height: 40,
                        borderRadius: 1000,
                        justifyContent: "center",
                        marginTop: "15%",
                        position: 'absolute',
                        bottom: 0,
                        left:'72%',
                        top:420
                    }}
                >
                    <Text
                        style={{
                            fontSize: 40,
                            textAlign: "center",
                            color: "white",
                            width: 80,
                            fontWeight: "bold"
                        }}
                    >+</Text>
                </TouchableOpacity> */}
                
                <StatusBar style="auto" />
         
                       
    </SafeAreaView>
   
    );
                                    
};


export default PantallaInicio;