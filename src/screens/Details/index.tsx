import React, { useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Box, Button, Center, CheckIcon, FlatList, FormControl, HStack, Icon, Popover, Select, Text, VStack, WarningOutlineIcon } from 'native-base';
import { Input } from '../../components/Input';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivitiesProps, DetailActivities } from '../../components/DetailActivities';

type RouteParams = {
  id_atividade: string;
}

export function Details() {
  const [show, setShow] = useState(false);
  const [activities, setActivities] = useState<ActivitiesProps[]>([{
    id_atividade: "123",
    nome_atividade: "JIC 2021",
    horas_completas: 4,
    URLcertificado: "blablabla"
  },
  {
    id_atividade: "124",
    nome_atividade: "JIC 2022",
    horas_completas: 3,
    URLcertificado: "blablabla2"
  }]);
  const initialFocusRef = useRef(null);

  const route = useRoute();
  const { id_atividade } = route.params as RouteParams;

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
            <Text fontWeight={800} pb={3} color="white">Participação em Eventos</Text>
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
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="timer" />}
                      size={5}
                      ml={2}
                      color="#efefef" />}
                />
              </FormControl>
              <FormControl mt={3} isRequired isInvalid={false}>
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>Selecione a Categoria</FormControl.Label>
                <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                  bgColor: "teal.600",
                  endIcon: <CheckIcon size={5} />
                }} >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item label="Cross Platform Development" value="cross" />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  Selecione uma categoria!
                </FormControl.ErrorMessage>
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
                  onPress={() => setShow(!show)}
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