import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Button, Box, Text, Popover, FormControl, Icon, Divider, Center, HStack, FlatList, Heading } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from '../../components/Input';
import { VictoryPie } from 'victory-native';
import { Filters } from '../../components/Filters';
import { Activities, CategoriesProps } from '../../components/Activities';

type RouteParams = {
  id_curso: string;
}

export function Atividade() {
  const navigation = useNavigation();

  const route = useRoute();
  const { id_curso } = route.params as RouteParams;

  const initialFocusRef = useRef(null);

  const [nomeCategoria, setNomeCategoria] = useState("");
  const [horasMax, setHorasMax] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">("open");
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  const handleCreateCategories = () => {
    const ref = firestore()
      .collection('usuario')
      .doc(auth().currentUser.uid)
      .collection('curso')
      .doc(id_curso)
      .collection('categoria')
      .doc()

    ref.set({
      id_categoria: ref.id,
      nome_categoria: nomeCategoria,
      horas_max: horasMax,
      descricao: description,
      status: "open"
    });
    setShow(!show)
  }

  const getCategories = () => {
    setIsLoading(true);

    try {
      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)
        .collection('categoria')

      const subscriber = ref.onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { id_categoria, nome_categoria, horas_max, descricao, status } = doc.data();

          return {
            id_categoria,
            nome_categoria,
            horas_max,
            descricao,
            status
          }
        });
        setCategories(data);
        setIsLoading(false);

      });
      return subscriber;

    } catch (error) {
      console.log(error, "Erro ao pegar os dados da categoria!")
    }
  }


  function openScreen(id_categoria: string, id_curso: string) {
    navigation.navigate('Details', { id_categoria, id_curso });
  }

  function openScreen2() {
    navigation.navigate('Relatorio');
  }

  useEffect(() => {
    getCategories();
    return () => {
      setCategories([]);
    }
  }, []);

  return (
    <Box
      py={6}
      px={4}
      height="full"
      bgColor="#E1E1E6"
    >
      <HStack space={3} mb={8}>
        <Filters
          title='Atividades'
          type='open'
          onPress={() => setStatusSelected("open")}
          isActive={statusSelected === "open"}
        />

        <Filters
          title='Relatório'
          type='closed'
          onPress={() => setStatusSelected("closed")}
          isActive={statusSelected === "closed"}
        />
      </HStack>
      <Center>
        <Text fontSize="xl" fontWeight={800}>Gráfico de atividades completas</Text>
      </Center>

      <VictoryPie
        colorScale={[
          "black",
          "#525252",
          "#a3a3a3",
          "#d4d4d4",
          "#e7e7f7",
          "#d4d4d4",
          "#a3a3a3",
          "#525252"
        ]}
        height={250}
        padAngle={3}
        animate={{
          easing: "bounce"
        }}
        data={[
          { x: "Participação em Eventos", y: 20 },
          { x: "Cursos", y: 40 },
          { x: "Curso Longo", y: 55 },
          { x: "incompleto", y: 29 },
          { x: "indefinido", y: 5 },
          { x: "visita", y: 29 },
        ]}
        innerRadius={45}
        style={{
          labels: {
            fontWeight: 800,
            fontSize: 10
          }
        }}
      />

      <FlatList
        data={categories}
        keyExtractor={item => item.id_categoria}
        renderItem={({ item }) => <Activities data={item} onPress={() => openScreen(item.id_categoria, item.id_categoria)} />}
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
              atividades cadastrados!
            </Text>
          </Center>
        )}
      />


      <HStack alignItems="center" justifyContent="center" mt={6}>
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
                Criar Categoria
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
                  Nome do Categoria
                </FormControl.Label>
                <Input
                  placeholder='Nome da categoria'
                  onChangeText={setNomeCategoria}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="category" />}
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
                  Cargo Horária maxima da categoria
                </FormControl.Label>
                <Input
                  placeholder='O limite de Horas'
                  onChangeText={setHorasMax}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="timer-off" />}
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
                  Descrição da Categoria
                </FormControl.Label>
                <Input
                  placeholder='Critérios da categoria'
                  onChangeText={setDescription}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="description" />}
                      size={5}
                      ml={2}
                      color="#efefef" />}
                />
              </FormControl>

            </Popover.Body>
            <Popover.Footer bgColor="coolGray.700">
              <Button.Group>
                <Button
                  onPress={() => setShow(!show)}
                  colorScheme="coolGray"
                >
                  Cancelar
                </Button>
                <Button
                  onPress={handleCreateCategories}
                  colorScheme="warning"
                >
                  Salvar
                </Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>

        <Divider orientation="vertical" bgColor={"coolGray.700"} thickness="3" mx="2" />

        <Button
          py={2.5}
          px={8}
          colorScheme="muted"
          leftIcon={<MaterialIcons
            name='list-alt'
            size={28}
            color="#efefef" />}
          onPress={openScreen2}
        >
          Relatório
        </Button>


      </HStack>
    </Box>


  );
}