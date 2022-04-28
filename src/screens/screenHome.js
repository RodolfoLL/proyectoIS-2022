import { View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import { UserContext } from "./ScreenContext";

const HomeScreen = (navigation) => {
    const {name} = UserContext.Consumer.props;
    console.log(HomeScreen.context);
    return (
        <ScrollView style={{backgroundColor:'#001B48'}}>
            <View style={{
                    fontSize: 30,
                    alignItems: "center",
                    marginTop: "20%"
                }}>
            <Text style={{fontSize:50,fontFamily:'Serif',color:'white'}}>
                MEDICATE
            </Text>
            <Text style={{textAlign:'center',fontFamily:'Arial',margin:20,color:'white'}}>
                Aplicacion para el recordatorio de medicamentos
                para nuestros adultos mayores porque merecen ser ayudados
                {name}
            </Text>

            <TouchableOpacity
                    onPress={() => navigation.navigate("Screen2")}
                    style={{
                        backgroundColor: "#0093B7",
                        width: 150,
                        height: 70,
                        borderRadius: 5,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            color: "white",
                            width:150
                        }}
                    >Añadir recordatorio</Text>
                </TouchableOpacity>
            </View>
           
        </ScrollView>
    );
    }

export default HomeScreen;
