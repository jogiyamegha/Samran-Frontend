import {ILoginData, IForgotPassword, IUpdateProfile, IChangePassword, IResetPassword} from '../../types'
import { IVerifyOTP } from '../../types/request_data/auth';

export const APIJSON = {
    login: ({email, password}: ILoginData) => {
        return {
            email: email,
            password: password,
        }
    },
    forgotPassword : ({email}: IForgotPassword) => {
        return {
            email: email
        }
    },
    resetPassword: ({confirmPassword, newPassword, resetToken}: IResetPassword) => {
        return {
            confirmPassword: confirmPassword,
            newPassword: newPassword,
            resetToken: resetToken,
        };
    },
    updateProfile: ({ usersData }: IUpdateProfile) => {
        return {
            first_name: usersData.firstname,
            last_name: usersData.lastName,
        };
    },
    changePassword: ({ oldPassword,newPassword }: IChangePassword)=>{
        return{
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
} 