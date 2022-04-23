import { useState } from "react";
import { View,StyleSheet } from "react-native";
import { Input,Button,Icon,Text } from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { size } from "lodash";
const RegistroUsuario= ({route,navigation}) =>{
    
    const [Datos, setDatos] = useState(defaultFormValues())
    const [mostarContra, setmostarContra] = useState(false)
    const [mostrarConfirmar,setmostarConfirmar] = useState(false)
    const [errorContra,seterrorContra]= useState("")
    const [errorConfirmar,seterrorConfirmar] = useState("")
    const [errorNombre,seterrorNombre] = useState("")
    const [errorEmail,seterrorEmail] = useState("")
    const onChange = (e, type) => {
        setDatos({ ...Datos, [type]: e.nativeEvent.text })
        console.log(Datos)
    }

    function validarCorreo(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    const validarDatos=() =>{
        let regex = new RegExp("^[a-zA-ZÀ-ÿ ]+$");
        let letras= new RegExp("[a-zA-Z]");
        seterrorConfirmar("")
        seterrorContra("")
        seterrorNombre("")
        seterrorEmail("")
        let valido = true
        if(!letras.test(Datos.nombre)){
            seterrorNombre("Debe llenar el nombre")
            valido=false
        }
        else{
            if(!regex.test(Datos.nombre)){
                seterrorNombre("Ingrese solo letras en el nombre")
                valido = false
            }
        }
        if(!validarCorreo(Datos.email)){
            seterrorEmail("debes ingresar un correo válido")
            valido = false
        }
        if(size(Datos.contraseña) <= 7){
            seterrorContra("La contraseña debe tener 8 o más caracteres")
            valido = false
        }
        
         if(Datos.contraseña != Datos.confirmar){
                seterrorConfirmar("Las contraseñas no coinciden")
                valido = false
            
        }
        
        return valido
    }
    const guardarDato=()=>{
        if(validarDatos){
            navigation.navigate("Recordatorios")
        }
    }
    return (
       <KeyboardAwareScrollView>
            <View style={styles.container}>
            <Text style={styles.titulo}> REGISTRAR NUEVO USUARIO </Text>
            <Text style = {styles.text} >Nombre</Text>
            <Input
                containerStyle={styles.input}
                placeholder="Nombre de usuario"
                onChange={(e) => onChange(e, "nombre")}
                keyboardType="default"
                errorMessage={errorNombre}
                defaultValue={Datos.nombre}
            />
        <Text style = {styles.text} >Correo Electrónico</Text>
            <Input
                containerStyle={styles.input}
                placeholder="email@address.com"
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={Datos.email}
            />
        <Text style = {styles.text} >Contraseña</Text>
            <Input
                containerStyle={styles.input}
                placeholder="Contraseña"
                contraseña={true}
                secureTextEntry={!mostarContra}
                onChange={(e) => onChange(e, "contraseña")}
                errorMessage={errorContra}
                defaultValue={Datos.contraseña}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ mostarContra ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setmostarContra(!mostarContra)}
                    />
                }
            />
        <Text style = {styles.text} >Confirmar Contraseña</Text>
        <Input
                containerStyle={styles.input}
                placeholder="Confirma tu contraseña..."
                contraseña={true}
                secureTextEntry={!mostrarConfirmar}
                onChange={(e) => onChange(e, "confirmar")}
                errorMessage={errorConfirmar}
                defaultValue={Datos.confirmar}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ mostrarConfirmar ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setmostarConfirmar(!mostrarConfirmar)}
                    />
                }
            />
            <Button
                title="REGISTRAR"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={()=> guardarDato()}
            />
           
        </View>
      </KeyboardAwareScrollView>
    )
    
}

const defaultFormValues = () => {
    return { nombre:"",email: "", contraseña: "", confirmar: "" }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001B48',
        paddingLeft: 35,
        paddingRight: 35,
        color: 'white'
      },
    form: {
        marginTop: 30
    },
    input: {
        
    width: "100%",
    borderColor: 'white',
 
    marginTop: 5,
    marginBottom: 5,
    
    color: 'white',
    backgroundColor:"white"
        

    },  
    btnContainer: {
        
        marginTop: 20,
        width: "40%",
        alignSelf: "center"
    },
    btn: {
        color: 'white',
        backgroundColor: '#0093B7',
        fontSize: 20
    },
    icon: {
        color: "black"
    },
    text:{
        color: "white",
        fontSize:20,
      
    },
    titulo:{
        paddingTop:10,
        paddingBottom:10,
        color: "white",
        fontSize:20,
        alignSelf: "center",
    }
});
export default RegistroUsuario