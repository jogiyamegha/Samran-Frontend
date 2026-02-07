import { IUserProfile } from '../../types';
import { ListUserParams } from '../../types/response_data/user';

export const USERAPIJSON = {
    addUser: ({
        name,
        email,
        phoneCountry,
        phone,
        userType,
        image,
    }: IUserProfile) => {
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('email', email.trim());
        formData.append('phoneCountry', phoneCountry.trim());
        formData.append('phone', phone.trim());
        formData.append('userType', userType.toString());
        if (image) {
            formData.append('profilePicture', image);
        }
        return formData;
    },

    editUser: ({
        email,
        phone,
        phoneCountry,
        name,
        userType,
        image,
    }: IUserProfile) => {
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('email', email.trim());
        formData.append('phoneCountry', phoneCountry.trim());
        formData.append('phone', phone.trim());
        formData.append('userType', userType.toString());
        if (image) {
            formData.append('profilePicture', image);
        }
        return formData;
    },

    listUser: ({
        page,
        limit,
        userType,
        sortKey,
        sortOrder,
        needCount,
        searchTerm,
    }: ListUserParams) => {
        return {
            pageNo: page,
            limit: limit,
            ...(searchTerm !== undefined && { searchTerm: searchTerm.trim() }),
            sortKey: sortKey,
            sortOrder: sortOrder,
            needCount: needCount,
            ...(userType !== undefined && { userType: userType.toString() }),
        };
    }
}