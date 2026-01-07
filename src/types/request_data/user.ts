export interface IUserProfile {
    _id: string;
    name: string;
    email: string;
    phoneCountry: string;
    phone: string;
    userType: number;
    isActive?: boolean;
}

