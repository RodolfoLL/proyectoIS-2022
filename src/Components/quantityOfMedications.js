
import React, { useState } from "react"
import { Button, View, TextInput, ScrollView, Text } from "react-native";
import {Picker} from '@react-native-picker/picker'
import STYLE_GROUP from "../styles/quantityOfMedicationsStyles"

const QuantityOfMedicationsScreen = () => {
    const [selectedValue, setSelectedValue] = useState("1");
    return (
        <ScrollView style={STYLE_GROUP.containerMain} >
            <View style={STYLE_GROUP.container}> 
            <View style={STYLE_GROUP.title1}>
                <Text style={STYLE_GROUP.text}>{"Dosis.-"}</Text>
            </View>
            
            <Picker
                selectedValue={selectedValue}
                style={STYLE_GROUP.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="1 Comprimido" value="1" />
                <Picker.Item label="2 Comprimido (s)" value="2" />
            </Picker>
            <View style={STYLE_GROUP.text}>
                <Text style={STYLE_GROUP.text}>{" Cantidad de \n Medicamento.-"}</Text>
            </View>
            <Picker
                selectedValue={selectedValue}
                style={STYLE_GROUP.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
            </Picker>
            </View>
            
            <View>
                
                <View style={STYLE_GROUP.button}>
                        <Button title="continuar" onPress={() => savePredicate()}/>
                </View>
            </View>
           

        </ScrollView>
    );
};

export default QuantityOfMedicationsScreen