import { Box, HStack, Text, VStack, Circle, Pressable, IPressableProps } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { VictoryPie } from 'victory-native';

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

<Box justifyContent="center" alignItems="center" maxW="50px" maxH="50px">
<VictoryPie
                    colorScale={[
                       statusColor,
                       "gray"
                    ]}
                    height={130}
                    width={130}
                    animate={{
                        easing: "bounce"
                    }}
                    data={[
                        { x: "", y: 20 },
                        { x: "", y: 80 }
                    ]}
                    style={{
                        labels: {
                            fontWeight: 0,
                            fontSize: 0
                        }
                    }}
                />
</Box>
                

            </HStack>

        </Pressable>
    );
}