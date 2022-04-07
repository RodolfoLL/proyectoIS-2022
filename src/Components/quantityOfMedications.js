
import React, { useState } from "react"
import { Button, View, ScrollView, Text } from "react-native";
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
                            <Picker.Item label="1 Comprimido" value="1" />
                            <Picker.Item label="2 Comprimido (s)" value="2" />
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
                            <Picker.Item style={{fontSize: 30}} label="1111111111111111111111111111111" value="1" />
                            <Picker.Item label="2" value="2" />
                        </Picker>
                    </View>
                </View>


            </View>

            <View>
            <View style={STYLE_GROUP.button}>
                    <Button title="obtener" onPress={() => console.log("ve a casa")} />
                </View>
                <View style={STYLE_GROUP.button}>
                    <Button title="guardar" onPress={() => saveDose()} />
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
             
         },
        container:
        {
            flex: 1,
            paddingHorizontal:20,
            justifyContent:"space-between",
            paddingVertical:"30%",
            color:"#FFFFFF",
         },
         containerItem:{
             flex:1,
             marginVertical:20
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
            alignItems: "flex-start",
            color: "#FFFFFF",
            fontSize: 25,
            marginBottom:10
        },
        picker: {
            flex:1,
            height:"100%",
            color: "#000000",
            transform: [{scaleX: 1.2}, {scaleY: 1.2}],
            left:25,
            width:"90%"
        },
        button:{
            marginHorizontal:20,
        }
    }
);

export default QuantityOfMedicationsScreen