export interface ListUser {
    firstName: string;
    lastName: string;
    userType: number;
    email: string;
    phone: string;
    countryCode: string;
    image: string;
    approved: boolean;
    _createdAt: string;
    _id: string;
    sagePayrollCode: string;
}

export interface ListUserParams {
    page: number;
    limit: number;
    sortKey: string;
    sortOrder: number;
    userType?: number;
    needCount: boolean;
    searchTerm?: string;
    startDate?: string;
    endDate?: string;
}