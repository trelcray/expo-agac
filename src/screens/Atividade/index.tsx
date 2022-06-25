import React from 'react';

import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Atividade(){
  const navigation = useNavigation();
  
  function openScreen(){
    navigation.navigate('Categoria');
  }
  function openScreen2(){
    navigation.navigate('CriarAtividade');
  }
  function openScreen3(){
    navigation.navigate('Execucao');
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'purple', justifyContent: 'center'}}>
    <Button
    title='Criar Categoria'
    onPress={openScreen}/>
    <Button
    title='Criar Atividade'
    onPress={openScreen2}/>
    <Button
    title='Execução das atividades'
    onPress={openScreen3}/>
  </View>
  );
}