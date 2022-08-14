import { Box, FormControl, Button, Modal as NBModal, Heading, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Input } from './Input';
import { Loanding } from './Loanding';

export function Modal() {
    const [userName, setUsername] = useState("");
    const [isSubscriber, setIsSubscriber] = useState([]);
    const [requiredUserName, setRequiredUsername] = useState(false);
    const [isLoanding, setIsLoanding] = useState(true);

    const handleCreateUser = async () => {
        if (!userName) {
            return setRequiredUsername(true);
        }
        try {
            firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('username')
                .add({
                    username: userName,
                });
        } catch (error) {
            console.log(error, "Erro ao criar a identificação do usuário!")
        }
    }


    const getUser = async () => {
        try {
            const subscriber = firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('username')
                .where('username', '!=', false)
                .onSnapshot(snapshot => {
                    const data = snapshot.docs.map(doc => {
                        const { username } = doc.data();

                        return {
                            id: doc.id,
                            username
                        }
                    });
                    setIsSubscriber(data);
                   setIsLoanding(false);
                });
            return subscriber;
        } catch (error) {
            console.log(error, "Ocorreu um erro ao pegar o nome do usuário!")
        } finally {
            
        }

    }

    useEffect(() => {
        getUser()
    },[])

    return (
        <Box>
            { isLoanding 
            ? <Loanding/>
            :<NBModal isOpen={isSubscriber.length < 1}>
            <NBModal.Content maxWidth="400px">
                <NBModal.Header>
                    <Heading>
                        Identifique-se
                    </Heading>
                </NBModal.Header>
                <NBModal.Body>
                    <FormControl isRequired={requiredUserName}>
                        <FormControl.Label>
                            <Text fontWeight="medium" color="coolGray.700">
                                Nome Completo
                            </Text>
                        </FormControl.Label>
                        <Input placeholder='Informe seu nome completo' onChangeText={setUsername} />
                    </FormControl>
                </NBModal.Body>
                <NBModal.Footer>
                    <Button isLoading={false} bgColor="warning.500" flex={1} onPress={handleCreateUser}>
                        <Text fontWeight="bold" color="white">
                            Salvar
                        </Text>
                    </Button>
                </NBModal.Footer>
            </NBModal.Content>
        </NBModal>
            }
            
        </Box>
    );
}