import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

const HomeScreen = ({navigation}) => {

    return (
        <ScrollView>
            <View style={{
                    fontSize: 30,
                    alignItems: "center",
                    marginTop: "20%"
                }}>
            <TouchableOpacity
                    onPress={() => navigation.navigate("Screen2")}
                    style={{
                        backgroundColor: "#FFC300",
                        width: 30,
                        height: 30,
                        borderRadius: 10,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            color: "white",
                        }}
                    >+</Text>
                </TouchableOpacity>
            </View>
           
        </ScrollView>
    );
    }

export default HomeScreen;
