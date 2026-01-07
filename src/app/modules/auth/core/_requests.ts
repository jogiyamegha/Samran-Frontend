import axios from 'axios';
import { AuthModel, UserModel } from './_models';
const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login(email: string, password: string) {
    return axios.post<AuthModel>(LOGIN_URL, {
        email, password
    })
}

//Server should return AuthModel
export function register(
    firstName: string,
    lastName: string,
    email : string,
    password: string,
    password_confirmation: string
) {
    return axios.post(REGISTER_URL, {
        email,
        firstName: firstName,
        lastName: lastName,
        password,
        password_confirmation
    });
}

// server should return object => {result : boolean} (Is Email in DB)
export function requestPassword(email : string) {
    return axios.post<{ result: boolean }> (REQUEST_PASSWORD_URL, {
        email
    })
}

export function getUserByToken(token: string) {
    return axios.post<UserModel> (GET_USER_BY_ACCESSTOKEN_URL, {
        api_token: token
    })
}
