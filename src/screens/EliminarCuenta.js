import { useState } from "react";
import { View,StyleSheet,ActivityIndicator,Dimensions,Platform,Alert } from "react-native";
import { Input,Button,Icon,Text,Overlay } from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import{useHeaderHeight } from "@react-navigation/elements"
import { size } from "lodash";
import {getAuth,updateProfile,updateEmail,updatePassword, deleteUser} from "firebase/auth"
import {app} from '../../database/firebase'
import { collection, query, where, getDocs ,doc, deleteDoc,updateDoc, onSnapshot} from "firebase/firestore"
import {db} from '../../database/firebase'
import { deleteUser } from "firebase/auth";

const EliminarCuenta = ({ navigation }) =>{


    const auth = getAuth(app);
    deleteUser(uid)
    .then(() => {
        console.log('elim');
    })
    .catch((error) => {
        console.log('error', error);
    });


    const user = auth.currentUser;
    const headerHeight = useHeaderHeight();

    const [mostarContra, setmostarContra] = useState(false)
    const [errorContra,seterrorContra]= useState("")
    const[stiloContra,setStiloContra] = useState({color: 'red'})
    const [Datos, setDatos] = useState({ nombre:user.displayName,email:user.email, contraseña:"" })

    const uid = user.uid;
    console.log(uid);

    const [loading,setLoading] = useState(false)
    

    
    function validarContra(contra){
        const regex = /^[0-9a-zA-Z\_]+$/
        return regex.test(contra) 
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
   
    const Eliminar = () =>{
        if(Datos.contraseña != ""){
            if(!validarCont()){
                setLoading(false)
                return
    }
    return(
        <KeyboardAwareScrollView
        keyboardVerticalOffset={headerHeight}
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
       >
           
           
           
            <View style={styles.container2}>
            <Text style={{paddingTop:10, paddingBottom:10,color: "white",fontSize:20,alignSelf: "center" }}>
                 ELIMINAR CUENTA
                  </Text>
            <Icon
                        type="material-community"
                        name={"account-circle-outline"}
                        iconStyle={styles.iconUser}
                        size = {90}
                        
                    />
                    <Text style = {styles.text} >Contraseña</Text>
             <Input style={styles.text}
                 containerStyle={styles.input}
                 placeholder="Contraseña"
                 contraseña={true}
                 secureTextEntry={!mostarContra}

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
                 title="ELIMINAR"
                 containerStyle={styles.btnContainer}
                 buttonStyle={styles.btn}
                 onPress={()=> deleteUser()}
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
});
function Loading({ isVisible, text }) {
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgoundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={{ height: 100, width: 200,backgroundColor: "#fff", borderColor: "#442484",borderWidth: 2,borderRadius: 10}}>
            <View style={{flex: 1,alignItems: "center",justifyContent: "center" }}>
                <ActivityIndicator
                    size="large"
                    color="#442484"
                />
                {
                    text && <Text style={styles.text2}>{text}</Text>
                }
            </View>
        </Overlay>
    )}
}
}¡
export default EliminarCuenta;