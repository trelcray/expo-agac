import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Button, Center, FormControl, Heading, Icon, Input, Text, VStack } from 'native-base';

export function CriarCurso() {
  const [cursoNome,setCursoNome] = useState("");
  const [cargoHoraria,setCargoHoraria] = useState("");
  const [encerramento,setEncerramento] = useState("");

  const navigation = useNavigation();

  function openScreen() {
    navigation.navigate('Home');
  }
  return (
    <Box
      safeArea
      height="full"
      bg="#E1E1E6"
    >
      <Center
        height="5/6"
        mx={6}
      >
        <Heading
          color="coolGray.700"
        >
          Crie seu curso
        </Heading>
        <FormControl
          mt={4}
        >
          <FormControl.Label>
            <Text
              color="coolGray.600"
              fontWeight={'bold'}
            >
              Nome do Curso
            </Text>
          </FormControl.Label>
          <Input
            type='text'
            placeholderTextColor="#efefef"
            bgColor="coolGray.900"
            color="#efefef"
            placeholder='seu curso'
            onChangeText={setCursoNome}
            InputLeftElement={
              <Icon as={<MaterialIcons name="local-library" />}
                size={5}
                ml={2}
                color="#efefef" />}
          />
        </FormControl>

        <FormControl mt={4}>

          <FormControl.Label >
            <Text color="coolGray.600" fontWeight={'bold'}>
              Horas Complementares nescessárias
            </Text>
          </FormControl.Label>
          <Input type='text'
            placeholder='A cargo horária exigida'
            placeholderTextColor="#efefef"
            color="#efefef"
            bgColor="coolGray.900"
            onChangeText={setCargoHoraria}
            InputLeftElement={
              <Icon as={<MaterialIcons name="timer" />}
                size={5}
                ml={2}
                color="#efefef" />}
          />

        </FormControl>
        <FormControl mt={4}>

          <FormControl.Label
            color="black"
          >
            <Text color="coolGray.600" fontWeight={'bold'}>
              Encerramento do Curso
            </Text>

          </FormControl.Label>
          <Input type='text'
            placeholderTextColor="#efefef"
            bgColor="coolGray.900"
            color="#efefef"
            placeholder='O término do curso'
            onChangeText={setEncerramento}
            InputLeftElement={
              <Icon as={<MaterialIcons name="timer-off" />}
                size={5}
                ml={2}
                color="#efefef" />}
          />

        </FormControl>
        <VStack width="full">
          <Button
            mt={8}
            leftIcon={
              <MaterialIcons
                color="#efefef"
                name="add-circle-outline"
                size={19}
              />}
            colorScheme="warning"
            onPress={openScreen}
          >
            <Text
              fontWeight="bold"
              color="#efefef"
            >
              Adicinar Curso
            </Text>
          </Button>
        </VStack>


      </Center>

    </Box>
  );
}