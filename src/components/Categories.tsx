import { Box, HStack, Text, VStack, Pressable, IPressableProps, Circle } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export type CategoriesProps = {
    id_categoria: string;
    id_curso: string;
    nome_categoria: string;
    horas_max: number;
    descricao: string;
    horas_completadas?: number;
    status: "open" | "closed";
}

type Props = IPressableProps & {
    data: CategoriesProps;
}

export function Categories({ data, ...rest }: Props) {

    const statusColor = data.status === 'open' ? "#ea580c" : "#15803d";

    return (
        <Pressable {...rest}>
            <HStack
                bgColor="white"
                mt={4}
                alignItems="center"
                justifyContent="space-between"
                rounded="sm"
                overflow="hidden"
            >
                <Box h="full" w={2} bgColor={statusColor} />
                <VStack
                    flex={1}
                    my={4}
                    ml={5}
                >
                    <Text
                        color="black"
                        fontWeight="bold"
                        fontSize="md"
                    >
                        {data.nome_categoria}
                    </Text>
                </VStack>

                <Circle 
                bgColor="#efefef" 
                h={12}
                w={12}
                mr={5}
            >
                {
                    data.status === "closed" 
                    ? <MaterialIcons color={statusColor} name='check-circle' size={24} />
                    : <MaterialIcons color={statusColor} name='hourglass-top' size={24} />
                }
                
            </Circle>


            </HStack>

        </Pressable>
    );
}