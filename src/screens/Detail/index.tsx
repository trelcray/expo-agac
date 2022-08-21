import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Box, Button, Center, FlatList, FormControl, HStack, Icon, Popover, Text, VStack } from 'native-base';
import { Input } from '../../components/Input';
import { dateFormat } from '../../utils/firestoreDateFormat';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivitiesProps, DetailActivities } from '../../components/DetailActivities';

type RouteParams = {
  id_categoria: string;
  id_curso: string;
}

export function Detail() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activityName, setActivityName] = useState("");
  const [completHours, setCompletHours] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [activities, setActivities] = useState<ActivitiesProps[]>([]);
  const initialFocusRef = useRef(null);

  const route = useRoute();
  const { id_categoria, id_curso} = route.params as RouteParams;

  const handleCreateActivities = () => {
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
      nome_atividade: activityName,
      horas_completas: completHours,
      atividade_inicio: firestore.FieldValue.serverTimestamp(),
      URLcertificado: certificateUrl
    });
    setShow(!show)
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
          const { id_atividade, nome_atividade, horas_completas, atividade_inicio, URLcertificado } = doc.data();

          return {
            id_atividade,
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
      console.log(error, "Erro ao pegar os dados da categoria!")
    }
  }

  useEffect(() => {
    getActivities();
    return () => {
      setActivities([]); 
    };
  }, []);

  return (
    <VStack
      px={4}
      py={6}
      h="full"
      bgColor="#E1E1E6"
    >
        <Box my={2}>
          <Center
            bgColor="warning.600"
            p={2}
            rounded="2xl"
          >
            <Text fontWeight={800} pb={3} color="white">{id_categoria}</Text>
            <Text fontWeight={500} color="white">Organização de eventos como semanas acadêmicas, seminários,
              simpósios, congressos, encontros, jornadas ou mesas redondas.
            </Text>
          </Center>

        </Box>

        <FlatList
          data={activities}
          keyExtractor={item => item.id_atividade}
          renderItem={({ item }) => <DetailActivities data={item} />}
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
                size={24}
                color="#efefef"
              />}
            >
              <Text
                fontWeight="bold"
                color="#efefef"
              >
                Criar Atividade
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
              <FormControl>
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>
                  Nome da Atividade
                </FormControl.Label>
                <Input
                  placeholder='Nome da atividade'
                  onChangeText={setActivityName}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="pending-actions" />}
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
                  Horas a serem completas
                </FormControl.Label>
                <Input 
                  placeholder='A cargo horária completa'
                  onChangeText={setCompletHours}
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
                  URL do certificado
                </FormControl.Label>
                <Input 
                  placeholder='Identificador do certificado'
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
      </HStack>

    </VStack>
  );
}