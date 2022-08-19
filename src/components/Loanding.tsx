import { Center, Spinner } from 'native-base';

export function Loanding() {
  return (
    <Center flex={1} bgColor="transparent" >
        <Spinner color="warning.500" size={40} />
    </Center>
  );
}