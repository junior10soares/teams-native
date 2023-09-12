import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";

import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";


export function NewGroup() {

    const [group, setGroups] = useState('')

    const navigation = useNavigation()

    async function handleScrenPlayer() {

        try {
            if (group.trim().length === 0) {
                return Alert.alert('Novo grupo', 'Informe o nome da turma')
            }
            await groupCreate(group)
            navigation.navigate('players', { group }) //group : group mesma coisa //ta passando a inf do input digitado

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Novo Grupo', error.message)
            } else {
                Alert.alert('Novo Grupo', 'Não foi possivel criar um grupo')
                console.log(error)
            }
        }
    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />
                <Highlight
                    title="Nova turma"
                    subtitle="crie a turma para adicionar pessoas"
                />
                <Input
                    placeholder="Nova turma"
                    onChangeText={setGroups}//mesma coisa que colocar e => setGroups(e)
                />
                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handleScrenPlayer}
                />
            </Content>

        </Container>
    )
}