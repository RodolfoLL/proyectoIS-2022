
import React, { useState } from "react"
import { Button, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from "react-native";

const DosisEdit = ({route, navigation }) => {
    const parametros  = route.params
    console.log(parametros)
    const [selectDose, setselectDose] = useState(parametros.dose);
    const [selectQuantity, setselectQuantity] = useState(parametros.quantity);

    const guardarCantidad = () => {
        if (selectDose != "" && selectQuantity != "") {
      
            var quantityField = {
                quantityField:
                    { dose: selectDose, quantity: selectQuantity }
            };
            navigation.navigate("Frecuencia Dosis", {
            id: parametros.id,
            nombreMed:parametros.nombreMed,
            tipoAdm: parametros.tipoAdm,
            dose: selectDose,
            quantity:selectQuantity,
            item: parametros.item,
            hora: parametros.hora,
            duracion: parametros.duracion,
            editar:true
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
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="1 Comprimido" value="1" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="2 Comprimido (s)" value="2" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="3 Comprimido" value="3" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="4 Comprimido (s)" value="4" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="5 Comprimido" value="5" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="6 Comprimido (s)" value="6" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="7 Comprimido" value="7" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="8 Comprimido (s)" value="8" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="9 Comprimido" value="9" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="10 Comprimido (s)" value="10" />
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
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="1" value="1" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="2" value="2" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="3" value="3" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="4" value="4" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="5" value="5" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="6" value="6" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="7" value="7" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="8" value="8" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="9" value="9" />
                            <Picker.Item style={STYLE_GROUP.pickerItem} label="10" value="10" />
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

export default DosisEdit