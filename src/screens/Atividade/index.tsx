import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Box, Text, ScrollView, Popover, FormControl, Input, Icon, Divider, Select, CheckIcon, WarningOutlineIcon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export function Atividade() {
  const navigation = useNavigation();

  /*   const [nomeCategoria, setNomeCategoria] = useState("");
    const [horaMax, setHoraMax] = useState(""); */

  const initialFocusRef = React.useRef(null);
  const initialFocusRef2 = React.useRef(null);
  const [show, setShow] = useState(false)
  const [isShow, setIsShow] = useState(false)


  function openScreen() {
    navigation.navigate('Execucao');
  }
  return (
    <Box
      safeArea
      maxHeight="full"
      height="full"
      bg="#E1E1E6"
    >
      <Box h="5/6">
        <Text>algo aki</Text>
      </Box>

      <Box h="1/6" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <Popover isOpen={show} initialFocusRef={initialFocusRef} trigger={triggerProps => {
          return (
            <Button 
             {...triggerProps}
             onPress={() => setShow(!show)}
             bgColor="warning.600"
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
                Criar Categoria
              </Text></Button>
          );
        }}>
          <Popover.Content width="56">
            <Popover.Arrow bgColor="coolGray.700" />
            <Popover.CloseButton />
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
                  Nome do Curso
                </FormControl.Label>
                <Input
                  rounded="sm"
                  fontSize="xs"
                  placeholderTextColor="#efefef"
                  bgColor="coolGray.900"
                  color="#efefef"
                  placeholder='Nome da categoria'
                  selectionColor="#efefef"
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="category" />}
                      size={5}
                      ml={2}
                      color="#efefef" />}
                  ref={initialFocusRef}
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
                <Input rounded="sm"
                  fontSize="xs"
                  placeholderTextColor="#efefef"
                  bgColor="coolGray.900"
                  color="#efefef"
                  placeholder='O limite de Horas'
                  selectionColor="#efefef"
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="timer-off" />}
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
                  Cancel
                </Button>
                <Button 
                 onPress={() => setShow(!show)}
                 colorScheme="warning"
                >
                  Save
                </Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>

        <Divider orientation="vertical" bgColor={"coolGray.700"} thickness="3" h={'2/6'} mx="2" />

        <Popover isOpen={isShow} initialFocusRef={initialFocusRef2} trigger={triggerProps => {
          return (
            <Button
             {...triggerProps}
             onPress={() => setIsShow(!isShow)}
             bgColor="warning.600"
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
              </Text></Button>
          );
        }}>
          <Popover.Content width="56">
            <Popover.Arrow bgColor="coolGray.700" />
            <Popover.CloseButton />
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
                  rounded="sm"
                  fontSize="xs"
                  placeholderTextColor="#efefef"
                  bgColor="coolGray.900"
                  color="#efefef"
                  placeholder='Nome da atividade'
                  selectionColor="#efefef"
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="pending-actions" />}
                      size={5}
                      ml={2}
                      color="#efefef" />}
                  ref={initialFocusRef}
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                  color: "#efefef"
                }}>
                  Descrição da Atividade
                </FormControl.Label>
                <Input rounded="sm"
                  fontSize="xs"
                  placeholderTextColor="#efefef"
                  bgColor="coolGray.900"
                  color="#efefef"
                  placeholder='Descreva sobre a atividade'
                  selectionColor="#efefef"
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="description" />}
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
                <Input rounded="sm"
                  fontSize="xs"
                  placeholderTextColor="#efefef"
                  bgColor="coolGray.900"
                  color="#efefef"
                  placeholder='O limite de Horas'
                  selectionColor="#efefef"
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
                  bg: "teal.600",
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
                 onPress={() => setIsShow(!isShow)}
                 colorScheme="coolGray"
                >
                  Cancel
                </Button>
                <Button 
                 onPress={() => setIsShow(!isShow)}
                 colorScheme="warning"
                >
                  Save
                </Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>

      </Box>
    </Box>


  );
}

{/*  */ }