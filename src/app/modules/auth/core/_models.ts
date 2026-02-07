export interface AuthModel {
    token: string
}
export interface UserModel {
    name: string;
    image?: string;
    profilePicture?: string;
    email: string;
    userType?: number;
    active?: boolean;
    roleAndPermission?: any;
    phoneCountry?: string;
    phone?: string;
    address?: string;
    createdAt?: string;
    id?: string;
}