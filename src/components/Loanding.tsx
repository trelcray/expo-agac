import { Center, Spinner } from 'native-base';

export function Loanding() {
  return (
    <Center flex={1} bgColor="white" >
        <Spinner color="warning.500" />
    </Center>
  );
}