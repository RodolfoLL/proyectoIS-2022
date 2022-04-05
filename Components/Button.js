import React, {useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {db} from './database/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const ButtonDateTime=()=>{
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        if(event ==="cancel"){
            const currentDate = selectedDate;
            setDate(currentDate);
            setDate(currentDate);
            setShow(false);
            // let template = new Date(currentDate);
            // let fdate = template.getDate() + '/' + (template.getMonth()+1) +'/'+template.getFullYear();
            // let ftime = 'Hours: '+template.getHours() + '| Minutes: '+template.getMinutes();
        }
    };
    const showMode=(currentMode)=>{
        setShow(true);
        setMode(currentMode);
    }
      return (
        <View>
            <TouchableOpacity
                 onPress={()=>showMode('date')}
            >
                 <View style={styles.buttonDate}>
                    <Text style={styles.texto}>Fecha</Text>
                 </View>
             </TouchableOpacity>
             <TouchableOpacity
                    onPress={()=>showMode('time')}
             >
                 <View style={styles.buttonTime}>
                     <Text style={styles.texto}>Hora</Text>
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
export const ButtonCont=()=>{
    return(
    <TouchableOpacity
        onPress={()=>alert('desea continuar?')}
        >
        <View style={styles.buttonCont}>
            <Text style={styles.texto}>Continuar</Text>
        </View>
    </TouchableOpacity>
    )
}
export const ButtonCancel=()=>{
    return(
      <TouchableOpacity
        onPress={()=>alert('Se cerro')}
      >
          <View style={styles.buttonCancel}>
             <Text style={styles.texto}>Cancelar</Text>
          </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    buttonDate:{
        alignItems:'center',
        width: 200,
        height:32,
        backgroundColor: '#0093B7',
        borderRadius:25,
        bottom:10,
    },
    buttonTime:{
        backgroundColor: '#0093B7',
        width:200,
        height:32,
        borderRadius:25,
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