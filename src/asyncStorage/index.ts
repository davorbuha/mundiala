import {AsyncStorage} from 'react-native';
import Credentials from './credentials';

export const credentialsKey = 'mundiala-credentials';

export async function storeCredentials(cred: Credentials): Promise<boolean> {
    const strignified = JSON.stringify(cred.toJSON());
    try {
        const storageResp = await AsyncStorage.setItem(
            credentialsKey,
            strignified,
        );
        return true;
    } catch (e) {
        return false;
    }
}

export async function readCredentials(): Promise<Credentials | null> {
    const storageRes = await AsyncStorage.getItem(credentialsKey);
    const credentials = Credentials.fromJSON(JSON.parse(storageRes));
    return credentials;
}

export async function deleteCredentials(): Promise<boolean> {
    try {
        const del = await AsyncStorage.removeItem(credentialsKey);
        return true;
    } catch (e) {
        return false;
    }
}
