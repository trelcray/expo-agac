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
            Categoria: Palestra
            </Text>
          <Text fontWeight={500} pb={1}>
            Atividade: Segurança de dados
          </Text>
          <Flex 
          flexDirection="row"
          justifyContent="space-between">
          <Text fontWeight={500} pb={1} fontSize={12}>
            10/set de 2022
          </Text>
          <Spacer />
          <Text fontWeight={500} pb={1} fontSize={12}>
            10/set de 2022
          </Text>
          </Flex>
          <Text fontWeight={500} pb={1}>
            6 horas
          </Text>
          <Text fontWeight={500}>
            Certificado: www.certificado.com
          </Text>
        </Center>
      </Box>
  );
}