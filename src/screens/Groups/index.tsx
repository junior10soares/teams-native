import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupsCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {

    const [groups, setGroups] = useState<string[]>([])

    const navigation = useNavigation()

    function handleNewGroup() {
        navigation.navigate('newGroups')
    }

    async function fetchGroups() {
        try {
            const data = await groupsGetAll()
            setGroups(data)

        } catch (error) {
            console.log(error)
        }
    }

    function handleOpenGroup(group: string) {
        navigation.navigate('players', { group })//abrir o grupo
    }

    useFocusEffect(useCallback(() => {
        fetchGroups()
    }, []))

    return (
        <Container>
            <Header />

            <Highlight
                title='Turmas'
                subtitle='Jogue com sua turma'
            />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <GroupsCard
                        title={item}
                        onPress={() => handleOpenGroup(item)}
                    />
                )}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Que tal cadastrar a primeira turma?"
                    />
                )}
            />
            <Button
                title='Criar nova turma'
                onPress={handleNewGroup}
            />
        </Container>
    );
}