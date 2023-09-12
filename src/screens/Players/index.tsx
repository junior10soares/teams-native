import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

import { AppError } from "@utils/AppError";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";



type RouteParams = {
    group: string
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('time a')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const route = useRoute()
    const { group } = route.params as RouteParams
    const newPlayerNameInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
        }
        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();//tira o focus

            setNewPlayerName('');
            fetchPlayersByTeam();

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam)
        } catch (error) {
            console.log(error);
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam()

        } catch (error) {
            console.log(error);
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');

        } catch (error) {
            console.log(error);
            Alert.alert('Remover Grupo', 'Não foi posível remover o grupo');
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover o grupo?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team])

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}//passando inf do input digitado
                subtitle="adicione a galera e separe o time"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}//teclado V do celular enter tbm
                    returnKeyType="done"//depois abaixa o teclado
                />

                <ButtonIcon
                    icon='add'
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}//esse é o item de baixo
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name)}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Não há pessoas nesse time"
                    />
                )}
                showsVerticalScrollIndicator={false}//esconder barra de rolagem
                contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
            />
            <Button
                title="Remover turma"
                type="SECUNRADY"
                onPress={handleGroupRemove}
            />
        </Container>
    )
}