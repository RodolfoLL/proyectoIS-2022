
import React, { useState } from "react"
import { Button, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from "react-native";
function generarArregloDosis(name) {
    let arreglo = []
    for (let i = 1; i <= 10; i++) {
        if (i == 1) {
            arreglo.push(i + " " + name);
        } else {
            let ultimaPos = name.length - 1
            if (ultimaPos != -1) {
                const vocales = ["a", "e", "i", "o", "u"];
                if (vocales.indexOf(name[ultimaPos]) === -1) {
                    arreglo.push(i + " " + name + " (es)");
                } else {
                    arreglo.push(i + " " + name + " (s)");
                }
            }

        }

    }
    return arreglo;
}


const DosisEdit = ({route, navigation }) => {
    const parametros  = route.params
    console.log(parametros)
    const [selectDose, setselectDose] = useState(parametros.dose);
    const [selectQuantity, setselectQuantity] = useState(parametros.quantity);
    let { tipoAdm } = route.params;
    let tipoDosis = route.params.dose
    if (tipoAdm == "Via Oral") { tipoDosis = "Comprimido"; }
    if (tipoAdm == "Via Intramuscular" ||
        tipoAdm == "Via Parenteral") { tipoDosis = "Inyección"; }
    if (tipoAdm == "Via Inalatoria") { tipoDosis = "Inhalación"; }
    if (tipoAdm == "Via Nasal") { tipoDosis = "Aerosol"; }
    if (tipoAdm == "Via Topica") { tipoDosis = "Aplicación"; }
    if (tipoAdm == "Via Oftalmogica") { tipoDosis = "Gota"; }
    let arregloItemDosis = generarArregloDosis(tipoDosis)
    let arregloCantidadMed = new Array(10)
    arregloCantidadMed.fill(2, 0, 10);
    const guardarCantidad = () => {
        if (selectDose != "" && selectQuantity != "") {
      
            var quantityField = {
                quantityField:
                    { dose: selectDose, quantity: selectQuantity }
            };
            navigation.navigate("Frecuencia Dosis", {
            uid: parametros.uid,
            id: parametros.id,
            nombreMed:parametros.nombreMed,
            tipoAdm: parametros.tipoAdm,
            dose: selectDose,
            quantity:selectQuantity,
            item: parametros.item,
            hora: parametros.hora,
            duracion: parametros.duracion,
            editar: true
            })
        }
    };
    return (
        <ScrollView style={STYLE_GROUP.containerMain} >
            <View style={STYLE_GROUP.container}>
                <View style={STYLE_GROUP.containerItem}>
                    <View style={STYLE_GROUP.text}>
                        <Text style={STYLE_GROUP.text}>{'Dosis:'}</Text>
                    </View>
                    <View style={STYLE_GROUP.viewPicker}>
                        <Picker
                            selectedValue={selectDose}
                            style={STYLE_GROUP.picker}
                            onValueChange={(itemValue) => setselectDose(itemValue)}
                        >
                            {
                                arregloItemDosis.map((item, key) => {
                                    return (<Picker.Item
                                        key={key}
                                        style={STYLE_GROUP.pickerItem}
                                        label={item}
                                        value={key + 1} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>

                <View style={STYLE_GROUP.containerItem}>
                    <View>
                        <Text style={STYLE_GROUP.text}>{' Cantidad de Medicamentos:'}</Text>
                    </View>
                    <View style={STYLE_GROUP.viewPicker}>
                        <Picker
                            selectedValue={selectQuantity}
                            style={STYLE_GROUP.picker}
                            onValueChange={(itemValue, itemIndex) => setselectQuantity(itemValue)}
                            textStyle={{ fontSize: 60 }}
                        >
                            {
                                arregloCantidadMed.map((item, key) => {
                                    return (<Picker.Item
                                        key={key}
                                        style={STYLE_GROUP.pickerItem}
                                        label={'' + (key + 1)}
                                        value={key + 1} />)
                                })
                            }
                        </Picker>
                    </View>
                </View>


            </View>
            <TouchableOpacity
                    onPress={()=>guardarCantidad()}
                >
                    <View style={STYLE_GROUP.button}>
                        <Text style={STYLE_GROUP.texto}>Continuar</Text>
                    </View>
                </TouchableOpacity>
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
        button:{
            alignSelf:'center',
            backgroundColor:'#0093B7',
            borderRadius:25,
            width:150,
            height:35,
        },
        texto:{
            color:'white',
            fontFamily:'sans-serif',
            fontSize:20,
            textAlign:'center'  
        },

    }
);

export default DosisEdit