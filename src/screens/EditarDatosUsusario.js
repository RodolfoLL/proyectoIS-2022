import { useState } from "react";
import { View,StyleSheet,ActivityIndicator,Dimensions,Platform,Alert } from "react-native";
import { Input,Button,Icon,Text,Overlay } from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import{useHeaderHeight } from "@react-navigation/elements"
import { size } from "lodash";
import {getAuth,updateProfile,updateEmail,updatePassword} from "firebase/auth"
import {app} from '../../database/firebase'

const EditarDatosUs= ({navigation}) =>{
    const auth = getAuth(app);
    const user = auth.currentUser
    const headerHeight = useHeaderHeight();
    const[stiloEmail,setStiloEmail] = useState({color: 'red'})
    const[stiloNombre,setStiloNombre] = useState({color: 'red'})
    const[stiloContra,setStiloContra] = useState({color: 'red'})
    const [Datos, setDatos] = useState({ nombre:user.displayName,email:user.email, contraseña:"" })
    const [mostarContra, setmostarContra] = useState(false)
    const [errorContra,seterrorContra]= useState("")
    const [errorNombre,seterrorNombre] = useState("")
    const [errorEmail,seterrorEmail] = useState("")
 
    const [loading,setLoading] = useState(false)
        
    const onChange = (e, type) => {
        setDatos({ ...Datos, [type]: e.nativeEvent.text })
        console.log(Datos)
    }
    function validarCorreo(email) {
        
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        return re.test(email) 
    }
    function validarContra(contra){
        const regex = /^[0-9a-zA-Z\_]+$/
        return regex.test(contra) 
        

    }
    
    const validarNom=() =>{
        seterrorNombre("")
        let valido = true
        let regex = new RegExp("^[a-zA-ZÀ-ÿ ]+$");
        let letras= new RegExp("[a-zA-Z]");
        if(!letras.test(Datos.nombre)){
            setStiloNombre({color: 'red'})
            seterrorNombre("Debe llenar el nombre")
            valido=false
        }
        else{
            if(!regex.test(Datos.nombre)){
                setStiloNombre({color: 'red'})
                seterrorNombre("Ingrese solo letras en el nombre")
                valido = false
            }
        } 
        if(Datos.nombre.charAt(0) == " "){
            setStiloNombre({color: 'red'})
            seterrorNombre("el nombre no debe empezar con  espacios")
            valido = false
        }
        if(Datos.nombre.charAt(2) == " " ){
            setStiloNombre({color: 'red'})
            seterrorNombre("el nombre no debe empezar con un espacio")
            valido = false
        }
        if(Datos.nombre.length > 30){
            setStiloNombre({color: 'red'})
            seterrorNombre("El nombre no debe tener mas de 30 caracteres")
            valido = false
        }
        return valido
    }
    const validarEmail = () => {
        seterrorEmail("")
        let valido = true
        if(!validarCorreo(Datos.email)){
            setStiloEmail({color: 'red'})
            seterrorEmail("debes ingresar un correo válido")
            valido = false
        }
        return valido
    }
    const validarCont=() =>{  
        seterrorContra("")
        let valido = true
        if(size(Datos.contraseña) <= 7){
            setStiloContra({color: 'red'})
            seterrorContra("La contraseña debe tener 8 o más caracteres")
            valido = false
        }
        else{
            if(!validarContra(Datos.contraseña)){
                setStiloContra({color: 'red'})
                seterrorContra("la contraseña no debe tener caracteres especiales o espacios")
                valido = false
            }
        }
        return valido
    }

    const guardarEdit = ()=>{
        seterrorNombre("")
        seterrorContra("")
        seterrorEmail("")
        const errores = 0
        if(user.displayName != Datos.nombre || user.email != Datos.email || Datos.contraseña != ""){
            
            if( user.displayName != Datos.nombre){
                
                if(!validarNom()){
                    
                    setLoading(false)
                    return
                } 

                setLoading(true)
                updateProfile(user, {
                    displayName: Datos.nombre, 
                  }).then(() => {
                    setStiloNombre({color: 'green'})
                    seterrorNombre("Nombre actualizado correctamente")
                    setLoading(false)
                  }).catch((error) => {
                    setStiloNombre({color: 'red'})
                    seterrorNombre("Error al actualizar nombre")
                    errores = 1
                    setLoading(false)
                  });
            }
            if( user.email != Datos.email){
                if(!validarEmail()){
                    setLoading(false)
                    return
                }
                setLoading(true)
                updateEmail(user,Datos.email).then(() => {
                    setStiloEmail({color: 'green'})
                    seterrorEmail("Email actualizado correctamente")
                  }).catch(error => {
                    const errorCode = error.code;
                    setLoading(false)
                    console.log(errorCode)
                    if(errorCode == "auth/email-already-in-use"){
                       
                        setStiloEmail({color: 'red'})
                        seterrorEmail("Este correo ya ha sido registrado")
                        Alert.alert("Error al actualizar", "email ya registrado",[
                            {text: "ok"}
                             ])
                        Datos.email = auth.currentUser.email
                        errores =1
                        setLoading(false)
                        return
                    }
                    if(error.code =="auth/requires-recent-login"){
                        setLoading(false)
                        errores = 1
                        Alert.alert("Error al actualizar", "por favor vuelva a iniciar sesion para intentarlo de nuevo",[
                        {text: "ok"}
                         ])
                    navigation.navigate("Administrar Cuenta")}
                    
                  });
            }
            if(Datos.contraseña != ""){
                if(!validarCont()){
                    setLoading(false)
                    return
                }
                setLoading(true)
                updatePassword(user,Datos.contraseña).then(() => {
                    setStiloContra({color: 'green'})
                    seterrorContra("contraseña actualizado correctamente")
                    setLoading(false)
                  }).catch((error) => {
                    errores = 1
                    setLoading(false)
                    if(error.code =="auth/requires-recent-login"){Alert.alert("Error al actualizar", "por favor vuelva a iniciar sesion para intentarlo de nuevo",[
                        {text: "ok"}
                         ])
                    navigation.navigate("Administrar Cuenta")}
                  });
            }
            setLoading(false)
         if(errores == 0){
            Alert.alert("Datos Actualizados", "todo se actualizo correctamente",[
                {text: "ok"}
                 ])
            navigation.navigate("Administrar Cuenta")
           } 
            
        }
        else{
            Alert.alert("Sin cambios", "No se hizo ninguna actualizacion",[
                {text: "ok"}
                 ])
            
        }
       
       
       
    }
    return (
       
        <KeyboardAwareScrollView
         keyboardVerticalOffset={headerHeight}
         style={styles.container}
         behavior={Platform.OS === "ios" ? "padding" : null}
        >
            
            
            
             <View style={styles.container2}>
             <Text style={styles.titulo}> EDITAR DATOS DE USUARIO </Text>
             <Icon
                         type="material-community"
                         name={"account-circle-outline"}
                         iconStyle={styles.iconUser}
                         size = {90}
                         
                     />
             <Text style = {styles.text} >Nombre</Text>
             <Input style={styles.text}
                 containerStyle={styles.input}
                 
                 placeholder="Nombre de usuario"
                 onChange={(e) => onChange(e, "nombre")}
                 keyboardType="default"
                 errorMessage={errorNombre}
                 errorStyle={stiloNombre}
                 defaultValue={Datos.nombre}
             />
         <Text style = {styles.text} >Correo Electrónico</Text>
             <Input style={styles.text}
                 containerStyle={styles.input}
                 placeholder="email@address.com"
                 onChange={(e) => onChange(e, "email")}
                 keyboardType="email-address"
                 errorMessage={errorEmail}
                 errorStyle={stiloEmail}
                 defaultValue={Datos.email}
             />
         <Text style = {styles.text} >Contraseña</Text>
             <Input style={styles.text}
                 containerStyle={styles.input}
                 placeholder="Contraseña"
                 contraseña={true}
                 secureTextEntry={!mostarContra}
                 onChange={(e) => onChange(e, "contraseña")}
                 errorMessage={errorContra}
                 errorStyle={stiloContra}
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
         
             <Button
                 title="ACTUALIZAR"
                 containerStyle={styles.btnContainer}
                 buttonStyle={styles.btn}
                 onPress={()=> guardarEdit()}
             />
            <Loading isVisible={loading} text="Actualizando cuenta..."/>
         </View>
       </KeyboardAwareScrollView>
     )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001B48',
      },
    container2:{
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
    borderWidth: 4,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    color:"white",
    backgroundColor:"#001B48",
    
        

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
        color: "white"
    },
    iconUser:{
        color:"white",
        alignSelf:"center"
    },
    text:{
        color: "white",
        fontSize:20,
      
    },
    text2:{color: "black",
    fontSize:20,},
    titulo:{
        paddingTop:10,
        paddingBottom:10,
        color: "white",
        fontSize:20,
        alignSelf: "center",
    },
    overlay : {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#442484",
        borderWidth: 2,
        borderRadius: 10
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center" 
     },
});
function Loading({ isVisible, text }) {
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgoundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View style={styles.view}>
                <ActivityIndicator
                    size="large"
                    color="#442484"
                />
                {
                    text && <Text style={styles.text2}>{text}</Text>
                }
            </View>
        </Overlay>
    )
}
export default EditarDatosUs