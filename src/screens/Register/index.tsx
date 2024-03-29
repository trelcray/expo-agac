import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { Center, Box, Heading, FormControl, VStack, Icon, Image, WarningOutlineIcon, Text } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isLoading, setIsLoanding] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [requiredPassword, setRequiredPassword] = useState(false);
  const [invalidConfirm, setInvalidConfirm] = useState(false);
  const [requiredConfirm, setRequiredConfirm] = useState(false);
  const [name, setName] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [requiredName, setRequiredName] = useState(false);


  const handleCreateUser = async () => {
    if (!name) {
      return setRequiredName(true);
    }
    if (/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)+$/.test(name) === false) {
      return setInvalidName(true);
    }
    if (!email) {
      return setRequiredEmail(true);
    }
    if (/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?$/.test(email) === false) {
      return setInvalidEmail(true);
    }
    if (!password) {
      return setRequiredPassword(true)
    }
    if (password.length < 6) {
      return setInvalidPassword(true)
    }
    if (!confirm) {
      return setRequiredConfirm(true)
    }
    if (confirm != password) {
      return setInvalidConfirm(true)
    }
    setIsLoanding(true);
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const reference = firestore()
            .collection("usuario")
            .doc(auth().currentUser.uid);
          reference.set({
            email: email,
            nome: name,
          })
        })
    } catch (error) {
      setInvalidEmail(true);
      setInvalidPassword(true);
      setIsLoanding(false);
    }

  }

  const resetEmail = () => {
    setInvalidEmail(false)
    setRequiredEmail(false)
  }

  const resetPassword = () => {
    setInvalidPassword(false)
    setRequiredPassword(false)
  }

  const resetConfirm = () => {
    setInvalidConfirm(false)
    setRequiredConfirm(false)
  }

  const resetName = () => {
    setInvalidName(false)
    setRequiredName(false)
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

          <FormControl isRequired={requiredName} isInvalid={invalidName}>
            <FormControl.Label>
              <Text
                color="coolGray.600"
                fontWeight={'bold'}
              >
                Nome Completo
              </Text>
            </FormControl.Label>

            <Input
              placeholder='Informe seu nome completo'
              onPressIn={resetName}
              onChangeText={setName}
            />

            <FormControl.ErrorMessage
              leftIcon={
                <WarningOutlineIcon
                  size="xs"
                />}>
              Nome completo Inválido
            </FormControl.ErrorMessage>
          </FormControl>

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
          <FormControl isRequired={requiredPassword} isInvalid={invalidPassword}>
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
              onChangeText={setPassword}
              onPressIn={resetPassword}
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
              Senha inferior a 6 dígitos
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired={requiredConfirm} isInvalid={invalidConfirm}>
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
              onChangeText={setConfirm}
              onPressIn={resetConfirm}
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
            onPress={handleCreateUser}
          />

          <Button
            title='Já possuo uma conta'
            mt="5"
            bgColor="gray.500"
            _pressed={{
              bgColor: "gray.600"
            }}
            onPress={openScreen}
          />


        </Box>
      </VStack>
    </Center>
  );
}