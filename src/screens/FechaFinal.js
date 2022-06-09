import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,TouchableOpacity,Alert} from 'react-native'
import  DateTimePicker  from '@react-native-community/datetimepicker'
import { doc, setDoc,collection, addDoc} from 'firebase/firestore';
import {db} from '../../database/firebase'

const FechaFinal = (props) => {
    const [fuente,setFuente] = useState({fontSize: 20})
    const [fuenteTitulo,setFuenteTitulo] = useState({fontSize: 30})

    const {editar} = props.route.params;
    if (editar){
        let {duracion} = props.route.params
        console.log(duracion)
        var [textDate, setText] = useState(duracion);
    }
    else{
        var [textDate, setText] = useState("");
    }
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [limiteDate, setLimiteDate] = useState(new Date());
    
    const onChange = (event, selectedDate) => {

            const currentDate = selectedDate || date;
            
            setShow(false);
            setDate(currentDate);

            let fechaTemporal = new Date(currentDate)
            let fechaActual = new Date()
            let fecha =  (fechaTemporal.getMonth()+1) + '/'+fechaTemporal.getDate()+ '/'+ fechaTemporal.getFullYear();

            if(fechaTemporal.toDateString() === fechaActual.toDateString()){
                if(validarHora()){
                    console.log("validacion correcta")
                    setText(fecha)
                }else{
                    Alert.alert("Fecha No Registra!","Eliga una hora que no halla pasado");
                    setText("")
                    actualizarHoraRegistrada()
                }
            }else{
                console.log("fECHAS DIFERENTES")
                setText(fecha)
            }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const { uid,nombreMed,tipoAdm,dose,quantity,item,hora,fuenteNuevo } = props.route.params;

    useEffect( () =>{
        let fuenteTemporalTitulo = {
            fontSize: fuenteNuevo.fontSize+5
        }
        setFuente(fuenteNuevo)
        setFuenteTitulo(fuenteTemporalTitulo)
      },[]
    );

    const validarHora = () =>{
        /*let horaCompletoActual = new Date().toTimeString().substring(0,5);
        let horaActual = parseInt(horaCompletoActual.substring(0,2)) 
        let minutoActual = parseInt(horaCompletoActual.substring(3,5))*/
        let fechaActual = new Date()
        let hours = fechaActual.getHours();
        let minutes = fechaActual.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        let horaActual = hours ? hours : 12;
        let minutoActual = minutes < 10 ? '0'+minutes : minutes;

        let validacion = false
        for(var i=0; i < hora.length ; i++){

            let horaRegistrada = hora[i]
            console.log("hora registrada: "+hora[i])
            let horaTemporal = parseInt(horaRegistrada.substring(0,2)) 
            let minutoTemporal = parseInt(horaRegistrada.substring(horaRegistrada.length-5,horaRegistrada.length-3))
            let medioDia = horaRegistrada.substring(horaRegistrada.length-2,horaRegistrada.length)
            console.log(horaTemporal)
            console.log(minutoTemporal)
            console.log(medioDia)
            if(ampm === medioDia){
                if(horaTemporal !== 12 && horaTemporal > horaActual){
                    validacion = true
                }else if(horaTemporal == horaActual && minutoTemporal > minutoActual){
                    validacion = true
                }else{
                    validacion = false
                }
            }else if(ampm === 'AM' && medioDia === 'PM'){
                validacion = true
            }
            
        }

        return validacion
    }

    const actualizarHoraRegistrada = ()=>{
        if (editar){
            var datosRecordatorio = {
               uid: uid,
               id: props.route.params.id,
               nombreMed: nombreMed, 
               tipoAdm: tipoAdm,
               dose: dose,
               quantity:quantity,
               item: item,
               hora: props.route.params.hora,
               duracion: props.route.params.duracion,
               editar:true,
               fuenteNuevo: fuenteNuevo
            }
        } else{
            var datosRecordatorio = {
                uid:uid,
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item,
                fuenteNuevo: fuenteNuevo
            }
        }
        props.navigation.navigate('Establecer horas',datosRecordatorio)
    }
    
    const guardarDuracion = (duracion)=>{
        if(editar){
            const id = props.route.params.id
            let datosRecordatorio = {
                uid:uid,
                id:id,
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item,
                hora:hora,
                duracion: duracion,
                editar:editar,
                fuenteNuevo: fuenteNuevo
            }
            let fechaActual = new Date()
            let fecha = fechaActual.getDate()+'/'+fechaActual.getMonth() +'/'+ fechaActual.getFullYear()
            if(textDate === fecha){
                if(validarHora()){
                    console.log("SE GUARDO")
                    props.navigation.navigate("Configurar Notificacion",datosRecordatorio);
                }else{
                    console.log("NO SE GUARDO")
                    Alert.alert("Fecha No Registra!","Elija una hora que no pueda haber pasado");
                    actualizarHoraRegistrada()
                }
            }else{
                props.navigation.navigate("Configurar Notificacion",datosRecordatorio);
            }  
        }
        else{
            if(textDate !== ""){
                let datosRecordatorio = {
                    uid:uid,
                    nombreMed: nombreMed, 
                    tipoAdm: tipoAdm,
                    dose: dose,
                    quantity:quantity,
                    item: item,
                    hora:hora,
                    duracion: duracion,
                    fuenteNuevo: fuenteNuevo
                }
                props.navigation.navigate("Configurar Notificacion",datosRecordatorio);

            }else{
                Alert.alert("Fecha No Escogida!","Eliga la duracion del tratamiento");
            }
        }
    }

    const guardarEdit = async (id,datos) =>{
        const docref = doc(db,uid,id)
        console.log(docref)
        console.log(datos);
        await setDoc(docref,datos)
    }
    return(
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Text style={[styles.title,fuenteTitulo]}>Establecer la fecha final</Text>
            </View>

            <View style={[styles.box, styles.box2]}>

                <TouchableOpacity style={styles.boton}
                    onPress={() => showMode('date') } >
                    <Text style={[styles.textBoton,fuente]}>Mostrar Calendario</Text>
                </TouchableOpacity>

                <Text style={[styles.fecha,fuente]}>Fecha Escogida: {textDate}</Text>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                        minimumDate={new Date()}
                        maximumDate={new Date(limiteDate.getFullYear()+30,1,1)}
                    />
                )}
            </View>
            

            <View style={[styles.box, styles.box3]}>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(textDate)}  >
                    <Text style={[styles.textBoton,fuente]}>Guardar</Text>
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
        alignItems: "center"
    },
    box2: {
        flex: 2,
        alignItems: "center"
    },
    box3: {
        flex: 1
    },
    title:{
        //fontSize: 25,
        color: '#fff'
    },
    boton:{
        backgroundColor: "#0093B7",
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: "10%",
        paddingVertical: 7,
        alignItems: 'center',
        width: "90%"
    },
    textBoton:{
        //fontSize: 20,
        color: "#fff"
    },

    fecha:{
        color: "#fff",
        //fontSize: 18
    }

});

export default FechaFinal