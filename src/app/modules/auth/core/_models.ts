export interface AuthModel {
    token : string
}
export interface UserModel {
    firstName : string;
    lastName : string;
    image? : string;
    email: string;
    userType?: number;
    active?: boolean;
    roleAndPermission?: any;
    phoneCountry?: string;
    phone?: string;
}