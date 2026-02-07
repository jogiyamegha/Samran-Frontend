import secureLocalStorage from 'react-secure-storage';
import { AuthModel, UserModel } from './_models';
import { PAGE_LIMIT } from '../../../../utils/constants';
import { languages } from 'prismjs';
const AUTH_LOCAL_STORAGE_KEY = 'auth-admin-v';
const AUTH_LOCAL_STORAGE_USER_KEY = 'auth-admin';

const getAuth = (): AuthModel | undefined => {
    if (!secureLocalStorage) {
        return
    }

    const lsValue: any = secureLocalStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
    if (!lsValue || lsValue === '' || lsValue === '""') {
        return;
    }

    try {
        if (typeof lsValue === 'object') {
            return lsValue as AuthModel;
        }
        const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
        if (auth) {
            return auth;
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    }
}

const setAuth = (auth: AuthModel) => {
    if (!secureLocalStorage) {
        return;
    }
    try {
        const lsValue = JSON.stringify(auth);
        secureLocalStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
    }
}

const removeAuth = () => {
    if (!secureLocalStorage) {
        return;
    }
    try {
        secureLocalStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
    }
}

const getUser = (): UserModel | undefined => {
    if (!secureLocalStorage) {
        return;
    }
    const lsValue: any = secureLocalStorage.getItem(AUTH_LOCAL_STORAGE_USER_KEY);
    if (!lsValue || lsValue === '' || lsValue === '""') {
        return;
    }
    try {
        if (typeof lsValue === 'object') {
            return lsValue as UserModel;
        }
        const auth: UserModel = JSON.parse(lsValue) as UserModel;
        if (auth) {
            // You can easily check auth_token expiration also
            return auth;
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
    }
}

const setUser = (auth: UserModel) => {
    if (!secureLocalStorage) {
        return;
    }
    try {
        const lsValue = JSON.stringify(auth);
        secureLocalStorage.setItem(AUTH_LOCAL_STORAGE_USER_KEY, lsValue);
        secureLocalStorage.setItem("PAGE_LIMIT", PAGE_LIMIT);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
    }
}

const setPageLimit = (limit: number) => {
    if (!secureLocalStorage) {
        return;
    }
    try {
        secureLocalStorage.setItem('PAGE_LIMIT', limit);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
    }
}

const getPageLimit = () => {
    const lsValue: any = secureLocalStorage.getItem('PAGE_LIMIT');
    if (!lsValue || lsValue === '' || lsValue === '""') {
        return;
    }
    try {
        if (typeof lsValue === 'object' || typeof lsValue === 'number') {
            return lsValue;
        }
        const limit: any = JSON.parse(lsValue);
        if (limit) {
            return limit;
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
    }
}

const removeUser = () => {
    if (!secureLocalStorage) {
        return;
    }
    try {
        secureLocalStorage.removeItem(AUTH_LOCAL_STORAGE_USER_KEY);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
    }
}

export {
    getAuth,
    setAuth,
    removeAuth,
    AUTH_LOCAL_STORAGE_KEY,
    removeUser,
    getPageLimit,
    setPageLimit,
    setUser,
    getUser,
}