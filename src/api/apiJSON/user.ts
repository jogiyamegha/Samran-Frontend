import { IUserProfile } from '../../types';
import { ListUserParams } from '../../types/response_data/user';

export const USERAPIJSON = {
    addUser: ({
        name,
        email,
        phoneCountry,
        phone,
        userType,
    }: IUserProfile ) => {
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('email', email.trim());
        formData.append('phoneCountry', phoneCountry.trim());
        formData.append('phone', phone.trim());
        formData.append('userType', userType.toString());
        return formData;
    },

    // editUser: ({
    //     email,
    //     phone,
    //     countryCode,
    //     firstName,
    //     lastName,
    //     userType,
    //     image,
    // } : IUserProfile) => {
    //     return {
    //         email: email,
    //         phone: phone,
    //         countryCode: countryCode,
    //         firstName: firstName,
    //         lastName: lastName,
    //         userType: userType,
    //         image: image,
    //     };
    // },

    listUser: ({
        page,
        limit,
        userType,
        sortKey, 
        sortOrder,
        needCount,
        searchTerm,
        startDate,
        endDate,
    }: ListUserParams) => {
        return {
            pageNo: page,
            limit: limit,
            ...(searchTerm !== undefined && { searchTerm: searchTerm.trim() }),
            sortKey: sortKey,
            sortOrder: sortOrder,
            needCount: needCount,
            ...(userType !== undefined && { userType }),
            ...(startDate !== undefined && { startDate }),
            ...(endDate !== undefined && { endDate }),
        };
    }
}