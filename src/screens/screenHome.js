import { View, Text, TouchableOpacity, ScrollView, Image, Systrace } from "react-native";
import image from '../assets/medicate.png'
import {db} from '../../database/firebase'
import { onSnapshot,collection } from "firebase/firestore";
import React,{useEffect,useState } from "react";
import {ListItem} from "react-native-elements";

const screenHome = ({ navigation }) => {
    const [recordatorios,setRecordatorio] =  useState([])
    useEffect(() => {
        onSnapshot(collection(db,"Recordatorios"),(snapshot) => {
            setRecordatorio(snapshot.docs.map((doc) => ({...doc.data(),id:doc.id})))
        } )
    },[])
    console.log(recordatorios);
    return (
        <ScrollView style={{ backgroundColor: '#001B48' }}>
            <View style={{
                fontSize: 30,
                alignItems: "center",
                marginTop: "20%"
            }}>
                <Text style={{ fontSize: 50, color: 'white' }}>
                    MEDICATE
                </Text>
                <Image source={image}
                    style={{ height: 120, width: 120, borderRadius: 70 }}
                />
                <Text style={{ textAlign: 'center', margin: 20, color: 'white' }}>
                    Aplicacion para el recordatorio de medicamentos
                    para nuestros adultos mayores porque merecen ser ayudados
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Registro de Medicamento")}
                    style={{
                        backgroundColor: "#0093B7",
                        width: 150,
                        height: 70,
                        borderRadius: 5,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            color: "white",
                            width: 150
                        }}
                    >Añadir recordatorio</Text>
                </TouchableOpacity>
            </View>
         {recordatorios.map((recordatorio)=>{
             return (
                 <ListItem
                 key={recordatorio.id}
                 bottomDivider
                 >
                 <ListItem.Content>
                     <ListItem.Title>{recordatorio.nombreMed}</ListItem.Title>
                     <TouchableOpacity
                    onPress={() => navigation.navigate("Registro de Medicamento")}
                    style={{
                        backgroundColor: "#0093B7",
                        
                        justifyContent: "right",
                    }}
                >
                    <Text> EDIT</Text>
                </TouchableOpacity>
                 </ListItem.Content>
                 </ListItem>
             )
         } )}   
        </ScrollView>
    );
}

export default screenHome;
