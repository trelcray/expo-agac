import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Center, Box, Heading, FormControl,
  VStack, Icon, Checkbox, WarningOutlineIcon,
  Image, HStack, Text
} from "native-base";
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Loanding } from '../../components/Loanding';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isLoading, setIsLoanding] = useState(false);
  const [loading, setLoanding] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [invalidSenha, setInvalidSenha] = useState(false);
  const [requiredSenha, setRequiredSenha] = useState(false);

  GoogleSignin.configure({
    webClientId: '36498256399-v5he494sfo8n0g0i2qio5smgdjf65jn4.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }


  const logar = async () => {
    if (!email) {
      return setRequiredEmail(true);
    }
    if (!senha) {
      return setRequiredSenha(true);
    }
    setIsLoanding(true);
    try {
      await auth()
        .signInWithEmailAndPassword(email, senha)
        setLoanding(true); // fazer o if caso tenha o nome cadastrado aki
    } catch (error) {
      setInvalidEmail(true);
      setInvalidSenha(true);
      setIsLoanding(false);
    }
  }

  if (loading) {
    return <Loanding />
}

  const recuperarSenha = async () => {
    if (!email) {
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
    <Box>
      <Center height='full' bgColor={'#fff'}>
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
            <Center>
              <Heading color="coolGray.700">
                Entrar
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
                    as={
                      <MaterialIcons
                        name="person"
                      />}
                    size={5}
                    ml={2}
                    color="#efefef"
                  />}
              />

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
                placeholder='sua senha'
                secureTextEntry
                onChangeText={setSenha}
                onPressIn={resetSenha}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons
                      name="lock"
                    />}
                    size={5}
                    ml={2}
                    color="#efefef"
                  />}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                E-mail ou Senha Inválidos
              </FormControl.ErrorMessage>

            </FormControl>

            <FormControl>

              <Checkbox id='checkbox' isChecked value='agree' isDisabled
                mt={5}>
                Concordo com a politica de segurança
              </Checkbox>

            </FormControl>



            <Button
              title='Entrar'
              mt="7"
              bgColor="warning.500"
              isLoading={isLoading}
              onPress={logar}
              _pressed={{
                bgColor: "warning.600"
              }}
            />
            <Button
              leftIcon={<MaterialCommunityIcons name="google" size={24} color="white" />}
              title="Entrar com Google"
              mt={5}
              bgColor="gray.500"
              _pressed={{
                bgColor: "gray.600"
              }}
              onPress={() => onGoogleButtonPress()}
            />

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
    </Box>
  );
}