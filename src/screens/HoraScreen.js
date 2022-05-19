import React, { useState, useEffect } from "react";
import { View, Text,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

const HoraScreen=(props)=>{
    const [fuente,setFuente] = useState({fontSize: 20})
    const [fuenteTitulo,setFuenteTitulo] = useState({fontSize: 30})
    const [anchoBoton,setAnchoBoton] = useState({width:"55%"})

    const { uid,nombreMed,tipoAdm,dose,quantity,item,editar,fuenteNuevo } = props.route.params;
    useEffect( () =>{
        let fuenteTemporalTitulo = {
            fontSize: fuenteNuevo.fontSize+3
        }
        setFuente(fuenteNuevo)
        setFuenteTitulo(fuenteTemporalTitulo)
        cambiarAnchoBoton(fuenteNuevo.fontSize)
      },[]
    );

    const cambiarAnchoBoton = (tamanio)=>{
        const anchoBotonTemporal = {...anchoBoton};
        if(tamanio === 20){
            anchoBotonTemporal.width = "55%"
        }else if(tamanio === 25){
            anchoBotonTemporal.width = "65%"
        }else if(tamanio === 30){
            anchoBotonTemporal.width = "75%"
        }
        setAnchoBoton(anchoBotonTemporal)
    }

    console.log(props.route.params)
    if (editar){
        let hora = props.route.params.hora
        var [datos, setdatos] = useState(hora);

    }else{
        var [datos, setdatos] = useState([]);
    }
    const [presionado, setPresionado] = useState(false)
   
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
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    minutes = minutes < 10 ? '0'+minutes : minutes;
                    var strTime = hours + ':' + minutes + ' ' + ampm;
                    return strTime;
                }
                template = formatAMPM(template);
                setdatos([template,...datos]);
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
                console.log("Entra a editar hora ")
                var datosRecordatorio = {
                    uid:uid,
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

            }
            else{
                    var datosRecordatorio = {
                        uid: uid,
                        nombreMed: nombreMed, 
                        tipoAdm: tipoAdm,
                        dose: dose,
                        quantity:quantity,
                        item: item,
                        hora:hora,
                        editar:editar
                    }
            }
            
            
            let nuevoArray = [...new Set(hora)].sort();
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
            <Text style={[styles.texto,fuenteTitulo]}>Horas a establecer: {contador}</Text>
            <Text style={[styles.texto,fuenteTitulo]}>{'('+datos +")"}</Text>
                <TouchableOpacity
                    style={[styles.boton,anchoBoton]}
                    onPress={()=> {
                        if(editar && !presionado){
                            setPresionado(true)
                            RestablecerHoras(datos)
                            console.log("entro")
                        }
                        showMode('time')

                }}
                >
                    <Text style={[styles.texto,fuente]}>Hora</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.boton,anchoBoton]}
                    onPress={()=>guardarHora(datos)}
                >
                    <Text style={[styles.texto,fuente]}>Continuar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.boton,anchoBoton]}
                    onPress={()=>RestablecerHoras(datos)}
                >
                    <Text style={[styles.texto,fuente]}>Restablecer Horas</Text>
                </TouchableOpacity>
             {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display='default'
                onChange={onChange}
                style={fuente}
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
    boton:{
        backgroundColor: '#0093B7',
        borderRadius:25,
        //width:"55%",
        marginVertical:"3%",
        paddingVertical: "1%"
    },
    texto:{
        color:'white',
        fontFamily:'sans-serif',
        //fontSize:20,
        textAlign:'center'  
    }
})