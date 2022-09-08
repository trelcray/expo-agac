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
            Categoria: Nome da categoria
            </Text>
          <Text fontWeight={500} pb={1}>
            Atividade: Nome da atividade
          </Text>
          <Flex 
          flexDirection="row"
          justifyContent="space-between">
          <Text fontWeight={500} pb={1} fontSize={12}>
            data de criação
          </Text>
          <Spacer />
          <Text fontWeight={500} pb={1} fontSize={12}>
            data de finalização
          </Text>
          </Flex>
          <Text fontWeight={500} pb={1}>
            quantidade de horas completas
          </Text>
          <Text fontWeight={500}>
            Certificado: url ou arquivo
          </Text>
        </Center>
      </Box>
  );
}