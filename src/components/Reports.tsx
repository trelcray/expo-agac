import React from 'react';
import { Box, Center, Flex, Spacer, Text } from 'native-base';

export function Reports() {
  return (
    <Box my={2}>
        <Center
          mx={4}
          bgColor="white"
          p={2}
          rounded="2xl"
        >
          <Text fontWeight={800} pb={2} >
            Categoria: Participação em eventos
            </Text>
          <Text fontWeight={500} pb={1}>
            Atividade: JIC 2021
          </Text>
          <Flex 
          flexDirection="row"
          justifyContent="space-between">
          <Text fontWeight={500} pb={1} fontSize={12}>
            Criada em 02/04/2022
          </Text>
          <Spacer />
          <Text fontWeight={500} pb={1} fontSize={12}>
            Finalizada em 20/04/2022
          </Text>
          </Flex>
          <Text fontWeight={500} pb={1}>
            20 horas completas
          </Text>
          <Text fontWeight={500}>
            Certificado: www.certificado.com
          </Text>
        </Center>
      </Box>
  );
}