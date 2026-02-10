import {IAddPpa, IListPpaParams} from '../../types';
import { IEditPpa } from '../../types/request_data/ppa';
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

    editPpa: ({
        ppaName,
        plantId,
        plantCapacity,
        tarrif,
        expectedYears,
        startDate,
        ppaDocument,
        leaseDocument,
    }: IEditPpa) => {
        const formData = new FormData();

        formData.append('ppaName', ppaName!);
        formData.append('plantId', plantId!);
        formData.append('plantCapacity', plantCapacity!.toString());
        formData.append('tarrif', tarrif!.toString());
        formData.append('expectedYears', expectedYears!.toString());
        formData.append(
        'startDate',
        Method.convertDateToFormat(startDate!.toISOString(), 'YYYY-MM-DD')
        );

        if (ppaDocument instanceof File){
            formData.append('ppaDocument', ppaDocument);
        }

        if (leaseDocument instanceof File) {
            formData.append('leaseDocument', leaseDocument);
        }

        return formData;
    },

    editPpaWithoutFile: ({
        ppaName,
        plantId,
        plantCapacity,
        tarrif,
        expectedYears,
        startDate,
    }: Omit<IEditPpa, 'ppaDocument' | 'leaseDocument'>) => ({
        ppaName,
        plantId,
        plantCapacity,
        tarrif,
        expectedYears,
        startDate: Method.convertDateToFormat(
            startDate!.toISOString(),
            'YYYY-MM-DD'
        ),
    }),

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