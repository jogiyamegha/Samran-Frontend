export interface IListPlantParams {
    page: number;
    limit: number;
    needCount: boolean;
    searchTerm?: string;
    sortKey?: string;
    sortOrder?: number;
    userId? : string;
    plantStatus? : number;
    propertyType? : number;
}

export interface IListPlant {
    _id: string,
    userDetails: {
        userId: string,
        userType: number,
        name : string,
    },
    propertyAddress: {
        propertyName: string,
        propertyType: number,
        address: string,
        city: string,
        state: string,
        pincode: number,
        roofArea: number,
        billAmount: number,
        billImage: string,
        electricityRate: string,
    },
    plantStatus: number,
    approvedBy: {
        userDetails: {
            userId: string,
            userType: number,
            name : string,
            approvedOn: string
        },
    },
    rejectedBy: {
        userDetails: {
            userId: string,
            userType: number,
            name : string,
            rejectedOn: string,
            rejectionReason: string,
        },
    },
    isActive: boolean,
    deleted: boolean,
}

export interface Plant {
    _id: string,
    userDetails: {
        userId: string,
        userType: number,
        name : string,
    },
    propertyAddress: {
        propertyName: string,
        propertyType: number,
        address: string,
        city: string,
        state: string,
        pincode: number,
        roofArea: number,
        billAmount: number,
        billImage: string,
        electricityRate: string,
    },
    plantStatus: number,
    approvedBy: {
        userDetails: {
            userId: string,
            userType: number,
            name : string,
            approvedOn: string
        },
    },
    rejectedBy: {
        userDetails: {
            userId: string,
            userType: number,
            name : string,
            rejectedOn: string,
            rejectionReason: string,
        },
    },
    isActive: boolean,
    deleted: boolean,
}

export interface ApproveRejectPlantParams {
    _id: string;
    plantStatus: number | undefined;
    plantUniqueName: string | null;
    rejectionReason: string | null;
}