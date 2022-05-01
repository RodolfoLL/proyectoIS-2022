import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView,Alert,FlatList,Button} from "react-native";
import image from '../assets/medicate.png'
import {db} from '../../database/firebase'
import { StatusBar } from 'expo-status-bar';
import { collection, query, where, getDocs ,doc, deleteDoc, onSnapshot} from "firebase/firestore";
import { render } from "react-dom";
import { ListItem ,Icon} from 'react-native-elements';
import { Usuario } from "./Login";
const PantallaInicio = ({navigation}) => {
    const {uid} = Usuario;
    console.log(uid);
    navigation.setOptions({ 
    headerRight: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Registro de Medicamento",{uid:uid})}
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
    useEffect( () => 
        onSnapshot(collection(db,uid), (snapshot) =>
            setRecordatorios(snapshot.docs.map((doc) => ({...doc.data(),id: doc.id})))
        ),[]
    );

    const elimnarRecordatorio = async (id) =>{
        console.log(id)
        const docRef = doc(db,uid,id)
        console.log(docRef)
         deleteDoc(docRef)
        navigation.navigate("Recordatorios",{uid: uid})
    }
    const confirmarElimniar = (id) => {
        Alert.alert("Eliminar recordatorio", "estas seguro?",[
       {text: "Si" ,onPress: () =>{ elimnarRecordatorio(id)} },
       {text: "No" ,onPress: () =>{ console.log("ok sin elimnar")} }
        ])
    }
    const ordenar = () =>{
        let newList = [...recordatorios];
            newList.sort((a,b) => {
            if(a.nombreMed > b.nombreMed){
                return 1;
            }else{
                if(b.nombreMed > a.nombreMed){
                    return -1;
                }else{
                    return 0;
                }
            }
            });
        setRecordatorios(newList);
    }
    return (
      
        <SafeAreaView style={{ backgroundColor: '#001B48', height: "100%"}}>  
            <View style={{
                fontSize: 30,
                alignItems: "center",
                marginTop: "5%"
                
                }}>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold' }}>
                    MEDICATE 
                </Text>
                <View style={{bottom:5}}>
                
                <Button
                
                title="ORDENAR"
                color= "#0093B7"
              
                onPress={() => ordenar()} />
        
                 </View>  
            </View>
            
        <FlatList
            data={recordatorios}
            keyExtractor =  {(item) => item.id}
            renderItem = { ({item,index}) => 
            
            <View style={{width: "90%", marginHorizontal: "5%", marginBottom: "5%"}}>
                <ListItem key={item.id}>
                            
                    <ListItem.Content style={{width: "100%", height:125}}>
             
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
                                uid: uid,
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
        <StatusBar style="auto" />    
    </SafeAreaView>
   
    );
                                    
};


export default PantallaInicio;

