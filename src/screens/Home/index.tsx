import React from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Button, Box, Text, Flex, Pressable, ScrollView, Popover, FormControl, Input, Icon, Divider } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';


export function Home() {
  const navigation = useNavigation();

  const initialFocusRef = React.useRef(null);

  function openScreen() {
    navigation.navigate('CriarCurso');
  }

  function openScreen2() {
    navigation.navigate('Atividade');
  }

  function handleSignOut() {
    auth().signOut();
  }

  return (
    <Box
      safeArea
      maxHeight="full"
      height="full"
      bg="#E1E1E6"
    >
      <Box h="5/6">
        <Text
          display="flex"
          pb={2}
          mt={4}
          textAlign="center"
          fontWeight="bold"
          fontSize={'20'}
          borderBottomWidth={1}
          mx={4}
        >
          Seus Cursos
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable
            mt={4}
            mx={4}
            onPress={openScreen2}
          >
            {({
              isHovered,
              isPressed
            }) => {
              return <Box borderColor="coolGray.700" shadow="3" bg={isPressed ? "coolGray.300" : isHovered ? "coolGray.200" : "coolGray.100"} p="2" rounded="8" borderLeftWidth={12} roundedLeft={3} style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }}>
                <Text color="black" mt={1} mb={2} fontWeight="bold" fontSize="md">
                  Tecnologia em análise e desenvolvimento de sistemas
                </Text>
                <Flex flexDirection="row">
                  <Box
                    mt={2}
                    mr={1}>
                    <MaterialIcons name='history-toggle-off' size={19} />
                  </Box>
                  <Text
                    mt="2"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    20/02/22 ás 15:30
                  </Text>

                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    flexDirection="row"
                    alignItems="flex-end"
                    width={"1/2"}
                    mt={2}
                    ml={3}>
                    <MaterialIcons color="#15803d" name='check-circle' size={19} />
                  </Box>
                </Flex>
              </Box>;
            }}
          </Pressable>
          <Pressable mt={4} mx={4}>
            {({
              isHovered,
              isPressed
            }) => {
              return <Box
                borderColor="coolGray.400"
                shadow="3"
                bg={isPressed ? "coolGray.300" : isHovered ? "coolGray.200" : "coolGray.100"}
                p="2" rounded="8"
                borderLeftWidth={12}
                roundedLeft={3}
                style={{
                  transform: [{
                    scale: isPressed ? 0.96 : 1
                  }]
                }}>
                <Text color="black" mt={1} mb={2} fontWeight="bold" fontSize="md">
                  Psicologia
                </Text>
                <Flex flexDirection="row">
                  <Box
                    mt={2}
                    mr={1}>
                    <MaterialIcons name='timer' size={19} />
                  </Box>
                  <Text
                    mt="2"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    20/02/22 ás 15:30
                  </Text>

                  <Box display="flex" justifyContent="flex-end" flexDirection="row" alignItems="flex-end" width={"1/2"}
                    mt={2}
                    ml={3}>
                    <MaterialIcons color="#ea580c" name='hourglass-top' size={19} />
                  </Box>
                </Flex>
              </Box>;
            }}
          </Pressable>
          <Pressable mt={4} mx={4}>
            {({
              isHovered,
              isPressed
            }) => {
              return <Box
                borderColor="coolGray.400"
                shadow="3"
                bg={isPressed ? "coolGray.300" : isHovered ? "coolGray.200" : "coolGray.100"}
                p="2" rounded="8"
                borderLeftWidth={12}
                roundedLeft={3}
                style={{
                  transform: [{
                    scale: isPressed ? 0.96 : 1
                  }]
                }}>
                <Text color="black" mt={1} mb={2} fontWeight="bold" fontSize="md">
                  Psicologia
                </Text>
                <Flex flexDirection="row">
                  <Box
                    mt={2}
                    mr={1}>
                    <MaterialIcons name='timer' size={19} />
                  </Box>
                  <Text
                    mt="2"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    20/02/22 ás 15:30
                  </Text>

                  <Box display="flex" justifyContent="flex-end" flexDirection="row" alignItems="flex-end" width={"1/2"}
                    mt={2}
                    ml={3}>
                    <MaterialIcons color="#ea580c" name='hourglass-top' size={19} />
                  </Box>
                </Flex>
              </Box>;
            }}
          </Pressable>
          <Pressable mt={4} mx={4}>
            {({
              isHovered,
              isPressed
            }) => {
              return <Box
                borderColor="coolGray.400"
                shadow="3"
                bg={isPressed ? "coolGray.300" : isHovered ? "coolGray.200" : "coolGray.100"}
                p="2" rounded="8"
                borderLeftWidth={12}
                roundedLeft={3}
                style={{
                  transform: [{
                    scale: isPressed ? 0.96 : 1
                  }]
                }}>
                <Text color="black" mt={1} mb={2} fontWeight="bold" fontSize="md">
                  Psicologia
                </Text>
                <Flex flexDirection="row">
                  <Box
                    mt={2}
                    mr={1}>
                    <MaterialIcons name='timer' size={19} />
                  </Box>
                  <Text
                    mt="2"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    20/02/22 ás 15:30
                  </Text>

                  <Box display="flex" justifyContent="flex-end" flexDirection="row" alignItems="flex-end" width={"1/2"}
                    mt={2}
                    ml={3}>
                    <MaterialIcons color="#ea580c" name='hourglass-top' size={19} />
                  </Box>
                </Flex>
              </Box>;
            }}
          </Pressable>
        </ScrollView>

      </Box>

      <Box h="1/6" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <Popover initialFocusRef={initialFocusRef} trigger={triggerProps => {
          return <Button bgColor="warning.600"
            leftIcon={<MaterialIcons
              name='add-circle-outline'
              size={24}
              color="#efefef"
            />}
            {...triggerProps}>
            <Text
              fontWeight="bold"
              color="#efefef"
            >
              Criar curso
            </Text></Button>;
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
                  color="#efefef"
                  placeholder='seu curso'
                  bgColor="coolGray.900"
                  selectionColor="#efefef"
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="local-library" />}
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
                  Horas Complementares Necessárias
                </FormControl.Label>
                <Input rounded="sm" fontSize="xs"
                  placeholderTextColor="#efefef"
                  color="#efefef"
                  placeholder='A cargo horária exigida'
                  bgColor="coolGray.900"
                  selectionColor="#efefef"
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
                <Input rounded="sm"
                  fontSize="xs"
                  placeholderTextColor="#efefef"
                  color="#efefef"
                  placeholder='O término do curso'
                  bgColor="coolGray.900"
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
                <Button colorScheme="coolGray" variant="ghost">
                  Cancel
                </Button>
                <Button colorScheme="warning">Save</Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>
        <Divider orientation="vertical" bgColor={"coolGray.700"} thickness="3" h={'2/6'} mx="2" />
        <Button
          py={2}
          px={8}
          colorScheme="muted"
          leftIcon={<MaterialIcons
            name='exit-to-app'
            size={28}
            color="#efefef" />}
          onPress={handleSignOut}
        > Sair</Button>
      </Box>
    </Box>
  );
}