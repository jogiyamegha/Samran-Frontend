export interface IListBillParams {
    page: number;
    limit: number;
    sortKey: string;
    sortOrder: number;
    needCount: boolean;
    searchTerm?: string;
    ppaId?: string;
}

export interface IListBill {
    _id: string,
    ppaDetail: {
        ppaId: string,
        plantId: string,
        userId: string,
        ppaUniqueId: string,
        ppaName: string,
        plantUniqueId: string,
        plantUniqueName: string,
        tarrif : number,
        plantCapacity : number,
    },
    billingMonth: number,
    billingYear: number,
    generatedUnits: number,
    consumedUnits: number,
    exportedUnits: number,
    totalAmount: number,
    isPaid: boolean,
    paymentRefId: string,
    paymentDate: string,
    deleted: boolean,
}