import { Button as NativeBaseButton, IButtonProps, Heading} from 'native-base';

type Props = IButtonProps & {
    title: string;
}

export function Button( { title, ...rest }: Props) {
  return (
    <NativeBaseButton
        fontSize="sm"
        rounded="sm"
        h={12}
        { ...rest }
    >
        <Heading
        color="white"
        fontSize="md"
        >
            { title }
        </Heading>
    </NativeBaseButton>
  );
}