import React, { useEffect, useRef, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, Popover, FormControl, Icon, Divider, FlatList, VStack, HStack, Center, Heading } from 'native-base';
import { Input } from '../../components/Input';
import { Button as CButton } from '../../components/Button';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Curses, CursesProps } from '../../components/Curses';
import { Alert } from 'react-native';
import { Loanding } from '../../components/Loanding';


export function Home() {
  const navigation = useNavigation();

  const initialFocusRef = useRef(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [requiredCurseName, setRequiredCurseName] = useState(false);
  const [requiredClosing, setRequiredClosing] = useState(false);
  const [requiredCompletedHours, setRequiredCompletedHours] = useState(false);
  const [nomeCurso, setNomeCurso] = useState("");
  const [encerramento, setEncerramento] = useState("");
  const [horasComplementares, setHorasComplementares] = useState("");

  const [curses, setCurses] = useState([]);

  const handleCreateCurse = () => {
    if (!nomeCurso) {
      return setRequiredCurseName(true);
    }
    if (!horasComplementares) {
      return setRequiredCompletedHours(true);
    }
    if (!encerramento) {
      return setRequiredClosing(true);
    }
    try {
      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc()

      ref.set({
        id_curso: ref.id,
        nome_curso: nomeCurso,
        encerramento: encerramento,
        horas_complementares: horasComplementares,
        status: "open"

      });
      setShow(!show)
    } catch (error) {
      console.log(error, "Erro ao criar a identificação do usuário!")
    }
  }

  const getCurse = () => {
    setIsLoading(true);

    try {
      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')

      const subscriber = ref.onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { nome_curso, encerramento, horas_complementares, status } = doc.data();

          return {
            id_curso: doc.id,
            nome_curso,
            encerramento,
            horas_complementares,
            status
          }
        });
        setCurses(data);
        setIsLoading(false);

      });
      return subscriber;
    } catch (error) {
      console.log(error, "Erro ao pegar os dados do curso!")
    }
  }

  function openScreen(id_curso: string) {
    navigation.navigate('Atividade', { id_curso });
  }

  function handleSignOut() {
    auth()
      .signOut()
      .catch(error => {
        console.log(error);
        return Alert.alert('Sair', "Desculpe, ocorreu um erro ao sair.");
      })
  }

  useEffect(() => {
    getCurse();
    return () => {
      setCurses([]);
    }
  }, []);

  return (
    <VStack
      px={4}
      py={6}
      flex={1}
      bgColor="#E1E1E6"
    >
      
      {isLoading
        ? <Loanding />
        : <FlatList
          data={curses}
          keyExtractor={item => item.id_curso}
          renderItem={({ item }) => <Curses data={item} onPress={() => openScreen(item.id_curso)} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Center>
              <MaterialCommunityIcons name="chat-alert-outline" size={40} color="gray" />
              <Text
                color="black"
                mt={6}
                fontSize="xl"
                textAlign="center"
              >
                Você ainda não possui {'\n'}
                cursos cadastrados!
              </Text>
            </Center>
          )}
        />
      }



      <HStack w="full" justifyContent="center" alignItems="center" mt={4}>
        <Popover isOpen={show} initialFocusRef={initialFocusRef} trigger={triggerProps => {
          return (
            <Button
              {...triggerProps}
              onPress={() => setShow(!show)}
              bgColor="warning.600"
              _pressed={{
                bgColor: "warning.700"
              }}
              leftIcon={<MaterialIcons
                name='add-circle-outline'
                size={28}
                color="#efefef"
              />}
            >
              <Heading
                color="white"
                fontSize="md"
              >
                Criar Curso
              </Heading>
            </Button>
          );
        }}>
          <Popover.Content width="56">
            <Popover.Arrow bgColor="coolGray.700" />
            <Popover.CloseButton onPress={() => setShow(!show)} />
            {
              /* @ts-ignore */
            }
            <Popover.Header bgColor="coolGray.700" _text={{
              color: "#efefef"
            }}>Crie seu Curso</Popover.Header>
            <Popover.Body bgColor="coolGray.700">
              <FormControl isRequired={requiredCurseName}>
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>
                  Nome do Curso
                </FormControl.Label>
                <Input
                  placeholder='seu curso'
                  onChangeText={setNomeCurso}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="local-library" />}
                      size={5}
                      ml={2}
                      color="#efefef" />}
                />
              </FormControl>
              <FormControl mt="3" isRequired={requiredCompletedHours}>
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>
                  Horas Complementares Necessárias
                </FormControl.Label>
                <Input
                  placeholder='A cargo horária exigida'
                  onChangeText={setHorasComplementares}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="timer" />}
                      size={5}
                      ml={2}
                      color="#efefef" />}
                />
              </FormControl>
              <FormControl mt="3" isRequired={requiredClosing}>
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>
                  Encerramento do Curso
                </FormControl.Label>
                <Input
                  placeholder='O término do curso'
                  onChangeText={setEncerramento}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="timer-off" />}
                      size={5}
                      ml={2}
                      color="#efefef"
                    />
                  }
                />
              </FormControl>
            </Popover.Body>
            <Popover.Footer bgColor="coolGray.700">
              <Button.Group>
                <Button onPress={() => setShow(!show)} colorScheme="coolGray" >
                  Cancelar
                </Button>
                <Button onPress={handleCreateCurse} colorScheme="warning" >
                  Salvar
                </Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>

        <Divider orientation="vertical" bgColor={"coolGray.700"} thickness="3" mx="2" />

        <CButton
          title='Sair'
          px={8}
          bgColor="muted.600"
          _pressed={{
            bgColor: "muted.700"
          }}
          leftIcon={<MaterialIcons
            name='exit-to-app'
            size={28}
            color="#efefef" />}
          onPress={handleSignOut}
        />
      </HStack>

    </VStack>
  );
}