import React from 'react';

import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Categoria(){
  const navigation = useNavigation();
  
  function openScreen(){
    navigation.navigate('Atividade');
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center'}}>
    <Button
    title='Adicionar Categoria'
    onPress={openScreen}/>
  </View>
  );
}