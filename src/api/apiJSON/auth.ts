import { ILoginData, IForgotPassword, IUpdateProfile, IChangePassword, IResetPassword, ISignUpData } from '../../types'
import { IVerifyOTP } from '../../types/request_data/auth';

export const APIJSON = {
    login: ({ email, password }: ILoginData) => {
        return {
            email: email,
            password: password,
        }
    },
    forgotPassword: ({ email }: IForgotPassword) => {
        return {
            email: email
        }
    },
    resetPassword: ({ confirmPassword, newPassword, code, email }: any) => {
        return {
            confirmPassword: confirmPassword,
            newPassword: newPassword,
            code: code,
            email: email
        };
    },
    updateProfile: ({ usersData }: IUpdateProfile) => {
        return {
            first_name: usersData.firstname,
            last_name: usersData.lastName,
        };
    },
    changePassword: ({ oldPassword, newPassword }: IChangePassword) => {
        return {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
    },
    verifyOTP: ({ otp, email }: IVerifyOTP) => {
        return {
            otp: otp,
            email: email,
        };
    },
    register: ({ name, email, phone, password, userType, phoneCountry }: ISignUpData) => {
        return {
            name: name,
            email: email,
            phone: phone,
            password: password,
            userType: userType,
            phoneCountry: phoneCountry || 'IN'
        }
    },
} 
