export interface ListUser {
    profilePicture: string;
    name: string;
    email: string;
    userType: number;
    phoneCountry: string;
    phone: string;
    isActive: boolean;
    _createdAt: string;
    _id: string;
    addressDetail: {
        address: string,
        city: string,
        pincode: number
    }
}

export interface ListUserParams {
    page: number;
    limit: number;
    sortKey: string;
    sortOrder: number;
    needCount: boolean;
    searchTerm?: string;
    userType?: number | undefined;
}
