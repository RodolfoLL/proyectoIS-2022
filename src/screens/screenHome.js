import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import image from '../assets/medicate.png'
import {db} from '../../database/firebase'
import { StatusBar } from 'expo-status-bar';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { render } from "react-dom";
import { ListItem ,Icon} from '@rneui/themed';


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
      
        <View>
        <ScrollView style={{ backgroundColor: '#001B48' }}>
            <View style={{
                fontSize: 30,
                alignItems: "center",
                marginTop: "5%"
                
            }}>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold' }}>
                    MEDICATE 
                </Text>
                <View style={{width: "90%", height: "30%"}}>
                    {recordatorios.map((recordatorio) => {
                        return (
                          <ListItem key={recordatorio.id} style={{marginBottom: 10}}>
                            
                            <ListItem.Content bottomDivider style={{width: "100%", height: "100%",}}>
                             
                              <ListItem.Title style={{ color: "black", fontSize: 25, fontWeight: "bold"}}>{recordatorio.nombreMed}</ListItem.Title>
                              
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
                                    color={"#0093B7"} 
                                    onPress={() => navigation.navigate("Registro de Medicamento")}  
                                    style={{ marginTop: "0%"}}/>
                                <Icon type="material-community" 
                                    name={"delete-circle"} 
                                    size={50} color={"#0093B7"} 
                                    onPress={() => navigation.navigate("Registro de Medicamento")} 
                                    style={{ marginTop: "80%"}}/>
                            </View>
                          </ListItem>
                        );
                      })}
                </View>
                
                      
                
            </View>

        </ScrollView>
        <TouchableOpacity
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
                        left:260,
                        top:460 
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
                </TouchableOpacity>
                <StatusBar style="auto" />
         
                       
    </View>
   
    );
                                    
}

export default screenHome;


