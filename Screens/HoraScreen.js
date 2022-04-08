import React, {useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
// import {db} from './database/firebase';
// import { doc, setDoc } from 'firebase/firestore';


export const HoraScreen=(props)=>{
    const{title,frecuencia,key,dosis,cantidadMed,hora} = props.route.params;
    let agregandoHoras={
        title:title,
        frecuencia:frecuencia,
        key:key,
        dosis:dosis,
        cantidadMed:cantidadMed,
        hora:datos
    }
    const [datos, setdatos] = useState([]);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
            setDate(currentDate);
            setDate(currentDate);
            setShow(false);
            let template = new Date(currentDate);
            let hora = template.getHours();
            let minutos = template.getMinutes();
            let time = `${hora}:${minutos}`;
            setdatos(time)
    };
    const showMode=(currentMode)=>{
        setShow(true);
        setMode(currentMode);
    }
      return (
        <View style={styles.container}>
            <Text style={styles.texto}>Numero de Periodos: {frecuencia}</Text>
            <Text style={styles.texto}>{datos}</Text>
                <TouchableOpacity
                    onPress={(valor)=>showMode('time')}
                >
                    <View style={styles.buttonTime}>
                        <Text style={styles.texto}>Hora</Text>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={()=>alert('Gracias')}
                >
                    <View style={styles.buttonTime}>
                        <Text style={styles.texto}>Continuar</Text>
                    </View>
                </TouchableOpacity> */}
                <Text style={styles.texto}>{agregandoHoras.hora}</Text>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001B48',
        alignItems: 'center',
        justifyContent: 'center',
      },
    buttonTime:{
        backgroundColor: '#0093B7',
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