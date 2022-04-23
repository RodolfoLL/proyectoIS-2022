import { useState } from "react";
import { StyleSheet,View } from "react-native";
import { Input,Button,Icon,Text } from "react-native-elements";

const RegistroUsuario= ({props}) =>{
    
    const [Datos, setDatos] = useState(defaultFormValues())
    const [errorNombre,seterrorNombre] = useState("")
    const [errorEmail,seterrorEmail] = useState("")
    const [mostarContra, setmostarContra] = useState(false)
    const [mostrarConfirmar,setmostarConfirmar] = useState(false)
    const [erroContraseña,seterroContraseña]= useState("")
    const [errorConfirmar,seterrorConfirmar] = useState("")
    const onChange = (e, type) => {
        setDatos({ ...Datos, [type]: e.nativeEvent.text })
        console.log(Datos)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}> REGISTRAR NUEVO USUARIO </Text>
            <Text style = {styles.text} >Nombre</Text>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu Nombre..."
                onChange={(e) => onChange(e, "nombre")}
                keyboardType="default"
                errorMessage={errorNombre}
                defaultValue={Datos.nombre}
            />
        <Text style = {styles.text} >Correo Electrónico</Text>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={Datos.email}
            />
        <Text style = {styles.text} >Contraseña</Text>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                contraseña={true}
                secureTextEntry={!mostarContra}
                onChange={(e) => onChange(e, "contraseña")}
                errorMessage={erroContraseña}
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
            />
           
        </View>
    )
    
}

const defaultFormValues = () => {
    return { nombre:"",email: "", contraseña: "", confirmar: "" }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001B48',
        paddingLeft: 20,
        paddingRight: 30,
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
    padding: 5,
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