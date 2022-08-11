import { Button, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
    title: string,
    isActive?: boolean,
    type: "open" | "closed";
}

export function Filters({ title, isActive = false, type, ...rest}: Props) {

    const colorType = type === 'open' ? "warning.500" : "red.500";

  return (
    <Button
        variant="outline"
        borderWidth={isActive ? 1: 0 }
        borderColor={colorType}
        bgColor="gray.600"
        flex={1}
        {...rest}
    >
        <Text 
            color={isActive ? colorType : "gray.300"}
            fontSize="xs"
            textTransform="uppercase"
        >
            {title}
        </Text>
    </Button>
  );
}