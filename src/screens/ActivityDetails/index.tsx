import { Center, FlatList, HStack, Text, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Loanding } from "../../components/Loanding";
import { useRoute } from "@react-navigation/native";
import { dateFormat } from "../../utils/firestoreDateFormat";
import { ActivitiesProps, DetailActivities } from "../../components/DetailActivities";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type RouteParams = {
    id_categoria: string;
    id_curso: string;
    id_atividade: string;
  }

export function ActivityDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState<ActivitiesProps[]>([]);


    const route = useRoute();
  const { id_atividade, id_curso, id_categoria } = route.params as RouteParams;

  const getActivities = useCallback(() => {
    setIsLoading(true);

    try {
      const ref = firestore()
        .collection('usuario')
        .doc(auth().currentUser.uid)
        .collection('curso')
        .doc(id_curso)
        .collection('categoria')
        .doc(id_categoria)
        .collection('atividade')
        .where('id_atividade', '==', id_atividade)

      const subscriber = ref.onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { id_atividade, id_curso, id_categoria, nome_atividade, horas_completas, atividade_inicio, URLcertificado } = doc.data();

          return {
            id_atividade,
            id_curso,
            id_categoria,
            nome_atividade,
            horas_completas,
            atividade_inicio: dateFormat(atividade_inicio),
            URLcertificado
          }
        });
        setActivities(data);
        setIsLoading(false);
      });
      return subscriber;

    } catch (error) {
      console.log(error, "Erro ao pegar os dados da categoria!")
    }
  }, [activities]
)

  useEffect(() => {
    return getActivities();
  }, []);

    return (
        <HStack px={4}
        py={6}
        h="full"
        bgColor="#E1E1E6"
        >
            {isLoading 
            ? <Loanding/>
            : <VStack
            w="full"
            >
              <FlatList
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
            />
            </VStack>}
            
            
        </HStack>
    )
}