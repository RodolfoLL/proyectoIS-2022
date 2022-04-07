import React, {useState} from 'react'
import { View, Text, StyleSheet,TouchableOpacity,Button } from 'react-native'
import  DateTimePicker  from '@react-native-community/datetimepicker'
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../database/firebase'

const FechaFinal = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textDate, setText] = useState(false);

    const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);

            let temporalDate = new Date(currentDate)
            let fecha = temporalDate.getDate() +'/'+ (temporalDate.getMonth()+1)+'/'+ temporalDate.getFullYear() 
            setText(fecha)
            
            console.log(currentDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const { dosis, cantidadMed, frecuencia, hora } = props.route.params;
    
    const guardarDuracion = (duracion)=>{

        let datosRecordatorio = {
            dosis: dosis, 
            cantidadMed: cantidadMed,
            frecuencia: frecuencia,
            hora:hora,
            duracion: duracion
        }

        const myDoc = doc(db,'Recordatorios','Recordatorio');
        const docdata = datosRecordatorio
        setDoc(myDoc,docdata)
          .then(()=> {
            //alert('document created');
          })
          .catch((error)=>{
           alert(error.mesagge)
        })

        props.navigation.navigate("HomeScreen")
    }

    return(
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Text style={styles.title}>Establecer la fecha final</Text>
            </View>

            <View style={[styles.box, styles.box2]}>

                <TouchableOpacity style={styles.boton}
                    onPress={() => showMode('date') } >
                    <Text style={styles.textBoton}>Mostrar Calendario</Text>
                </TouchableOpacity>

                <Text style={styles.fecha}>Fecha Escogida: {textDate}</Text>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />
                )}
            </View>
            

            <View style={[styles.box, styles.box3]}>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(textDate)}  >
                    <Text style={styles.textBoton}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => {props.navigation.navigate('DuracionTratamiento')}}  >
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
        paddingTop: 50
    },
    box2: {
        flex: 2
  
    },
    box3: {
        flex: 1
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
        alignItems: 'center',
        width: 230
    },
    textBoton:{
        fontSize: 20,
        color: "#fff"
    },

    fecha:{
        color: "#fff",
        fontSize: 18
    }

});

export default FechaFinal