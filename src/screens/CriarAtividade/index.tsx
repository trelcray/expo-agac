import React from 'react';

import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function CriarAtividade(){
  const navigation = useNavigation();
  
  function openScreen(){
    navigation.navigate('Atividade');
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center'}}>
    <Button
    title='Adicionar Atividade'
    onPress={openScreen}/>
  </View>
  );
}