import React,{useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons'; 


function CustomDrawerContent(props){
  
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor:"#0093B7"}}>
      <TouchableOpacity
        onPress={() => props.navigation.closeDrawer()}
        style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor:'#40AEC9',
            borderColor:'#000000' ,
            justifyContent: "center",
            left:"85%"
        }}
      >
        <AntDesign name="close" size={30} color="white" />
      </TouchableOpacity>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
export default CustomDrawerContent;