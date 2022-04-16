import React, {useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Alert,Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
// import {db} from './database/firebase';
// import { doc, setDoc } from 'firebase/firestore';


const HoraScreen=(props)=>{
    const { nombreMed,tipoAdm,dose,quantity,item,editar } = props.route.params;
    console.log(props.route.params)
    if (editar){
        let hora = props.route.params.hora
        var [datos, setdatos] = useState(hora);
    }else{
        var [datos, setdatos] = useState([]);
    }

    //  let cantPres = 0;

    // const aumentarPresionado = () => {
    //      if (editar){
    //         cantPres = cantPres+1
    //      console.log(cantPres)
    //      }   
         
    //  }
    
    // const verificarPresionado = () => {
    //     if(editar){
    //         if (cantPres <= 1){
    //          } 
    //     }
    //  }
    let frecuencia = item;
    const [contador, setcontador] = useState(frecuencia)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
            if(event.type==='set'){
                setShow(false);
                const currentDate = selectedDate || date;
                setDate(currentDate);
                let template = new Date(currentDate);
                const formatAMPM = (date) => {
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    if(hours < 10){
                        hours = "0" + hours;
                    }
                    hours = hours ? hours : 12;
                    minutes = minutes < 10 ? '0'+minutes : minutes;
                    var strTime = hours + ':' + minutes + ' ' + ampm;
                    return strTime;
                }
                template = formatAMPM(template);
                setdatos([...datos,template]);
                setcontador(contador -1);
            }else{
                setShow(false)
            }
    };
    const showMode=(currentMode)=>{
        if(contador === 0){
            Alert.alert("Ups","No puedes agregar mas horas");
        }else{
            setShow(true);
            setMode(currentMode);
        }
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
                    hora:hora.sort((a,b)=>{
                        if(a.substring(0,1) < b.substring(0,1)){
                            return -1;
                        }else if(a.substring(0,1) > b.substring(0,1)){
                            return 1;
                        }else{
                            return 0;
                        }
                    }),
                    duracion: props.route.params.duracion,
                    editar:editar
            }

        }
            else{
                    var datosRecordatorio = {
                        nombreMed: nombreMed, 
                        tipoAdm: tipoAdm,
                        dose: dose,
                        quantity:quantity,
                        item: item,
                        hora:hora.sort((a,b)=>{
                            if(a.substring(0,1) < b.substring(0,1)){
                                return -1;
                            }else if(a.substring(0,1) > b.substring(0,1)){
                                return 1;
                            }else{
                                return 0;
                            }
                        }),
                        editar:editar
                    }
            }
            
            
            let nuevoArray = [...new Set(hora)]
           if(nuevoArray.length === frecuencia){
                props.navigation.navigate('DuracionTratamiento',datosRecordatorio)
            }
            else{
                if(nuevoArray.length !== frecuencia){
                    Alert.alert("upss","necesitas seleccionar solo"+ " "+`${frecuencia}`+" " +"horas(diferentes)")
                }
            }

        }else{
            Alert.alert("upss","debes de ingresar una hora")
        }
    }
    const RestablecerHoras =(datos)=>{
        setdatos(datos=>[]);
        setcontador(frecuencia);
    }
      return (
        <View style={styles.container}>
            <Text style={styles.texto}>Horas a establecer: {contador}</Text>
            <Text style={styles.texto}>{'('+datos +")"}</Text>
                <TouchableOpacity
                    onPress={()=>showMode('time')}
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