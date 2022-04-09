import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import image from '../../assets/medicate.png'
import {db} from '../../database/firebase'

import { collection, query, where, getDocs } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { render } from "react-dom";
import { ListItem, Avatar } from 'react-native-elements'

const screenHome = ({ navigation }) => {

    
    const [recordatorios, setRecordatorios] = useState([]);

    async function listarRecordatorio(){
        const listaRecordatorios = [];
        const q = query(collection(db, "Recordatorios"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const { nombreMed,tipoAdm,dose,quantity,item,hora, duracion } = doc.data()
            listaRecordatorios.push({
                id: doc.id,
                nombreMed,
                tipoAdm,
                dose,
                quantity,
                item,
                hora,
                duracion
            });
        });

        setRecordatorios(listaRecordatorios);
    }
    console.log(recordatorios)
    useEffect(() => {
            listarRecordatorio()
    }, []);

    return (
        <ScrollView style={{ backgroundColor: '#001B48' }}>
            <View style={{
                fontSize: 30,
                alignItems: "center",
                marginTop: "10%"
            }}>
                <Text style={{ fontSize: 50, color: 'white' }}>
                    MEDICATE
                </Text>
                <View style={{width: "90%", height: "40%"}}>
                    {recordatorios.map((recordatorio) => {
                        return (
                          <ListItem key={recordatorio.id} bottomDivider>
                            <ListItem.Content bottomDivider style={{ backgroundColor: "#001B48",width: "100%", height: "100%"}}>
                              <ListItem.Title style={{ color: "white"}}>{recordatorio.nombreMed}</ListItem.Title>

                              <ListItem.Subtitle style={{ color: "white"}}>Tipo de administracion: {recordatorio.tipoAdm}</ListItem.Subtitle>
                              
                              <ListItem.Subtitle style={{ color: "white"}}>Hora: {recordatorio.hora}</ListItem.Subtitle>
                              <ListItem.Subtitle style={{ color: "white"}}>Duracion hasta: {recordatorio.duracion}</ListItem.Subtitle>
                              <TouchableOpacity
                    onPress={() => navigation.navigate("Editar Medicamento",{
                        id: recordatorio.id,
                        nombreMed:recordatorio.nombreMed,
                        tipoAdm: recordatorio.tipoAdm,
                        dose: recordatorio.dose,
                        quantity: recordatorio.quantity,
                        item: recordatorio.item,
                        hora: recordatorio.hora,
                        duracion: recordatorio.duracion,
 
                    })}
                    style={{
                        backgroundColor: "#0093B7",
                       
                    }}
                >
                    <Text> EDIT</Text>
                </TouchableOpacity>

                            </ListItem.Content>
                          </ListItem>
                        );
                      })}
                </View>
                
                      
                <TouchableOpacity
                    onPress={() => navigation.navigate("Registro de Medicamento")}
                    style={{
                        backgroundColor: "#0093B7",
                        width: 150,
                        height: 70,
                        borderRadius: 5,
                        justifyContent: "center",
                        marginTop: "25%"
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

        </ScrollView>
    );
}

export default screenHome;