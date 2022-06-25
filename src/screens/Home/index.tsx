import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export function Home(){
  const navigation = useNavigation();
  
  function openScreen(){
    navigation.navigate('CriarCurso');
  }
  
  function openScreen2(){
    navigation.navigate('Atividade');
  }
  function handleSignOut(){
    auth().signOut();
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center'}}>
      <Button
      title='Criar Curso'
      onPress={openScreen}/>
      <Button
      title='ir para atividades'
      onPress={openScreen2}/>
      <Button
      title='Sair'
      onPress={handleSignOut}/>
    </View>
  );
}