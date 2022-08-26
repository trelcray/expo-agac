import { Box, HStack, Text, VStack, Circle, Pressable, IPressableProps } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export type CursesProps = {
    id_curso: string,
    nome_curso: string,
    encerramento: string,
    horas_complementares: number,
    status: "open" | "closed";
}

type Props = IPressableProps & {
    data: CursesProps;
}

export function Curses({ data, ...rest }: Props) {
    
    const statusColor = data.status === 'open' ? "#ea580c" : "#15803d";
    
    return (
        <Pressable mt={4} {...rest}>
        <HStack
            bgColor="white"
            alignItems="center"
            justifyContent="space-between"
            rounded="sm"
            overflow="hidden"
        >
            <Box h="full" w={2} bgColor={statusColor} />
            <VStack
                flex={1}
                my={2}
                ml={5}
            >
                <Text 
                    color="black" 
                    fontWeight="bold" 
                    fontSize="md"
                >
                    {data.nome_curso}
                </Text>

                <HStack alignItems="center">
                    <MaterialIcons name='history-toggle-off' size={15} />
                    <Text fontSize="xs" ml={1}>
                        {data.encerramento}
                    </Text>
                </HStack>

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