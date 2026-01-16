export interface IPpaData {
    plantDetail: {
        plantId: string,
        userId: number,
    },
    plantCapacity: number,
    tarrif : number,
    expectedYears : number,
    startDate: Date,
    endDate: Date,
    ppaDocument: string,
    leaseDocument: string,
    isSigned: boolean,
    signedAt: string,
    deleted : boolean,
    _createdAt: string,
    _updatedAt: string,
}

export interface IAddPpa {
    plantId: string | null,
    plantCapacity: number | null,
    tarrif : number | null,
    expectedYears : number | null,
    startDate: Date | null,
    ppaDocument: File | null,
    leaseDocument: File | null,
}