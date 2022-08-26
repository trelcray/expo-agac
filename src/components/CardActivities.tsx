import { Center, Text, VStack } from 'native-base';

export type CardActivitiesProps = {
    id_categoria: string,
    nome_categoria: string;
    descricao: string;
    horas_max: number;
    
}

type Props = {
    data: CardActivitiesProps;
}

export function CardActivities({ data, ...rest }: Props) {
  return (
    <VStack my={2} {...rest}>
      <Center
        bgColor="warning.600"
        p={2}
        rounded="2xl"
      >
        <Text fontWeight={800} pb={3} color="white">{data.nome_categoria} : {data.horas_max}</Text>
        <Text fontWeight={500} color="white">
            {data.descricao}
        </Text>
      </Center>

    </VStack>
  );
}

{/* <FlatList
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
    /> */}