import {IAddPpa, IListPpaParams} from '../../types';
import Method from '../../utils/methods';

export const PPAAPIJSON = {
    AddPpa: ({
        ppaName,
        plantId,
        plantCapacity,
        tarrif,
        expectedYears,
        startDate,
        ppaDocument,
        leaseDocument,
    } : IAddPpa) => {
        const formData = new FormData();
        if (ppaName !== undefined && ppaName !== null) {
            formData.append("ppaName", ppaName);
        }
        if (plantId !== undefined && plantId !== null) {
            formData.append("plantId", plantId);
        }
        if (plantCapacity !== undefined && plantCapacity !== null) {
            formData.append("plantCapacity", plantCapacity.toString());        
        }
        if (tarrif !== undefined && tarrif !== null) {
            formData.append("tarrif", tarrif.toString());        
        }
        if (expectedYears !== undefined && expectedYears !== null) {
            formData.append("expectedYears", expectedYears.toString());        
        }
        if (startDate !== undefined && startDate !== null) {
            formData.append("startDate", Method.convertDateToFormat(startDate.toISOString(), "YYYY-MM-DD"));
        }
        if (ppaDocument !== undefined && ppaDocument !== null) {
            formData.append("ppaDocument", ppaDocument);        
        }
        if (leaseDocument !== undefined && leaseDocument !== null) {
            formData.append("leaseDocument", leaseDocument);        
        }
        return formData;
    },

    listPpa: ({
        page,
        limit,
        sortKey,
        sortOrder,
        needCount,
        searchTerm,
        plantId,
        isSigned,
    }: IListPpaParams) => {
        return {
            pageNo : page,
            limit,
            sortKey,
            sortOrder,
            needCount,
            ...(searchTerm !== undefined && {searchTerm: searchTerm.trim()}),
            ...(plantId !== undefined && {plantId: plantId.trim()}),
            ...(isSigned !== undefined && { isSigned })
        };
    }
}