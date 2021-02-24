import {AsyncStorage} from 'react-native';
import Credentials from './credentials';

export const credentialsKey = 'mundiala-credentials';
export const notificationsKey = 'mundiala-notifications';

export async function storeCredentials(cred: Credentials): Promise<boolean> {
    const strignified = JSON.stringify(cred.toJSON());
    try {
        await AsyncStorage.setItem(credentialsKey, strignified);
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
        await AsyncStorage.removeItem(credentialsKey);
        return true;
    } catch (e) {
        return false;
    }
}

export interface NotificationsInterface {
    [key: string]: boolean;
}

export async function readNotifications(): Promise<
    NotificationsInterface | undefined
> {
    const storageRes = await AsyncStorage.getItem(notificationsKey);
    if (!storageRes) {
        return undefined;
    }
    return JSON.parse(storageRes);
}

export async function storeNotifications(
    notifications: NotificationsInterface,
): Promise<boolean> {
    const strignified = JSON.stringify(notifications);
    try {
        await AsyncStorage.setItem(notificationsKey, strignified);
        return true;
    } catch {
        return false;
    }
}
