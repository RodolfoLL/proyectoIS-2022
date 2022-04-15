import React, {useState} from 'react'
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native'
import  DateTimePicker  from '@react-native-community/datetimepicker'
import { doc, setDoc,collection, addDoc} from 'firebase/firestore';
import {db} from '../../database/firebase'

const FechaFinal = (props) => {
    const {editar} = props.route.params;
    if (editar){
        let {duracion} = props.route.params
        console.log(duracion)
        var [textDate, setText] = useState(duracion);
    }
    else{
        var [textDate, setText] = useState(false);
    }
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {

            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);

            let fechaTemporal = new Date(currentDate)
            let fecha = fechaTemporal.getDate() +'/'+ (fechaTemporal.getMonth()+1)+'/'+ fechaTemporal.getFullYear()
            setText(fecha)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const { nombreMed,tipoAdm,dose,quantity,item,hora } = props.route.params;
    
    const guardarDuracion = (duracion)=>{
        if(editar){
            let datosRecordatorio = {
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item,
                hora:hora,
                duracion: duracion
            }
            const id = props.route.params.id
            guardarEdit(id,datosRecordatorio)
        }
        else{
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
        }
        props.navigation.navigate("screenHome")
    }
    const guardarEdit = async (id,datos) =>{
        
        const docref = doc(db,"Recordatorios",id)
        console.log(docref)
        console.log(datos);
        await setDoc(docref,datos)
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
                        minimumDate={new Date()}
                    />
                )}
            </View>
            

            <View style={[styles.box, styles.box3]}>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(textDate)}  >
                    <Text style={styles.textBoton}>Guardar</Text>
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
        fontSize: 25,
        color: '#fff'
    },
    boton:{
        backgroundColor: "#0093B7",
        borderRadius: 25,
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