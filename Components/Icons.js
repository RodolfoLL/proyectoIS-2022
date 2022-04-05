import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function Icon() {
    return (
      <View style={styles.icons}>
        <AntDesign name="arrowleft" size={35} color="white" onPress={() => alert('vuelta a atras')} />
      </View>
    );
}

const styles = StyleSheet.create({
    icons: {
    right:175,
    bottom:120,
    },
  });