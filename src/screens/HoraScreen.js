import React, {useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
// import {db} from './database/firebase';
// import { doc, setDoc } from 'firebase/firestore';


const HoraScreen=(props)=>{
    const { nombreMed,tipoAdm,dose,quantity,item,editar } = props.route.params;
   
    if (editar){
        let duracion = props.route.params.hora
       
        
        var [datos, setdatos] = useState(duracion);
    }
    else{
        var [datos, setdatos] = useState([]);
    }
   
    let frecuencia = item;
    const [contador, setcontador] = useState(frecuencia)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setDate(currentDate);
            setShow(false);
            let template = new Date(currentDate).toTimeString().substring(0,5);
            setdatos([...datos,template]);
            setcontador(contador -1);
    };
    const showMode=(currentMode)=>{
            setShow(true);
            setMode(currentMode);
    }

    const guardarHora = (hora)=>{
        if(hora.length !== 0 ){

            if(editar){
                var datosRecordatorio = {
                    id: props.route.params.id,
                    nombreMed: nombreMed, 
                    tipoAdm: tipoAdm,
                    dose: dose,
                    quantity:quantity,
                    item: item,
                    hora:hora,
                    duracion: props.route.params.duracion,
                    editar:editar
            }
            console.log(hora)
        }
            else{
                    var datosRecordatorio = {
                        nombreMed: nombreMed, 
                        tipoAdm: tipoAdm,
                        dose: dose,
                        quantity:quantity,
                        item: item,
                        hora:hora,
                        editar:editar
                    }
            }
            
            
            let nuevoArray = [...new Set(hora)]
            if(nuevoArray.length === frecuencia){
                props.navigation.navigate('DuracionTratamiento',datosRecordatorio)  
            }
            else{
                if(nuevoArray.length !== frecuencia){
                    Alert.alert("upss","necesitas seleccionar"+ " "+`${frecuencia}`+" " +"horas(diferentes)")
                }
            }

        }else{
            Alert.alert("upss","debes de ingresar una hora")
        }
    }
    const RestablecerHoras =(datos)=>{
        setdatos(datos=>[]);
    }
      return (
        <View style={styles.container}>
            <Text style={styles.texto}>Horas a establecer: {contador}</Text>
            <Text style={styles.texto}>{'('+datos +")"}</Text>
                <TouchableOpacity
                    onPress={()=> showMode('time')}
                >
                    <View style={styles.buttonTime}>
                        <Text style={styles.texto}>Hora</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>guardarHora(datos)}
                >
                    <View style={styles.buttonTime}>
                        <Text style={styles.texto}>Continuar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>RestablecerHoras(datos)}
                >
                    <View style={styles.buttonTime}>
                        <Text style={styles.texto}>Restablecer Horas</Text>
                    </View>
                </TouchableOpacity>
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
    )   
}
export default HoraScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001B48',
        alignItems: 'center',
        justifyContent: 'center',
      },
    buttonTime:{
        backgroundColor: '#0093B7',
        borderRadius:25,
        width:200,
        height:32,
        marginVertical:10,
    },
    buttonCont:{
        backgroundColor:'#0093B7',
        borderRadius:25,
        width:150,
        height:35,
        marginVertical:20,
        top:5,
        padding:2
    },
    texto:{
        color:'white',
        fontFamily:'sans-serif',
        fontSize:20,
        textAlign:'center'  
    },
    buttonCancel:{
        backgroundColor:'#0093B7',
        borderRadius:25,
        width:150,
        height:35,
    },
})