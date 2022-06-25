import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import { MaterialIcons } from '@expo/vector-icons';
import {
  Center, Box, Heading, Input, FormControl,
  VStack, Icon, Button, Checkbox, WarningOutlineIcon,
  Image, HStack, Text
} from "native-base";

import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [invalidSenha, setInvalidSenha] = useState(false);
  const [requiredSenha, setRequiredSenha] = useState(false);
  const [check, setCheck] = useState(false);
  const [invalidCheck, setInvalidCheck] = useState(false);


  const logar = async () => {
    if (check == false) {
      setInvalidCheck(true)
      return setTimeout(() => setInvalidCheck(false), 5000);
    }
    if (email == "") {
      return setRequiredEmail(true)
    }
    if (senha == "") {
      return setRequiredSenha(true)
    }
    try {
      await auth().signInWithEmailAndPassword(email, senha)
    } catch (error) {
      setInvalidEmail(true)
      setInvalidSenha(true)
    }
  }

  const recuperarSenha = async () => {
    if (email == ""){
      return Alert.alert("Recuperar senha", "É necessário preencher o campo e-mail para recuperar sua senha!")
    }

    try {
      await auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert("Redefinir senha", "Enviamos um e-mail para você"))
    } catch (error) {
      Alert.alert("Desculpe, ocorreu um erro", "Verifique se o campo e-mail está preenchido com um e-mail válido")
    }
  }

  const resetEmail = () => {
    setInvalidEmail(false)
    setRequiredEmail(false)
  }

  const resetSenha = () => {
    setInvalidSenha(false)
    setRequiredSenha(false)
  }


  const navigation = useNavigation();

  function openScreen() {
    navigation.navigate('Registrar');
  }

  return (
    <Center height='full'>
      <Image
        size={150}
        source={{ uri: 'http://ned.unifenas.br/landing-extensao/img/horas-atividades-complementares.png' }}
        alt="Logo do aplicativo"
        resizeMode='contain'
      />
      <VStack
        width="full"
        p={10}>
        <Box width="full">

          <Heading color="coolGray.700">
            Entrar
          </Heading>

          <FormControl isRequired={requiredEmail} isInvalid={invalidEmail}>

            <FormControl.Label> E-mail </FormControl.Label>
            <Input type='text'
              placeholder='seu@email.com'
              onChangeText={setEmail}
              onPressIn={resetEmail}
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />}
                  size={5}
                  ml={2}
                  color="muted.400" />} />

          </FormControl>

          <FormControl isRequired={requiredSenha} isInvalid={invalidSenha}>

            <FormControl.Label> Senha </FormControl.Label>
            <Input type='password'
              placeholder='sua senha'
              onChangeText={setSenha}
              onPressIn={resetSenha}
              InputLeftElement={<Icon as={<MaterialIcons name="lock" />}
                size={5}
                ml={2}
                color="muted.400" />} />

            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              E-mail ou Senha Inválidos
            </FormControl.ErrorMessage>

          </FormControl>

          <FormControl isInvalid={invalidCheck}>

            <Checkbox id='checkbox' value='agree' onChange={setCheck}
              mt={5}>
              Concordo com a politica de segurança
            </Checkbox>

            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Aceite os termos de uso!
            </FormControl.ErrorMessage>

          </FormControl>



          <Button
            mt="7"
            colorScheme="warning"
            onPress={logar}>Entrar</Button>

        </Box>
      </VStack>
<Box display="flex" flexDirection="row" justifyContent="space-between" width="full" pr={10} pl={10} >
        
          <TouchableOpacity onPress={openScreen}>
          <HStack>
          <Icon as={<MaterialIcons name="person-add" />}
            size={6}
            mb={0.5}
            mr={1}
            color="muted.700" />

          <Text bold mt={0.4} >
            Crie sua conta
          </Text>
          </HStack>
          </TouchableOpacity>
       
        <TouchableOpacity onPress={recuperarSenha} >
        <HStack>
          <Icon as={<MaterialIcons name="mail" />}
            size={6}
            mb={0.5}
            mr={1}
            color="muted.700" />

          <Text bold mt={0.4}>
            Recuperar senha
          </Text>
        </HStack>
        </TouchableOpacity>

      </Box>

    </Center>
  );
}