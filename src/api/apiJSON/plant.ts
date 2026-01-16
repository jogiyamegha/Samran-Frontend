import { IListPlantParams } from '../../types';
import { IAddPlant } from '../../types/request_data/plant';
import { ApproveRejectPlantParams } from '../../types/response_data/plant';

export const PLANTAPIJSON = {
    AddPlant: ({
        userId,
        propertyName,
        propertyType,
        address,
        city,
        state,
        pincode,
        roofArea,
        billAmount,
        billImage,
        electricityRate,
    } : IAddPlant) => {
        const formData = new FormData();
        if (userId !== undefined && userId !== null) {
            formData.append("userId", userId);
        }
        if (propertyName !== undefined && propertyName !== null) {
            formData.append("propertyName", propertyName.trim());        
        }
        if (propertyType !== undefined && propertyType !== null) {
            formData.append("propertyType", propertyType.toString());        
        }
        if (address !== undefined && address !== null) {
            formData.append("address", address.trim());        
        }
        if (city !== undefined && city !== null) {
            formData.append("city", city.trim());        
        }
        if (state !== undefined && state !== null) {
            formData.append("state", state.trim());        
        }
        if (pincode !== undefined && pincode !== null) {
            formData.append("pincode", pincode.toString());        
        }
        if (billAmount !== undefined && billAmount !== null) {
            formData.append("billAmount", billAmount.toString());        
        }
        if (roofArea !== undefined && roofArea !== null) {
            formData.append("roofArea", roofArea.toString());        
        }
        if (billImage !== undefined && billImage !== null) {
            formData.append("billImage", billImage);        
        }
        if (electricityRate !== undefined && electricityRate !== null) {
            formData.append("electricityRate", electricityRate.toString());        
        }
        return formData;
    },

    listPlant: ({
        page,
        limit,
        sortKey,
        sortOrder,
        needCount,
        searchTerm,
        userId,
        plantStatus,
        propertyType
    }: IListPlantParams) => {
        return {
            pageNo : page,
            limit,
            sortKey,
            sortOrder,
            needCount,
            ...(searchTerm !== undefined && {searchTerm: searchTerm.trim()}),
            ...(userId !== undefined && {userId: userId.trim()}),
            ...(plantStatus !== undefined && plantStatus !== null && {plantStatus}),
            ...(propertyType !== undefined && propertyType !== null && {propertyType}),
        };
    },
    ApproveRejectPlant: ({
        _id,
        plantStatus,
        plantUniqueName,
        rejectionReason
    }: ApproveRejectPlantParams) => {
        return {
            _id,
            plantStatus,
            plantUniqueName,
            rejectionReason
        }
    }
}