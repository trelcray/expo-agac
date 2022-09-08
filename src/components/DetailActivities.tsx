import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Box, Button, Center, Circle, FormControl, HStack, Icon, Modal, Pressable, Spacer, Text, VStack, WarningOutlineIcon } from 'native-base';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Input } from './Input';

type RouteParams = {
  id_categoria: string;
  id_curso: string;
  id_atividade: string;
}

export type ActivitiesProps = {
  id_atividade: string;
  id_curso: string;
  id_categoria: string;
  nome_atividade: string;
  horas_completas: number;
  atividade_inicio: string;
  URLcertificado: string;
}

type Props = {
  data: ActivitiesProps;
}

export function DetailActivities({ data }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [completHours, setCompletHours] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [requiredActivityName, setRequiredActivityName] = useState(false);
  const [requiredCompletHours, setRequiredCompletHours] = useState(false);
  const [requiredCertificateUrl, setRequiredCertificateUrl] = useState(false);
  const [invalidCompletHours, setInvalidCompletHours] = useState(false);


  const navigation = useNavigation();
  const route = useRoute();
  const { id_categoria, id_curso, id_atividade } = route.params as RouteParams;

  const handleEditActivities = () => {
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
        .doc(id_atividade)

      ref.update({
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
      setShowModal(false);
    } catch (error) {
      console.log(error, "erro ao criar a atividade")
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
        .collection('atividade')
        .doc(id_atividade)
        .delete()
        .then(() => navigation.goBack())
    } catch (error) {
      console.log(error, "erro ao excluir o curso")
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

  return (
    <Box>
      <Center
        bgColor="white"
        mt={2}
        mb={2}
        p={2}
        rounded="2xl"
        w="full"
      >
        <HStack ml={5}>
          <VStack>

            <Text
              fontWeight={800}
              pb={2}
            >
              Atividade: {data.nome_atividade}
            </Text>

            <Text fontWeight={500}>
              {data.horas_completas} Horas completas
            </Text>
            <Text fontWeight={500}>
              {data.URLcertificado}
            </Text>
            <Text fontWeight={500}>
              {data.atividade_inicio}
            </Text>

          </VStack>

          <Spacer />

          <VStack justifyContent="center">

            <Pressable onPress={() => {
              setShowModal(true);
            }}>
              <Circle
                bgColor="#efefef"
                h={10}
                w={10}
                mr={5}
              >
                <Text>
                  <FontAwesome name="edit" size={24} color="gray" />
                </Text>
              </Circle>
            </Pressable>

            <Pressable onPress={HandleRemoveCategory}>
              <Circle
                bgColor="#efefef"
                h={10}
                w={10}
                mr={5}
                mt={1}
              >
                <Text>
                  <MaterialIcons name="delete" size={24} color="red" />
                </Text>
              </Circle>
            </Pressable>
          </VStack>

        </HStack>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header bgColor="coolGray.700" _text={{
              color: "#efefef"
            }}>
              Editar Atividade
            </Modal.Header>
            <Modal.Body bgColor="coolGray.700">
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
            </Modal.Body>
            <Modal.Footer bgColor="coolGray.700">
              <Button.Group space={2}>
                <Button
                  onPress={() => setShowModal(false)}
                  colorScheme="coolGray"
                >
                  Cancelar
                </Button>
                <Button
                  onPress={handleEditActivities}
                  bgColor="warning.600"
                  _pressed={{
                    bgColor: "warning.700"
                  }}
                >
                  Editar
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>

    </Box>
  );
}