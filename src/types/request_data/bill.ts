export interface IListBillParams {
    page: number;
    limit: number;
    sortKey: string;
    sortOrder: number;
    needCount: boolean;
    ppaId?: string;
}

export interface IUploadBill {
    ppaId: string,
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
    _createdAt: string,
    _updatedAt: string,
}