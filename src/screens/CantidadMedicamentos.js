
import React, { useState } from "react"
import { Button, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from "react-native";

 function generarArregloDosis(name){
    let arreglo =[]
    for(let i=1;i<=10;i++){
        if(i==0){
            arreglo.push(i+" "+name);
        }else{
            arreglo.push(i+" "+name+" (s)");    
        }
        
    }
    return arreglo;
 }
const CantidadMedicamentos = ({route, navigation }) => {
    const arregloItemDosis = generarArregloDosis("Comprimido")
    const [selectDose, setselectDose] = useState("1");
    const [selectQuantity, setselectQuantity] = useState("1");
    let {nombreMed,tipoAdm} = route.params;
    const guardarCantidad = () => {
        if (selectDose != "" && selectQuantity != "") {
            var quantityField = {
                quantityField:
                    { dose: selectDose, quantity: selectQuantity }
            };
            // console.log(generarArregloDosis("Comprimido"))
            navigation.navigate("Frecuencia Dosis", {
                nombreMed: nombreMed,
                tipoAdm: tipoAdm,
                dose: selectDose,
                quantity: selectQuantity
            })
        }
    };
    return (
        <ScrollView style={STYLE_GROUP.containerMain} >
            <View style={STYLE_GROUP.container}>
                <View style={STYLE_GROUP.containerItem}>
                    <View style={STYLE_GROUP.text}>
                        <Text style={STYLE_GROUP.text}>{"Dosis:"}</Text>
                    </View>
                    <View style={STYLE_GROUP.viewPicker}>
                        <Picker
                            selectedValue={selectDose}
                            style={STYLE_GROUP.picker}
                            onValueChange={(itemValue, itemIndex) => setselectDose(itemValue)}
                        >
                            {arregloItemDosis.map((item, key) =>{
                                return(<Picker.Item key={key} style={STYLE_GROUP.pickerItem} label={item} value={key+1} />)

                            })}
                        </Picker>
                    </View>
                </View>

                <View style={STYLE_GROUP.containerItem}>
                    <View>
                        <Text style={STYLE_GROUP.text}>{" Cantidad de Medicamentos:"}</Text>
                    </View>
                    <View style={STYLE_GROUP.viewPicker}>
                        <Picker
                            selectedValue={selectQuantity}
                            style={STYLE_GROUP.picker}
                            onValueChange={(itemValue, itemIndex) => setselectQuantity(itemValue)}
                            textStyle={{ fontSize: 60 }}
                        >
                            {arregloItemDosis.map((item, key) =>{
                                return(<Picker.Item key={key} style={STYLE_GROUP.pickerItem} label={""+(key+1)} value={key+1} />)
                            })}
                        </Picker>
                    </View>
                </View>


            </View>
            <View style={STYLE_GROUP.button}>
                <Button title="CONTINUAR" onPress={() => guardarCantidad()} />
            </View>




        </ScrollView>
    );
};

const STYLE_GROUP = StyleSheet.create(
    {
        containerMain:
        {
            flex: 1,
            backgroundColor: "#001B48",
            width: "100%"
        },
        containerEncabezado: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        container:
        {
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: "10%",
            paddingBottom: "30%",
            color: "#FFFFFF",
        },
        containerItem: {
            flex: 1,
            marginVertical: 20,
        },
        viewPicker: {
            backgroundColor: "#FFFFFF",
            borderRadius: 50,
            paddingHorizontal: 10,
            maxWidth: 1000
        },
        text:
        {
            flex: 1,
            color: "#FFFFFF",
            fontSize: 25,
            marginBottom: 10
        },
        picker: {
            flex: 1,
            height: 50,
            color: "#000000",

        },
        pickerItem: {
            flex: 1,
            color: "#000000",
            fontSize: 24

        },
        button: {
            marginTop: "20%",
            marginHorizontal: "13%"
        },
    }
);

export default CantidadMedicamentos