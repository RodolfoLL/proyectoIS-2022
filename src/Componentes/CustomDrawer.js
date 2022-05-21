import React,{useEffect} from 'react';
import {
  Image,
  ImageBackground,
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
    <View style={{flex:1}}>
    <DrawerContentScrollView {...props} style ={{backgroundColor:"#0093B7"}}contentContainerStyle={{backgroundColor:"#0093B7"}}>
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
      <ImageBackground
          // source={require('../assets/images/menu-bg.jpeg')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/medicate.png')}
            style={{height: 150, width: 150, borderRadius: 40, marginBottom: 10,marginLeft:"17%"}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
              fontWeight: 'bold',
              marginBottom: 5,
              marginLeft:"22%"
            }}>
            MEDICATE
          </Text>
        </ImageBackground>

      <View style={{flex: 1, backgroundColor: '#0093B7', paddingTop: 10}}>
          <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
    </View>
  );
}
export default CustomDrawerContent;