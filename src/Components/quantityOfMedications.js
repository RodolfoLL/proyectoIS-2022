
import React, { useState } from "react"
import { Button, View, TextInput, ScrollView, Text } from "react-native";
import { Picker } from '@react-native-picker/picker'
import STYLE_GROUP from "../styles/quantityOfMedicationsStyles"

const QuantityOfMedicationsScreen = () => {
    const [selectDose, setselectDose] = useState("1");
    const [selectQuantity, setselectQuantity] = useState("1");
    const saveDose = () =>{
    
    };
    return (
        <ScrollView style={STYLE_GROUP.containerMain} >
            <View style={STYLE_GROUP.container}>
                <View style={STYLE_GROUP.containerItem}>
                    <View style={STYLE_GROUP.title1}>
                        <Text style={STYLE_GROUP.text}>{"Dosis:"}</Text>
                    </View>
                    <View style={STYLE_GROUP.viewPicker}>
                        <Picker
                            selectedValue={selectDose}
                            style={STYLE_GROUP.picker}
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
                        >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                        </Picker>
                    </View>
                </View>


            </View>

            <View>

                <View style={STYLE_GROUP.button}>
                    <Button title="continuar" onPress={() => alert(selectDose)} />
                </View>
            </View>


        </ScrollView>
    );
};

export default QuantityOfMedicationsScreen