import { Box, HStack, Text, VStack, Circle, Pressable, IPressableProps } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export type CategoriesProps = {
    id_categoria: string,
    nome_categoria: string,
    horas_max: string,
    status: "open" | "closed";
}

type Props = IPressableProps & {
    data: CategoriesProps;
}
export function Activities({ data, ...rest }: Props) {

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
                    my={3}
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

                <Box
                    mr={1}>
                    <MaterialIcons name='history-toggle-off' size={19} />
                </Box>
                <Text
                    mr={5}
                    fontSize="sm"
                    fontWeight="medium"
                >
                    {data.horas_max} horas
                </Text>

            </HStack>

        </Pressable>
    );
}