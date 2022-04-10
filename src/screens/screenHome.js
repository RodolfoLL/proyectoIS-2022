import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import image from '../assets/medicate.png'
import {db} from '../../database/firebase'

import { collection, query, where, getDocs } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { render } from "react-dom";
import { ListItem, Avatar ,Icon} from '@rneui/themed'

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
                          <ListItem key={recordatorio.id} style={{marginBottom: 5}}>
                            
                            <ListItem.Content bottomDivider style={{width: "100%", height: "100%"}}>
                              <ListItem.Title style={{ color: "black", fontSize: 25}}>{recordatorio.nombreMed}</ListItem.Title>
                              <ListItem.Subtitle style={{ color: "black"}}>Tipo de administracion: {recordatorio.tipoAdm}</ListItem.Subtitle>
                              <ListItem.Subtitle style={{ color: "black"}}>Dosis: {recordatorio.dose}</ListItem.Subtitle>
                              <ListItem.Subtitle style={{ color: "black"}}>Cantidad de medicamentos: {recordatorio.quantity}</ListItem.Subtitle>
                              <ListItem.Subtitle style={{ color: "black"}}>Frecuencia: {recordatorio.item}</ListItem.Subtitle>
                              <ListItem.Subtitle style={{ color: "black"}}>Hora: {recordatorio.hora}</ListItem.Subtitle>
                              <ListItem.Subtitle style={{ color: "black"}}>Duracion hasta: {recordatorio.duracion}</ListItem.Subtitle>

                              
                            </ListItem.Content>
                            
                            <View style={{ flexDirection: "column", height: "100%"}}>
                                <Icon type="material-community" 
                                    name={"pencil-circle"} size={50} 
                                    color={"#001B48"} 
                                    onPress={() => navigation.navigate("Registro de Medicamento")}  
                                    style={{ marginTop: "0%"}}/>
                                <Icon type="material-community" 
                                    name={"delete-circle"} 
                                    size={50} color={"#001B48"} 
                                    onPress={() => navigation.navigate("Registro de Medicamento")} 
                                    style={{ marginTop: "90%"}}/>
                            </View>
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
                        marginTop: "30%"
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

/*

                <Image source={image}
                    style={{ height: 120, width: 120, borderRadius: 70 }}
                />
                <Text style={{ textAlign: 'center', margin: 20, color: 'white' }}>
                    Aplicacion para el recordatorio de medicamentos
                    para nuestros adultos mayores porque merecen ser ayudados
                </Text>
*/ 