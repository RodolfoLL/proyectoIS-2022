import React, {useState} from 'react'
import { View, Text, StyleSheet,TouchableOpacity,Button } from 'react-native'
import  DateTimePicker  from '@react-native-community/datetimepicker'
const FechaFinal = (props) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
            const currentDate = selectedDate;
            setShow(false);
            setDate(currentDate);
            event=null
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    return(
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Text style={styles.title}>Establecer la fecha final</Text>
            </View>

            <View style={[styles.box, styles.box2]}>

                <Text style={styles.fecha}>selected: {date.toLocaleString()}</Text>

                <TouchableOpacity style={styles.boton}
                    onPress={() => showMode('date') } >
                    <Text style={styles.textBoton}>Mostrar Calendario</Text>
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
            

            <View style={[styles.box, styles.box3]}>
                <TouchableOpacity style={styles.boton}
                    onPress={() => alert('Alert with one button')}  >
                    <Text style={styles.textBoton}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.boton, styles.botonCancelar]}
                    onPress={() => {props.navigation.navigate('CrearRecordatorio1')}}  >
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
          paddingTop: 50,
      },
      box2: {
          flex: 6,
  
      },
      box3: {
          flex: 4,
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
          alignItems: 'center'
      },
      textBoton:{
          fontSize: 20,
          color: "#fff"
      },
      botonCancelar:{
          width: 225
      },
      fecha:{
          color: "#fff",
          marginBottom: 20
      }

});

export default FechaFinal