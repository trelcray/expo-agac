import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Button, Box, Text, Popover, FormControl, Icon, Center, HStack, FlatList, Heading, Divider, WarningOutlineIcon, Spacer } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Input } from '../../components/Input';
import { VictoryPie } from 'victory-native';
import { Filters } from '../../components/Filters';
import { Categories, CategoriesProps } from '../../components/Categories';
import { Reports } from '../../components/Reports';
import { Loanding } from '../../components/Loanding';
import { Button as CButton } from '../../components/Button'
import { TouchableOpacity } from 'react-native';

type RouteParams = {
  id_curso: string;
}

export function CurseDetails() {
  const navigation = useNavigation();

  const route = useRoute();
  const { id_curso } = route.params as RouteParams;

  const initialFocusRef = useRef(null);

  const [nameCategory, setNameCategory] = useState("");
  const [maxHours, setMaxHours] = useState("");
  const [description, setDescription] = useState("");
  const [requiredNameCategory, setRequiredNameCategory] = useState(false);
  const [requiredMaxHours, setRequiredMaxHours] = useState(false);
  const [requiredDescription, setRequiredDescription] = useState(false);
  const [invalidMaxHours, setInvalidMaxHours] = useState(false);
  const [show, setShow] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<"activitie" | "report">("activitie");
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [requiredCurseName, setRequiredCurseName] = useState(false);
  const [requiredClosure, setRequiredClosure] = useState(false);
  const [requiredCompletedHours, setRequiredCompletedHours] = useState(false);
  const [nameCurse, setNameCurse] = useState("");
  const [closure, setClosure] = useState(new Date(Date.now()));
  const [hoursComplementary, setHoursComplementary] = useState("");
  const [invalidCompletedHours, setInvalidCompletedHours] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [dateFormat, setDateFormat] = useState("");
  const [complet, setComplet] = useState(0);
  const [complementary, setComplementary] = useState(0);
  const [incomplet, setIncomplet] = useState(0);


  const handleCreateCategories = () => {
    try {
      if (!nameCategory) {
        return setRequiredNameCategory(true);
      }
      if (!maxHours) {
        return setRequiredMaxHours(true);
      }
      if (/^(?:\.|,|[0-9])*$/.test(maxHours) === false) {
        return setInvalidMaxHours(true);
      }
      if (!description) {
        return setRequiredDescription(true);
      }

      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)
        .collection('categoria')
        .doc()

      ref.set({
        id_categoria: ref.id,
        id_curso: id_curso,
        nome_categoria: nameCategory,
        horas_max: maxHours,
        descricao: description,
        status: "open"
      });
      setNameCategory("");
      setMaxHours("");
      setDescription("");
      setShow(!show);
    } catch (error) {
      console.log(error, "erro ao criar as categorias")
    }

  }

  const handleEditCurse = () => {
    if (!nameCurse) {
      return setRequiredCurseName(true);
    }
    if (!hoursComplementary) {
      return setRequiredCompletedHours(true);
    }
    if (!closure) {
      return setRequiredClosure(true);
    }


    try {
      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)

      ref.update({
        id_curso: ref.id,
        nome_curso: nameCurse,
        encerramento: closure,
        horas_complementares: hoursComplementary,
        status: "open"

      });
      setHoursComplementary("")
      setNameCurse("")
      setDateFormat("")
      setIsShow(false)
    } catch (error) {
      console.log(error, "Erro ao editar o curso!")
    }
  }

  const getCurse = () => {
    setIsLoading(true);

    try {
      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .where("id_curso", "==", id_curso)

      const subscriber = ref.onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { horas_complementares } = doc.data();

          return {
            id_curso: doc.id,
            horas_complementares,
          }
        }); 
        setComplementary(data);
        if(!!complet){
        setIncomplet(data[0].horas_complementares - complet)
        }
        setIsLoading(false);

      });
      return subscriber;
    } catch (error) {
      console.log(error, "Erro ao pegar os dados do curso!")
    }
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
          const { id_categoria, id_curso, horas_completadas, nome_categoria, horas_max, descricao, status } = doc.data();

          return {
            id_categoria,
            id_curso,
            nome_categoria,
            horas_completadas,
            horas_max,
            descricao,
            status
          }
        });
        let local = 0.0
        data.forEach((number) => {
          local += parseFloat(number.horas_completadas)
        });
        data.forEach(hours =>
        hours.horas_completadas)
        setComplet(local);
        setCategories(data);
        setIsLoading(false);

      });
      return subscriber;

    } catch (error) {
      console.log(error, "Erro ao pegar os dados da categoria!")
    }
  }

  const HandleRemoveCurse = () => {
    try {
      firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)
        .delete()
        .finally(() => navigation.navigate('Home'))
    } catch (error) {
      console.log(error, "erro ao excluir o curso")
    }
  }

  const onChange = (event, selectedDated) => {
    if (selectedDated) {
      const formattedDate = closure.getDate().toString().padStart(2, "0") + "/" + (closure.getMonth().toString().padStart(2, "0")) + "/" + closure.getFullYear()
      setClosure(selectedDated);
      setDateFormat(String(formattedDate));
    }
    setIsPickerShow(false);
  }

  function openScreen(id_categoria: string, id_curso: string) {
    navigation.navigate('Activity', { id_categoria, id_curso });
  }

  const resetNameCategory = () => {
    setRequiredNameCategory(false);
  }

  const resetMaxHours = () => {
    setRequiredMaxHours(false);
    setInvalidMaxHours(false);
  }
  const resetDescription = () => {
    setRequiredDescription(false);
  }

  const resetNameCurse = () => {
    setRequiredCurseName(false);
  }
  const resetHoursComplementary = () => {
    setRequiredCompletedHours(false);
    setInvalidCompletedHours(false);
  }
  const HandleIspickerShow = () => {
    setRequiredClosure(false);
    setIsPickerShow(true)
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getCurse();
  }, [complet]);


  return (
    <Box
      py={6}
      px={4}
      height="full"
      bgColor="#E1E1E6"
    >
      <HStack space={3} mb={5}>
        <Filters
          title='Atividades'
          type='activitie'
          onPress={() => setStatusSelected("activitie")}
          isActive={statusSelected === "activitie"}
        />

        <Filters
          title='Relatório'
          type='report'
          onPress={() => setStatusSelected("report")}
          isActive={statusSelected === "report"}
        />
      </HStack>

      {statusSelected === "activitie"
        ? <Box>
          {isLoading ? <Loanding />
            : <Box h="full">
              <Center>

                <Text fontSize="xl" fontWeight={800}>Gráfico de atividades completas</Text>

                <VictoryPie
                  colorScale={[
                    "green",
                    "orange"
                  ]}
                  height={240}
                  animate={{
                    easing: "bounce"
                  }}
                  data={[
                    {x: "Completo", y: complet},
                    {x: 'Incompleto', y: incomplet || 100}
                  ]}
                  innerRadius={45}
                  style={{
                    labels: {
                      fontWeight: 800,
                      fontSize: 10
                    }
                  }}
                />

              </Center>

              <Box maxH={'64'}>

                <FlatList
                  data={categories}
                  keyExtractor={item => item.id_categoria}
                  renderItem={({ item }) => <Categories data={item} onPress={() => openScreen(item.id_categoria, item.id_curso)} />}
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
              </Box>
              <Spacer/>

              <HStack alignItems="center" justifyContent="flex-end" mb={'16'} >
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
                        Categoria
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
                    }}>Crie sua Categoria</Popover.Header>
                    <Popover.Body bgColor="coolGray.700">
                      <FormControl isRequired={requiredNameCategory}>
                        <FormControl.Label _text={{
                          fontSize: "xs",
                          fontWeight: "medium",
                          color: "#efefef"
                        }}>
                          Nome do Categoria
                        </FormControl.Label>
                        <Input
                          placeholder='Nome da categoria'
                          onPressIn={resetNameCategory}
                          onChangeText={setNameCategory}
                          InputLeftElement={
                            <Icon as={<MaterialIcons name="category" />}
                              size={5}
                              ml={2}
                              color="#efefef" />}
                        />
                      </FormControl>
                      <FormControl mt="3" isRequired={requiredMaxHours} isInvalid={invalidMaxHours}>
                        <FormControl.Label _text={{
                          fontSize: "xs",
                          fontWeight: "medium",
                          color: "#efefef"
                        }}>
                          Cargo Horária maxima da categoria
                        </FormControl.Label>
                        <Input
                          placeholder='O limite de Horas'
                          onPressIn={resetMaxHours}
                          onChangeText={setMaxHours}
                          InputLeftElement={
                            <Icon as={<MaterialIcons name="timer-off" />}
                              size={5}
                              ml={2}
                              color="#efefef" />}
                        />
                        <FormControl.ErrorMessage
                          leftIcon={
                            <WarningOutlineIcon
                              size="xs"
                            />}>
                          Cargo Horária inválida
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl mt="3" isRequired={requiredDescription}>
                        <FormControl.Label _text={{
                          fontSize: "xs",
                          fontWeight: "medium",
                          color: "#efefef"
                        }}>
                          Descrição da Categoria
                        </FormControl.Label>
                        <Input
                          placeholder='Critérios da categoria'
                          onPressIn={resetDescription}
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

                <Divider orientation="vertical" bgColor={"coolGray.700"} thickness="3" mx="1" />

                <Popover isOpen={isShow} initialFocusRef={initialFocusRef} trigger={triggerProps => {
                  return (
                    <Button
                      {...triggerProps}
                      onPress={() => setIsShow(!isShow)}
                      bgColor="coolGray.500"
                      _pressed={{
                        bgColor: "colGray.600"
                      }}
                      leftIcon={<FontAwesome
                        name='edit'
                        size={28}
                        color="#efefef"
                      />}
                    >
                      <Heading
                        color="white"
                        fontSize="md"
                      >
                        Curso
                      </Heading>
                    </Button>
                  );
                }}>
                  <Popover.Content width="56">
                    <Popover.Arrow bgColor="coolGray.700" />
                    <Popover.CloseButton onPress={() => setIsShow(!isShow)} />
                    {
                      /* @ts-ignore */
                    }
                    <Popover.Header bgColor="coolGray.700" _text={{
                      color: "#efefef"
                    }}>Edite seu Curso</Popover.Header>
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
                          onPressIn={resetNameCurse}
                          onChangeText={setNameCurse}
                          InputLeftElement={
                            <Icon as={<MaterialIcons name="local-library" />}
                              size={5}
                              ml={2}
                              color="#efefef" />}
                        />
                      </FormControl>
                      <FormControl mt="3" isRequired={requiredCompletedHours} isInvalid={invalidCompletedHours}>
                        <FormControl.Label _text={{
                          fontSize: "xs",
                          fontWeight: "medium",
                          color: "#efefef"
                        }}>
                          Horas Complementares Necessárias
                        </FormControl.Label>
                        <Input
                          placeholder='A cargo horária exigida'
                          onPressIn={resetHoursComplementary}
                          onChangeText={setHoursComplementary}
                          InputLeftElement={
                            <Icon as={<MaterialIcons name="timer" />}
                              size={5}
                              ml={2}
                              color="#efefef" />}
                        />
                      </FormControl>
                      <FormControl mt="3" isRequired={requiredClosure}>
                        <FormControl.Label _text={{
                          fontSize: "xs",
                          fontWeight: "medium",
                          color: "#efefef"
                        }}>
                          Encerramento do Curso
                        </FormControl.Label>
                        <TouchableOpacity onPress={HandleIspickerShow}>
                          <Input
                            editable={false}
                            placeholder='O término do curso'
                            value={dateFormat}
                            InputLeftElement={
                              <Icon as={<MaterialIcons name="date-range" size={24} color="black" />}
                                size={5}
                                ml={2}
                                color="#efefef"
                              />
                            }
                          />

                        </TouchableOpacity>

                        {isPickerShow && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            display="calendar"
                            value={closure}
                            mode={"date"}
                            is24Hour={true}
                            minimumDate={new Date()}
                            onChange={onChange}
                          />
                        )}
                        <FormControl.ErrorMessage
                          leftIcon={
                            <WarningOutlineIcon
                              size="xs"
                            />}>
                          Data inválida
                        </FormControl.ErrorMessage>

                      </FormControl>

                    </Popover.Body>
                    <Popover.Footer bgColor="coolGray.700">
                      <Button.Group>
                        <Button
                          onPress={() => setIsShow(!isShow)}
                          colorScheme="coolGray"
                        >
                          Cancelar
                        </Button>
                        <Button
                          onPress={handleEditCurse}
                          colorScheme="warning"
                        >
                          Editar
                        </Button>
                      </Button.Group>
                    </Popover.Footer>
                  </Popover.Content>
                </Popover>

                <Divider orientation="vertical" bgColor={"coolGray.700"} thickness="3" mx="1" />
                <CButton onPress={HandleRemoveCurse} title='Curso' bgColor="red.500" startIcon={<MaterialIcons name="delete" size={24} color="white" />}
                  _pressed={{
                    bgColor: "red.600"
                  }} />
              </HStack>

            </Box>}




        </Box>
        : <Box>
          <Box my={2}>
            <Center
              mx={4}
              bgColor="warning.600"
              p={2}
              rounded="2xl"
            >
              <Text fontWeight={800} py={2} color="white">TADS</Text>
              <Text fontWeight={600} pb={2} color="white">
                Discente: Thalis Zambarda
              </Text>
            </Center>

          </Box>

          <Reports />
        </Box>}


    </Box>


  );
}