import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../database/firebase'
//import firebase from "../database/firebase";

const DuracionTratamiento = (props) => {
    
    /*const guardarDuracion = async (duracion) => {
        
        if (duracion === '') {
          alert("please provide a name");
        } else {
    
          try {
            await firebase.db.collection("recordatorio").add({
                Duracion: duracion
            });
            
            console.log("guardado")
            //props.navigation.navigate("UsersList");
          } catch (error) {
            console.log(error)
          }
        }
    };*/
    
    const guardarDuracion = (duracion)=>{

        const myDoc = doc(db,'Recordatorios','Recordatorio');
        const docdata = {
          'Duracion del tratamiento': duracion
        }
        setDoc(myDoc,docdata)
          .then(()=> {
            //alert('document created');
          })
          .catch((error)=>{
           alert(error.mesagge)
        })
        props.navigation.navigate("FechaFinal");
        
    }

    return(
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Text style={styles.title}>¿Cuanto dura el tratamiento?</Text>
            </View>

            <View style={[styles.box, styles.box2]}>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion('5 dias')} >
                    <Text style={styles.textBoton}>5 dias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion('10 dias')}  >
                    <Text style={styles.textBoton}>10 dias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion('1 semana')}  >
                    <Text style={styles.textBoton}>1 semana</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion('30 dias')}  >
                    <Text style={styles.textBoton}>30 dias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => {props.navigation.navigate('FechaFinal')}}  >
                    <Text style={styles.textBoton}>Establecer la fecha final</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.box, styles.box3]}>
                <TouchableOpacity style={[styles.boton, styles.botonCancelar]}
                    onPress={() => alert('Alert with one button')}  >
                    <Text style={styles.textBoton}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#001B48',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    box1: {
        flex: 1,
        paddingTop: 50,
    },
    box2: {
        flex: 6
    },
    box3: {
        flex: 2,
    },
    title:{
        fontSize: 23,
        color: '#fff'
    },
    boton:{
        backgroundColor: "#0093B7",
        borderRadius: 2,
        marginBottom: 20,
        padding: 12,
		alignItems: 'center'
    },
    textBoton:{
        fontSize: 20,
        color: "#fff"
    },
    botonCancelar:{
        width: 235
    }

});

export default DuracionTratamiento