import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

type Props = TouchableOpacityProps & { // pegando a props do botao p estilizar
    title: string
}

export function GroupsCard({ title, ...rest }: Props) {//tem que colocar o ...rest
    return (
        <Container {...rest}>
            <Icon />
            <Title>
                {title}
            </Title>
        </Container>
    )
}