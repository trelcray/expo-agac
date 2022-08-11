import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput 
    type='text'
    placeholderTextColor="#efefef"
    bgColor="coolGray.900"
    color="#efefef"
    selectionColor="#efefef"
    fontSize="xs"
    _focus={{
        borderWidth: 1.5,
    }}
    {...rest}
    />
  );
}