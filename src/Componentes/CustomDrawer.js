import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons'; 


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor:"#0093B7"}}>
      <TouchableOpacity
        onPress={() => props.navigation.closeDrawer()}
      >
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  );
}
export default CustomDrawerContent;