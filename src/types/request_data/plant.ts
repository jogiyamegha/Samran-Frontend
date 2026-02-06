export interface IPlantData {
    userDetails: {
        userId: string,
        userType: number,
        name : string,
    },
    propertyAddress: {
        propertyName: string,
        propertyTypes: number,
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

export interface IAddPlant {
    userId : string | null,
    propertyName: string,
    propertyType: number,
    address: string,
    city : string,
    state: string,
    pincode: number | null,
    roofArea: number | null,
    billAmount: number | null,
    billImage : File | null,
    electricityRate: number | null,
}

export interface IEditPlant {
    plantUniqueName: string;
    userId: string;
    propertyName: string;
    propertyType: number;
    address: string;
    city: string;
    state: string;
    pincode: number;
    roofArea: number;
    billAmount: number;
    electricityRate: number;
    billImage: File | null;
}