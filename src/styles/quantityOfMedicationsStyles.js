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
              paddingLeft: 10,
              fontSize:50
        },
        text:
        {
            flex: 1,
            alignItems: "flex-start",
            color: "#FFFFFF",
            fontSize: 28,
            marginBottom:10
        },
        picker: {
            flex: 1,
            height:50,
            color: "#000000",
            
        },
        button:{
            marginHorizontal:20,
        }
    }
);


export default STYLE_GROUP