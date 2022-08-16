import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import { MaterialIcons } from '@expo/vector-icons';
import { Center, Box, Heading, FormControl, VStack, Icon, Image, WarningOutlineIcon, Text } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

export function Registrar() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isLoading, setIsLoanding] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [invalidSenha, setInvalidSenha] = useState(false);
  const [requiredSenha, setRequiredSenha] = useState(false);
  const [invalidConfirmar, setInvalidConfirmar] = useState(false);
  const [requiredConfirmar, setRequiredConfirmar] = useState(false);


  const novoUsuario = async () => {
    if (!email) {
      return setRequiredEmail(true);
    }
    if (/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?$/.test(email) === false) {
      return setInvalidEmail(true);
    }
    if (!senha) {
      return setRequiredSenha(true)
    }
    if (senha.length < 6) {
      return setInvalidSenha(true)
    }
    if (!confirmar) {
      return setRequiredConfirmar(true)
    }
    if (confirmar != senha) {    
      return setInvalidConfirmar(true)
    }
    setIsLoanding(true);
    try {
      await auth()
        .createUserWithEmailAndPassword(email, senha)
        .then(() => console.log('Conta', 'Conta cadastrada com sucesso!'))
    } catch (error) {
      setInvalidEmail(true);
      setInvalidSenha(true);
      setIsLoanding(false);
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

  const resetConfirmar = () => {
    setInvalidConfirmar(false)
    setRequiredConfirmar(false)
  }

  const navigation = useNavigation();

  function openScreen() {
    navigation.navigate('Login');
  }
  return (
    <Center height='full' bgColor="white">
      <Image
        size={150}
        source={{
          uri: 'http://ned.unifenas.br/landing-extensao/img/horas-atividades-complementares.png'
        }}
        alt="Logo do aplicativo"
        resizeMode='contain'
      />
      <VStack
        width="full"
        p={10}>
        <Box width="full">

          <Center>
            <Heading color="coolGray.700">
              Registrar
            </Heading>
          </Center>

          <FormControl isRequired={requiredEmail} isInvalid={invalidEmail}>
            <FormControl.Label>
              <Text
                color="coolGray.600"
                fontWeight={'bold'}
              >
                E-mail
              </Text>
            </FormControl.Label>
            <Input
              placeholder='seu@email.com'
              onChangeText={setEmail}
              onPressIn={resetEmail}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml={2}
                  color="#efefef"
                />

              }
            />
            <FormControl.ErrorMessage
              leftIcon={
                <WarningOutlineIcon
                  size="xs"
                />}>
              E-mail Inválido
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired={requiredSenha} isInvalid={invalidSenha}>
            <FormControl.Label>
              <Text
                color="coolGray.600"
                fontWeight={'bold'}
              >
                Senha
              </Text>
            </FormControl.Label>
            <Input
              secureTextEntry
              placeholder='sua senha'
              onChangeText={setSenha}
              onPressIn={resetSenha}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={5}
                  ml={2}
                  color="#efefef"
                />

              }
            />
            <FormControl.ErrorMessage
              leftIcon={
                <WarningOutlineIcon
                  size="xs"
                />}>
              Senha Inválida
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired={requiredConfirmar} isInvalid={invalidConfirmar}>
            <FormControl.Label>
              <Text
                color="coolGray.600"
                fontWeight={'bold'}
              >
                Confirmar Senha
              </Text>
            </FormControl.Label>
            <Input
              secureTextEntry
              placeholder='confirmar sua senha'
              onChangeText={setConfirmar}
              onPressIn={resetConfirmar}
              InputLeftElement={
                <Icon
                  as={
                    <MaterialIcons
                      name="lock"
                    />}
                  size={5}
                  ml={2}
                  color="#efefef"
                />

              }
            />
            <FormControl.ErrorMessage
              leftIcon={
                <WarningOutlineIcon
                  size="xs"
                />}>
              Senhas incompatíveis
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            title='Criar Conta'
            mt="7"
            isLoading={isLoading}
            bgColor="warning.500"
            _pressed={{
              bgColor: "warning.600"
            }}
            onPress={novoUsuario}
          />

          <Button
            title='Já possuo uma conta'
            mt="7"
            bgColor="gray.500"
            _pressed={{
              bgColor: "gray.600"
            }}
            onPress={openScreen}
          />


        </Box>
      </VStack>
      <Modal/>
    </Center>
  );
}