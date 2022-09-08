import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Box, Button, Center, FlatList, FormControl, Heading, HStack, Icon, Popover, Text, VStack, WarningOutlineIcon } from 'native-base';
import { Input } from '../../components/Input';
import { dateFormat } from '../../utils/firestoreDateFormat';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Button as CButton } from '../../components/Button'
import { CategoriesProps } from '../../components/Categories';
import { Loanding } from '../../components/Loanding';
import { Activities, ActivitiesProps } from '../../components/Activities';

type RouteParams = {
  id_categoria: string;
  id_curso: string;
}

export function Activity() {
  const [show, setShow] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activityName, setActivityName] = useState("");
  const [completHours, setCompletHours] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [requiredActivityName, setRequiredActivityName] = useState(false);
  const [requiredCompletHours, setRequiredCompletHours] = useState(false);
  const [requiredCertificateUrl, setRequiredCertificateUrl] = useState(false);
  const [invalidCompletHours, setInvalidCompletHours] = useState(false);
  const [activities, setActivities] = useState<ActivitiesProps[]>([]);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [nameCategory, setNameCategory] = useState("");
  const [maxHours, setMaxHours] = useState("");
  const [description, setDescription] = useState("");
  const [requiredNameCategory, setRequiredNameCategory] = useState(false);
  const [requiredMaxHours, setRequiredMaxHours] = useState(false);
  const [requiredDescription, setRequiredDescription] = useState(false);
  const [invalidMaxHours, setInvalidMaxHours] = useState(false);
  const [total, setTotal] = useState(null);
  const [max, setMax] = useState(null);

  const navigation = useNavigation();
  const initialFocusRef = useRef(null);

  const route = useRoute();
  const { id_curso, id_categoria } = route.params as RouteParams;

  function openScreen(id_categoria: string, id_curso: string, id_atividade: string) {
    navigation.navigate('activityDetails', { id_categoria, id_curso, id_atividade });
  }

  const handleCreateActivities = () => {
    try {

      if (!activityName) {
        return setRequiredActivityName(true);
      }
      if (!completHours) {
        return setRequiredCompletHours(true);
      }
      if (/^(?:\.|,|[0-9])*$/.test(completHours) === false) {
        return setInvalidCompletHours(true);
      }
      if (!certificateUrl) {
        return setRequiredCertificateUrl(true);
      }

      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)
        .collection('categoria')
        .doc(id_categoria)
        .collection('atividade')
        .doc()

      ref.set({
        id_atividade: ref.id,
        id_categoria: id_categoria,
        id_curso: id_curso,
        nome_atividade: activityName,
        horas_completas: completHours,
        atividade_inicio: firestore.FieldValue.serverTimestamp(),
        URLcertificado: certificateUrl
      });

      setActivityName("");
      setCompletHours("");
      setCertificateUrl("");
      setShow(!show);

    } catch (error) {
      console.log(error, "erro ao criar a atividade")
    }

  }

  const handleEditCategory = () => {
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
        .doc(id_categoria)

      ref.update({
        id_categoria: ref.id,
        nome_categoria: nameCategory,
        horas_max: maxHours,
        descricao: description,
        status: "open"
      });
      setNameCategory("");
      setMaxHours("");
      setDescription("");
      setIsShow(false)
    } catch (error) {
      console.log(error, "Erro ao editar a categoria!")
    }
  }

  const HandleRemoveCategory = () => {
    try {
      firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)
        .collection('categoria')
        .doc(id_categoria)
        .delete()
        .then(() => navigation.goBack())
    } catch (error) {
      console.log(error, "erro ao excluir a categoria")
    }
  }


  const getActivities = () => {
    setIsLoading(true);

    try {
      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)
        .collection('categoria')
        .doc(id_categoria)
        .collection('atividade')

      const subscriber = ref.onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { id_atividade, id_curso, id_categoria, nome_atividade, horas_completas, atividade_inicio, URLcertificado } = doc.data();

          return {
            id_atividade,
            id_curso,
            id_categoria,
            nome_atividade,
            horas_completas,
            atividade_inicio: dateFormat(atividade_inicio),
            URLcertificado
          }
        });
        setActivities(data);
        setIsLoading(false);

      });
      return subscriber;

    } catch (error) {
      console.log(error, "Erro ao pegar os dados da atividade!")
    }
  }

  const getTotal = useCallback((max: number) => {
    try {
      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)
        .collection('categoria')
        .doc(id_categoria)
        .collection('atividade')

      const subscriber = ref.onSnapshot(snapshot => {
        setIsLoading(true);
        const data = snapshot.docs.map(doc => {
          const { horas_completas } = doc.data();

          return {
            horas_completas,
          }
        });

        let local = 0.0
        data.forEach((number) => {
          local += parseFloat(number.horas_completas)
        });
        data.forEach(hours =>
          hours.horas_completas)
          
        limiter(local, max);
        setIsLoading(false);
        return local
      });
      
      return subscriber;
    } catch (error) {
      console.log(error, "erro ao pegar o total")
    }
  },[]
  );


  const getCategories = () => {
    setIsLoading(true);

    try {
      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)
        .collection('categoria')
        .where('id_categoria', '==', id_categoria)

      const subscriber = ref.onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { id_categoria, id_curso, nome_categoria, horas_max, descricao, status } = doc.data();

          return {
            id_categoria,
            id_curso,
            nome_categoria,
            horas_max,
            descricao,
            status
          }
        });
        if(data.length > 0){
          setCategories(data);
          setMax(data[0].horas_max)
        }
        setIsLoading(false);

      });
      
      return subscriber;

    } catch (error) {
      console.log(error, "Erro ao pegar os dados da categoria!")
    }  
  }

  const limiter = (horas: number, max?: number) => {
    try {
      setIsLoading(true);
      if (horas >= max) {
        setTotal(max)
    
        const ref = firestore()
          .collection('usuario')
          .doc(auth().currentUser.uid)
          .collection('curso')
          .doc(id_curso)
          .collection('categoria')
          .doc(id_categoria)
    
        ref.update({
          status: "closed"
        });
        setIsLoading(false);
    
      } else {
        setTotal(horas);

        const ref = firestore()
          .collection('usuario')
          .doc(auth().currentUser.uid)
          .collection('curso')
          .doc(id_curso)
          .collection('categoria')
          .doc(id_categoria)
    
        ref.update({
          status: "open"
        })
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error, "erro ao configurar o total")
    }
  }


  const resetActivityName = () => {
    setRequiredActivityName(false);
  }

  const resetCompleteHours = () => {
    setRequiredCompletHours(false);
    setInvalidCompletHours(false);
  }
  const resetCertificateUrl = () => {
    setRequiredCertificateUrl(false);
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

  const updateCompletedHours = () => {
   
    const ref = firestore()
      .collection('usuario')
      .doc(auth().currentUser.uid)
      .collection('curso')
      .doc(id_curso)
      .collection('categoria')
      .doc(id_categoria)

    ref.update({
      id_categoria: ref.id,
      horas_completadas: total
    });
  
  }

  useEffect(() => {
    getActivities();
    getCategories();
  }, []); 

  useEffect(() => {
    if (!!max) {
      getTotal(max);
    }
  }, [max]);

  useEffect(() => {
      updateCompletedHours();
  }, [total]);

  return (
    <VStack
    >
      {isLoading
        ? <Loanding />
        : <VStack
          px={4}
          py={6}
          h="full"
          bgColor="#E1E1E6">
          <Box my={2}>

            {categories.map((item) => (
              <Center
                bgColor="warning.600"
                p={2}
                rounded="2xl"
                key={item.id_categoria}
              >
                <Text fontWeight={800} pb={3} color="white">{item.nome_categoria} : {total}/{item.horas_max} Horas</Text>
                <Text fontWeight={500} color="white">
                  {item.descricao}
                </Text>
              </Center>

            ))}


          </Box>

          <FlatList
            data={activities}
            keyExtractor={item => item.id_atividade}
            renderItem={({ item }) => <Activities data={item} onPress={() => openScreen(item.id_categoria, item.id_curso, item.id_atividade)} />}
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


          <HStack
            alignItems="center"
            justifyContent="center"
          >
            <Popover isOpen={show} initialFocusRef={initialFocusRef} trigger={triggerProps => {
              return (
                <Button
                  {...triggerProps}
                  mt={4}
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
                  <Text
                    fontWeight="bold"
                    color="#efefef"
                  >
                    Atividade
                  </Text>
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
                }}>Crie sua Atividade</Popover.Header>
                <Popover.Body bgColor="coolGray.700">
                  <FormControl isRequired={requiredActivityName}>
                    <FormControl.Label _text={{
                      fontSize: "xs",
                      fontWeight: "medium",
                      color: "#efefef"
                    }}>
                      Nome da Atividade
                    </FormControl.Label>
                    <Input
                      placeholder='Nome da atividade'
                      onPressIn={resetActivityName}
                      onChangeText={setActivityName}
                      InputLeftElement={
                        <Icon as={<MaterialIcons name="pending-actions" />}
                          size={5}
                          ml={2}
                          color="#efefef" />}
                    />
                  </FormControl>

                  <FormControl mt="3" isRequired={requiredCompletHours} isInvalid={invalidCompletHours}>
                    <FormControl.Label _text={{
                      fontSize: "xs",
                      fontWeight: "medium",
                      color: "#efefef"
                    }}>
                      Horas a serem completas
                    </FormControl.Label>
                    <Input
                      placeholder='A cargo horária completa'
                      onPressIn={resetCompleteHours}
                      onChangeText={setCompletHours}
                      InputLeftElement={
                        <Icon as={<MaterialIcons name="timer" />}
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

                  <FormControl mt="3" isRequired={requiredCertificateUrl}>
                    <FormControl.Label _text={{
                      fontSize: "xs",
                      fontWeight: "medium",
                      color: "#efefef"
                    }}>
                      URL do certificado
                    </FormControl.Label>
                    <Input
                      placeholder='Identificador do certificado'
                      onPressIn={resetCertificateUrl}
                      onChangeText={setCertificateUrl}
                      InputLeftElement={
                        <Icon as={<MaterialCommunityIcons name="certificate" />}
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
                      onPress={handleCreateActivities}
                      bgColor="warning.600"
                      _pressed={{
                        bgColor: "warning.700"
                      }}
                    >
                      Salvar
                    </Button>
                  </Button.Group>
                </Popover.Footer>
              </Popover.Content>
            </Popover>

            <Popover isOpen={isShow} initialFocusRef={initialFocusRef} trigger={triggerProps => {
              return (
                <Button
                  {...triggerProps}
                  mt={4}
                  mx={1}
                  onPress={() => setIsShow(!isShow)}
                  bgColor="coolGray.500"
                  _pressed={{
                    bgColor: "coolGray.600"
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
                    Categoria
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
                }}>Edite sua Categoria</Popover.Header>
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
                      onPress={() => setIsShow(!isShow)}
                      colorScheme="coolGray"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onPress={handleEditCategory}
                      colorScheme="warning"
                    >
                      Salvar
                    </Button>
                  </Button.Group>
                </Popover.Footer>
              </Popover.Content>
            </Popover>

            <CButton mt={4} onPress={HandleRemoveCategory} title='Categoria' bgColor="red.500" startIcon={<MaterialIcons name="delete" size={24} color="white" />}
              _pressed={{
                bgColor: "red.600"
              }} />

          </HStack>
        </VStack>}

    </VStack>
  );
}