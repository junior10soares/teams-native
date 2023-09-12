import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
    try {
        const storage = await AsyncStorage.getItem(GROUP_COLLECTION)// pegou os grupos, mostra, coloca

        const groups: string[] = storage ? JSON.parse(storage) : [] // pegar o conteudo storage passar p obj

        return groups

    } catch (error) {
        throw error;
    }
}