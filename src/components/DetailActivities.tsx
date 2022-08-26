import { Center, IPressableProps, Pressable, Text } from 'native-base';

export type ActivitiesProps = {
    id_atividade: string;
    id_curso: string;
    id_categoria: string;
    nome_atividade: string;
    horas_completas: number;
    URLcertificado: string;
}

type Props = IPressableProps & {
    data: ActivitiesProps;
}

export function DetailActivities({ data, ...rest }: Props) {
  return (
    <Pressable {...rest}>

          <Center
            bgColor="white"
            mt={2}
            mb={2}
            p={2}
            rounded="2xl"
          >

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

          </Center>
          
    </Pressable>
  );
}