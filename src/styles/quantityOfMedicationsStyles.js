import { StyleSheet } from "react-native";

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
            color:"#FFFFFF",
         },
        viewPicker:{
            backgroundColor:"#C4C4C4", 
            borderRadius:50,paddingLeft:20
        },
        text:
        {
            flex: 1,
            alignItems: "flex-start",
            color: "#FFFFFF",
            fontSize: 28,
        },
        picker: {
            flex: 1,
            height:50,
            fontSize: 22,borderRadius:50,paddingLeft:20
            
        },
        button:{
            borderRadius:100,
            marginHorizontal:20,
            backgroundColor: "#FFFFFF"
        }
    }
);


export default STYLE_GROUP