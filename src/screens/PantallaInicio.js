import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView,Alert,FlatList,Button,BackHandler} from "react-native";
import image from '../assets/medicate.png'
import {db} from '../../database/firebase'
import { StatusBar } from 'expo-status-bar';
import { collection, query, where, getDoc ,doc, deleteDoc,updateDoc, onSnapshot} from "firebase/firestore";
import { render } from "react-dom";
import { ListItem ,Icon} from 'react-native-elements';
import { Usuario } from "./Login";
import {registerForPushNotificationsAsync, eliminarRecordatorioNotif} from './NotificacionRecordatorio';
import { getAuth} from 'firebase/auth';
import {app} from '../../database/firebase'
import * as Notifications from 'expo-notifications'
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from "@react-navigation/native";
import { obetenerDatosRecordatorios } from "../functions/notificacionFunciones";
import { async } from "@firebase/util";
import { MaterialIcons } from '@expo/vector-icons'; 
let c=0;

const verificarFechas=(a)=>{
    fechFinal=(new Date(a).getTime());
    hoy=new Date(Date.now())
    hoy.setHours(0,0,0,0)
    fechHoy=(hoy.getTime())
}
const PantallaInicio = ({navigation}) => {

    const [fuente,setFuente] = useState({fontSize: 20})
    const [fuenteTitulo,setFuenteTitulo] = useState({fontSize: 30})
    const [fuenteSubTitulo,setSubFuenteTitulo] = useState({fontSize: 25})
    const [altoTarjeta,setAltoTarjeta] = useState({height: 125})
    const [fuenteBaseDatos,setFuenteBaseDatos] = useState({fontSize: 20})

    const auth = getAuth(app);
    const user = auth.currentUser;
    const uid = user.uid;
    console.log(uid);

    const actualizarFuente = async() =>{
        console.log("FUENTE===========================")
        const docRef = doc(db, "Fuentes",uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().fontSize)
        const objetoFuente = docSnap.data().fontSize
        setFuenteBaseDatos(objetoFuente)

        console.log(objetoFuente.fontSize)
        console.log("===========================")

        const fuenteTemporal = {...fuente};
        const fuenteTemporalTitulo = {...fuenteTitulo};
        const subtituloTemporal = {...fuenteSubTitulo};

        fuenteTemporal.fontSize = objetoFuente.fontSize-5; //15px 20px 25px
        fuenteTemporalTitulo.fontSize = objetoFuente.fontSize+20; //40px 45px 50px
        subtituloTemporal.fontSize = objetoFuente.fontSize+3; //23px 28px 33px

        setFuente(fuenteTemporal);
        setFuenteTitulo(fuenteTemporalTitulo);
        setSubFuenteTitulo(subtituloTemporal)
        cambiarTamanioTarjeta(objetoFuente.fontSize)
        
    }

    const cambiarTamanioTarjeta = (tamanio) =>{
        const altoTarjetaTemporal = {...altoTarjeta};
        if(tamanio === 20){
            altoTarjetaTemporal.height = tamanio+105
        }else if(tamanio === 25){
            altoTarjetaTemporal.height = tamanio+195
        }else if(tamanio === 30){
            altoTarjetaTemporal.height = tamanio+280
        }
        
        setAltoTarjeta(altoTarjetaTemporal)
    }

    navigation.setOptions({ 
    headerRight: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Registro de Medicamento",{uid:uid, fuenteNuevo:fuenteBaseDatos})}
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
            >{<MaterialIcons name="add-alarm" size={22} color="white" />}</Text>
            <Text
                style={{
                    fontSize: 17,
                    textAlign: "center",
                    color: "white",
                    lineHeight:16
                }}
            >{'Añadir'}</Text>
        </TouchableOpacity>),
        headerLeft: () => (
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{ paddingRight: 10 }}
            >
                <Feather name="menu" size={24} color="white" />
            </TouchableOpacity>  
        ),
    
    });
      const backAction = () => {
        Alert.alert('Salir', 'Seguro quieres salir de la aplicacion?', [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'Aceptar', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
    const [getExpoPushToken, setExpoPushToken]= useState('')
    const [recordatorios, setRecordatorios] = useState([]);
    console.log(recordatorios)
    useEffect( () =>{
        

        onSnapshot(doc(db, "Fuentes", uid), (doc) => {
            console.log("Current data: ", doc.data());
            actualizarFuente()
            console.log("===========================")
            console.log(fuente)
            console.log(fuenteTitulo)
            console.log("===========================")
        });

        onSnapshot(collection(db,uid), (snapshot) =>{
            setRecordatorios(snapshot.docs.map((doc) => ({...doc.data(),id: doc.id})).sort((a,b) => {
                if(a.nombreMed > b.nombreMed){
                    return 1;
                }else{
                    if(b.nombreMed > a.nombreMed){
                        return -1;
                    }else{
                        return 0;
                    }
                }
                }))
            registerForPushNotificationsAsync()
            .then(token => setExpoPushToken(token))
            .catch(e => console.log(e))
        });
        Notifications.addNotificationReceivedListener(async notification => {
            await Notifications.cancelScheduledNotificationAsync(notification["request"]["identifier"]);
            let notifData = notification["request"]["content"]["data"];
            let recordatorioId = notifData["recordatorioId"];
            let nombreMed=notifData["nombreMed"];
            let dosisMed=parseInt(notifData["DosisMed"]);
            let cantidadMed = parseInt(notifData["cantMedicamento"]);
            let Duracion=notifData["Duracion"];
            let FrecuenciaHoras=(notifData["FrecuenciaHoras"]);
            cantidadMed=descontar(dosisMed,cantidadMed);
            console.log(dosisMed);
            FrecuenciaHoras--;
            let cant=(dosisMed*FrecuenciaHoras);
            let sig=cantidadMed-cant;
            let maniana=new Date(Date.now());
            maniana.setHours(0,0,0,0);
            maniana=maniana.getTime()+(60*60*24*1000);
            console.log(maniana)
            let fechaFin=(new Date(Duracion)).getTime();
            console.log(fechaFin);
            if(maniana==fechaFin){
                let cantidadMan=dosisMed*(FrecuenciaHoras+1);
                if(cantidadMan>sig){
                    schedulePushNotification(nombreMed,cantidadMed);
                }
            }
            if(cantidadMed<dosisMed){
                schedulePushNotification(nombreMed,cantidadMed);
            }
            const docrefRecordatorio = doc(db,uid,recordatorioId)
            const datos = { quantity: cantidadMed}
            await updateDoc(docrefRecordatorio,datos)
            console.log("=======Notificacion recibida=======")
            console.log(notification);
          });
          BackHandler.addEventListener('hardwareBackPress', backAction);
  
          return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    },[]
    );
     
    const descontar=(n,cantidadMed)=>{
        cantidadMed -=n;
        cantidadMed< 0 ? cantidadMed = 0: null;
        console.log(cantidadMed)
        return cantidadMed;
    }
     async function schedulePushNotification(nombre,cantidad) {
        await Notifications.scheduleNotificationAsync({
          content: {
           title: "Solo le queda "+cantidad+" "+nombre+" de medicamento",
           body: "Debes comprar mas medicamentos para mañana 💊",
        },
        trigger: { seconds:2},
     });
      }

    const elimnarRecordatorio = async (id) =>{
        console.log(id)
        const docRef = doc(db,uid,id)
        console.log(docRef)
        eliminarRecordatorioNotif(uid,id)
        deleteDoc(docRef)
        navigation.navigate("Recordatorios",{uid: uid})
       
    }
    const confirmarElimniar = (id) => {
        Alert.alert("Eliminar recordatorio", "estas seguro?",[
       {text: "Si" ,onPress: () =>{ elimnarRecordatorio(id)} },
       {text: "No" ,onPress: async () =>{ 
        console.log("ok sin elimnar")
           } }
        ])
    }
    return (
         
        <SafeAreaView style={{ backgroundColor: '#001B48', height: "100%"}}>  
            <View style={{
                fontSize: 30,
                alignItems: "center",
                marginTop: "5%"
                
                }}>
                <Text style={[{color: 'white', fontWeight: 'bold' },fuenteTitulo]}>
                    MEDICATE 
                </Text>
            </View>
            
           
        <FlatList
            data={recordatorios}
            keyExtractor =  {(item) => item.id}
            renderItem = { ({item,index}) => 
            
            <View style={{width: "90%", marginHorizontal: "5%", marginBottom: "5%"}}>
                <ListItem key={item.id}>
                            
                    <ListItem.Content style={[{width: "100%"},altoTarjeta]}>
             
                        <ListItem.Title style={[{ color: "black", fontWeight: "bold"},fuenteSubTitulo]}>{item.nombreMed}</ListItem.Title>
              
                            <ListItem.Subtitle style={[{ color: "black"},fuente]}>Tipo de administracion: {item.tipoAdm}</ListItem.Subtitle>
                            <ListItem.Subtitle style={[{ color: "black"},fuente]}>Dosis: {item.dose}</ListItem.Subtitle>
                            <ListItem.Subtitle style={[{ color: "black"},fuente]}>Cantidad de medicamentos: {item.quantity}</ListItem.Subtitle>
                            <ListItem.Subtitle style={[{ color: "black"},fuente]}>Hora: {item.hora.toString()}</ListItem.Subtitle>
                            <ListItem.Subtitle style={[{ color: "black"},fuente]}>Duracion hasta: {item.duracion}</ListItem.Subtitle>

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
                                fuenteNuevo: fuenteBaseDatos
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