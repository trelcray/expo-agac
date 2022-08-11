import React, { useRef, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, Popover, FormControl, Icon, Divider, FlatList, VStack, HStack, Center, Heading } from 'native-base';
import { Input } from '../../components/Input';
import { Button as CButton} from '../../components/Button';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Curses, CursesProps } from '../../components/Curses';


export function Home() {
  const navigation = useNavigation();

  const initialFocusRef = useRef(null);
  const [show, setShow] = useState(false);
  const [curses, setCurses] = useState<CursesProps[]>([{
    id_curso: "123",
    nome_curso: "Tecnologia em análise e desenvolvimento de sistemas",
    encerramento: "20/02/2022 ás 15:30",
    horas_complementares: 230,
    status: 'open'
  },
  {
    id_curso: "124",
    nome_curso: "Tecnologia em análise e desenvolvimento de sistemas",
    encerramento: "20/02/2022 ás 15:30",
    horas_complementares: 230,
    status: 'closed'
  }]);

  function openScreen() {
    navigation.navigate('Atividade');
  }

  function handleSignOut() {
    auth().signOut();
  }

  return (
    <VStack
      px={4}
      py={6}
      flex={1}
      bgColor="#E1E1E6"
    >

      <FlatList
        data={curses}
        keyExtractor={item => item.id_curso}
        renderItem={({ item }) => <Curses data={item} onPress={openScreen} />}
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
              <FormControl>
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>
                  Nome do Aluno
                </FormControl.Label>
                <Input
                  placeholder='Digite seu Nome'
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="person" />}
                      size={5}
                      ml={2}
                      color="#efefef" />}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>
                  Nome do Curso
                </FormControl.Label>
                <Input
                  placeholder='seu curso'
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="local-library" />}
                      size={5}
                      ml={2}
                      color="#efefef" />}
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>
                  Horas Complementares Necessárias
                </FormControl.Label>
                <Input
                  placeholder='A cargo horária exigida'
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="timer" />}
                      size={5}
                      ml={2}
                      color="#efefef" />}
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>
                  Encerramento do Curso
                </FormControl.Label>
                <Input
                  placeholder='O término do curso'
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
                <Button onPress={() => setShow(!show)} colorScheme="warning" >
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