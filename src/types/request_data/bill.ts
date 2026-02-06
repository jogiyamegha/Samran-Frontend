export interface IBillData {
    ppaDetail: {
        ppaId: string,
        plantId: string,
        userId: string,
        tarrif: number,
        plantCapacity: number,
    },
    billingMonth: number,
    billingYear: number,
    generatedUnits: number,
    consumedUnits: number,
    exportedUnits: number,
    totalAmount: number,
    isPaid: boolean,
}

export interface IAddBill {
    ppaId: string | null,
    billingMonth: number | null,
    billingYear: number | null,
    generatedUnits: number | null,
    consumedUnits: number | null,
    exportedUnits: number | null,
}

export interface IEditBill {
    generatedUnits: number | null,
    consumedUnits: number | null,
    exportedUnits: number | null,
}