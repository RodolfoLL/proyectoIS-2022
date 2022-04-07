
import React, { useState } from "react"
import { Button, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from "react-native";

const QuantityOfMedicationsScreen = () => {
    const [selectDose, setselectDose] = useState("1");
    const [selectQuantity, setselectQuantity] = useState("1");
    const saveDose = () =>{
        if(selectDose != "" && selectQuantity != ""){
            var quantityField = {quantityField:
                {dose: selectDose, quantity: selectQuantity}
            };
        }
    };
    return (
        <ScrollView style={STYLE_GROUP.containerMain} >
            <View style={STYLE_GROUP.containerEncabezado}>
                        <Text style={STYLE_GROUP.encabezado} >{"Dosis Del Medicamento"}</Text>
                    </View>
            <View style={STYLE_GROUP.container}>
                <View style={STYLE_GROUP.containerItem}>
                    <View style={STYLE_GROUP.text}>
                        <Text style={STYLE_GROUP.text}>{"Dosis:"}</Text>
                    </View>
                    <View style={STYLE_GROUP.viewPicker}>
                        <Picker
                            selectedValue={selectDose}
                            // style={STYLE_GROUP.picker}
                            onValueChange={(itemValue, itemIndex) => setselectDose(itemValue)}
                        >
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="1 Comprimido" value="1" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="2 Comprimido (s)" value="2" />
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
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="1111111111111111111111111111111" value="1" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="2" value="2" />
                        </Picker>
                    </View>
                </View>


            </View>

            <View style={STYLE_GROUP.buttonContainer}>
            <View style={STYLE_GROUP.button}>
                    <Button title="CANCELAR" onPress={() => console.log("ve a casa")} />
                </View>
                <View style={STYLE_GROUP.button}>
                    <Button style= {{with:135}} title="CONTINUAR" onPress={() => saveDose()} />
                </View>
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
            width:"100%"
         },
         containerEncabezado:{
             flex:1,
             alignItems:"center",
             justifyContent:"center"
         },
        encabezado:{
            flex: 1,
            color: "#FFFFFF",
            fontSize: 30,
            paddingTop:20
        },
        container:
        {
            flex: 1,
            paddingHorizontal:20,
            paddingTop:"10%",
            paddingBottom:"30%",
            color:"#FFFFFF",
         },
         containerItem:{
             flex:1,
             marginVertical:20,
         },
        viewPicker:{
            backgroundColor: "#FFFFFF",
            borderRadius: 50,
            paddingHorizontal: 10,
            maxWidth:1000
        },
        text:
        {
            flex: 1,
            color: "#FFFFFF",
            fontSize: 25,
            marginBottom:10
        },
        picker: {
            flex: 1,
            height:60,
            color: "#000000",
            
        },
        pickerItem: {
            flex: 1,
            color: "#000000",
            fontSize:24
            
        },
        button:{
            width:135
        },
        buttonContainer:{
            flex:1,
            flexDirection:"row",
            justifyContent:"space-around"
        }
    }
);

export default QuantityOfMedicationsScreen