import { useState } from "react";
import { View,StyleSheet,ActivityIndicator,Dimensions,Platform,Alert } from "react-native";
import { Input,Button,Icon,Text,Overlay } from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import{useHeaderHeight } from "@react-navigation/elements"
import { size } from "lodash";
import {getAuth,updateProfile} from "firebase/auth"
import {app} from '../../database/firebase'

const EditarDatosUs= ({navigation}) =>{
    const headerHeight = useHeaderHeight();
    const auth = getAuth(app);
    const user = auth.currentUser
    return (
       
        <KeyboardAwareScrollView
         keyboardVerticalOffset={headerHeight}
         style={styles.container}
         behavior={Platform.OS === "ios" ? "padding" : null}
        >
            
            
            
             <View style={styles.container2}>
             <Text style={styles.titulo}> REGISTRAR NUEVO USUARIO </Text>
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
                 defaultValue={Datos.nombre}
             />
         <Text style = {styles.text} >Correo Electrónico</Text>
             <Input style={styles.text}
                 containerStyle={styles.input}
                 placeholder="email@address.com"
                 onChange={(e) => onChange(e, "email")}
                 keyboardType="email-address"
                 errorMessage={errorEmail}
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
                 title="REGISTRAR"
                 containerStyle={styles.btnContainer}
                 buttonStyle={styles.btn}
                 onPress={()=> guardarUsario()}
             />
            <Loading isVisible={loading} text="Actualizando cuenta..."/>
         </View>
       </KeyboardAwareScrollView>
     )
}
const defaultFormValues = () => {
    return { nombre:user.displayName,email:user.email }
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