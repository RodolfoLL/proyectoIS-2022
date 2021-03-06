import React, {useState} from 'react'
import { View, Text, StyleSheet,TouchableOpacity,Alert} from 'react-native'
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
        var [textDate, setText] = useState("");
    }
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {

            const currentDate = selectedDate || date;
            
            setShow(false);
            setDate(currentDate);

            let fechaTemporal = new Date(currentDate)
            let fechaActual = new Date()
            let fecha = (fechaTemporal.getMonth()+1) +'/'+ fechaTemporal.getDate()+'/'+ fechaTemporal.getFullYear()

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

    const { uid,nombreMed,tipoAdm,dose,quantity,item,hora } = props.route.params;

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
               editar:true
            }
        } else{
            var datosRecordatorio = {
                uid:uid,
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item
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
                editar:editar
            }
            let fechaActual = new Date()
            let fecha = fechaActual.getMonth()+ +'/'+fechaActual.getDate()+'/'+ fechaActual.getFullYear()
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
                    duracion: duracion
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