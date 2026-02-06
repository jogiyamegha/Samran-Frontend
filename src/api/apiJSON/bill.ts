import { IListBillParams } from "../../types";
import {IAddBill, IEditBill} from '../../types/request_data/bill';
export const BILLAPIJSON = {
    AddBill: ({
        ppaId,
        billingMonth,
        billingYear,
        generatedUnits,
        consumedUnits,
        exportedUnits,
    }: IAddBill) => ({
        ppaId,
        billingMonth,
        billingYear,
        generatedUnits,
        consumedUnits,
        exportedUnits,
    }),

    EditBill: ({
        generatedUnits,
        consumedUnits,
        exportedUnits,
    } : IEditBill) => ({
        generatedUnits,
        consumedUnits,
        exportedUnits,
    }),

    listBill: ({
        page,
        limit,
        sortKey,
        sortOrder,
        needCount,
        searchTerm,
        ppaId
    }: IListBillParams) => {
        return {
            pageNo : page,
            limit,
            sortKey,
            sortOrder,
            needCount,
            ...(searchTerm !== undefined && {searchTerm: searchTerm.trim()}),
            ...(ppaId !== undefined && {ppaId: ppaId.trim()}),
        };
    }
}