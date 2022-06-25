import React from 'react';

import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function CriarCurso(){
  const navigation = useNavigation();
  
  function openScreen(){
    navigation.navigate('Home');
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'grey', justifyContent: 'center'}}>
    <Button
    title='Adicionar Curso'
    onPress={openScreen}/>
  </View>
  );
}