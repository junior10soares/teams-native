import { TouchableOpacityProps } from "react-native"

import { ButtonTypeStyleProps, Container, Title } from "./styles"

type Props = TouchableOpacityProps & {
    type?: ButtonTypeStyleProps
    title: string
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
    return (
        <Container type={type} {...rest}>
            <Title>
                {title}
            </Title>
        </Container>
    )
}