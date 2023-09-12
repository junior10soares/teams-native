import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupsGetAll';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroup: string) {
    try {
        const storedGroups = await groupsGetAll(); //pega todos os grupos

        const groupAlreadyExists = storedGroups.includes(newGroup)// se existi um grupo criado

        if (groupAlreadyExists) {
            throw new AppError('Já existe um grupo com esse nome')
        }

        const storage = JSON.stringify([...storedGroups, newGroup])//converte o obj em forma de texto//coloca tds grupos mais o novo grupo

        await AsyncStorage.setItem(GROUP_COLLECTION, storage);//colocar, criar grupo

    } catch (error) {
        throw error;
    }
}