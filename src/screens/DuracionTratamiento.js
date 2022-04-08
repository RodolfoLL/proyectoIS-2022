import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../../database/firebase'
import {collection, addDoc,} from 'firebase/firestore';

const DuracionTratamiento = (props) => {

    const { nombreMed,tipoAdm,dose,quantity,item,hora } = props.route.params;
    
    const guardarDuracion = (duracion)=>{

        let datosRecordatorio = {
            nombreMed: nombreMed, 
            tipoAdm: tipoAdm,
            dose: dose,
            quantity:quantity,
            item: item,
            hora:hora,
            duracion: duracion
        }
        addDoc(collection(db, 'Recordatorios'), datosRecordatorio)
        
        props.navigation.navigate("screenHome")
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
                    onPress={() => {props.navigation.navigate('FechaFinal', props.route.params)}}  >
                    <Text style={styles.textBoton}>Establecer la fecha final</Text>
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
    title:{
        fontSize: 25,
        color: '#fff'
    },
    boton:{
        backgroundColor: "#0093B7",
        borderRadius:25,
        borderRadius: 2,
        marginBottom: 20,
        padding: 12,
		alignItems: 'center'
    },
    textBoton:{
        fontSize: 20,
        color: "#fff"
    }
});

export default DuracionTratamiento