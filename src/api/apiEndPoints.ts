// API END-POINTS
import * as constants from '../utils/constants';
/**------------------Authentication-------------------- */
export const ADMIN_LOGIN = 'admin/login' + " " + constants.POST_RAW;
export const USER_LOGIN = 'user/login' + " " + constants.POST_RAW;
export const USER_SIGNUP = 'user/signup' + " " + constants.POST_RAW;
export const ADMIN_LOGOUT = 'admin/logout' + " " + constants.POST_RAW;
export const USER_LOGOUT = 'user/logout' + " " + constants.POST_RAW;

export const LOGIN = ADMIN_LOGIN;
export const LOGOUT = ADMIN_LOGOUT;
export const AUTH = {
    FORGOT_PASSWORD: 'admin/password/forgot' + ' ' + constants.POST_RAW,
    RESET_PASSWORD: 'admin/password/reset' + ' ' + constants.POST_RAW,
    CHANGE_PASSWORD: 'admin/password/change' + ' ' + constants.PATCH,
    USER_FORGOT_PASSWORD: 'user/forgot/password' + ' ' + constants.POST_RAW,
    USER_RESET_PASSWORD: 'user/reset/password' + ' ' + constants.POST_RAW,
    verifyOTP: "user/verify-details" + " " + constants.PATCH,
    resendOTP: "user/confirm-details" + " " + constants.GET_URL_PARAMS,
}

export const PLANT = {
    ADDPLANT: 'admin/plant/add' + ' ' + constants.POST_FORM,
    LISTPLANT: 'admin/plant/list' + ' ' + constants.GET_URL_PARAMS,
    PLANTINFO: 'admin/plant/info' + ' ' + constants.PATCH_FORM_ID,
    PLANTSTATUSUPDATE: 'admin/plant/status/update' + ' ' + constants.PATCH_ID,
    DOWNLOADREPORT: 'admin/plant/report/download' + ' ' + constants.GET_URL_PARAMS,
    EDITPLANT: 'admin/plant/edit' + ' ' + constants.PATCH_ID,
    EDITPLANT_FORM: 'admin/plant/edit' + ' ' + constants.PATCH_FORM_ID,
    DELETEPLANT: 'admin/plant/delete' + ' ' + constants.DELETE_ID_PARAMS,
}

export const PPA = {
    ADDPPA: 'admin/ppa/create' + ' ' + constants.POST_FORM,
    LISTPPA: 'admin/ppa/list' + ' ' + constants.GET_URL_PARAMS,
    PPAINFO: 'admin/ppa/info' + ' ' + constants.PATCH_FORM_ID,
    SIGNPPA: 'admin/ppa/sign' + ' ' + constants.PATCH_ID,
}

export const Bill = {
    ADDBILL: 'admin/bill/generate' + ' ' + constants.POST_RAW,
    LISTBILL: 'admin/bill/list' + ' ' + constants.GET_URL_PARAMS,
    BILLINFO: 'admin/bill/info' + ' ' + constants.PATCH_FORM_ID,
    DOWNLOADREPORT: 'admin/bill/report/download' + ' ' + constants.GET_URL_PARAMS,
    EDITBILL: 'admin/bill/edit' + ' ' + constants.PATCH_ID
}

export const PAYMENT = {
    UPDATECASHPAYMENT: 'admin/update/cash-payment' + ' ' + constants.PATCH_ID
}

export const WALLET = {
    LISTTRANSACTIONS: 'admin/wallet/transactions' + ' ' + constants.GET_URL_PARAMS,
    APPROVEDEPOSIT: 'admin/wallet/approve-deposit' + ' ' + constants.PATCH_ID,
}

export const DASHBOARD = {
    GET_DASHBOARD_DATA: "admin/dashboard" + " " + constants.GET,
};

export const USER = {
    ADDUSER: 'admin/user/add' + ' ' + constants.POST_FORM,
    EDITUSER: 'admin/user/edit' + ' ' + constants.PATCH_ID,
    LISTUSER: 'admin/user/list' + ' ' + constants.GET_URL_PARAMS,
    DELETEUSER: 'admin/user/delete' + ' ' + constants.DELETE_ID_PARAMS,
    GETUSERSITEJOBS: 'admin/user' + ' ' + constants.GET_ID_PARAMS,
    GETUSERTIMELOGS: "admin/user/time-logs" + " " + constants.GET_ID_PARAMS,
    UPDATE_PROFILE: 'user/profile/update' + ' ' + constants.PATCH,
}

export const CMS = {
    PRIVACY_POLICY: "/admin/privacy-policy" + " " + constants.GET,
    UPDATE_PRIVACY_POLICY: "/admin/edolicy" + " " + constants.GET,
    TERMS_CONDITION: "/admin/terms-conditions" + " " + constants.GET,
    UPDATE_TERMS_CONDITIONS: "/admin/edit-terms-conditions" + " " + constants.POST_RAW,
    CONTACT_US: "/admin/contact-us" + " " + constants.GET,
    UPDATE_CONTACT_US: "/admin/edit-contact-us" + " " + constants.POST_RAW,
    ADD_FAQ: "/admin/faq/add" + " " + constants.POST_URL_ENCODED,
    GET_FAQ: "/admin/faq/list" + " " + constants.GET_URL_PARAMS,
    UPDATE_FAQ: "/admin/faq/update" + " " + constants.PATCH_FORM_ID_URL_ENCODED,
    DELETE_FAQ: "/admin/faq/delete" + " " + constants.DELETE_ID_PARAMS,
    GET_APP_SETTINGS: "/admin/app-settings" + " " + constants.GET_URL_PARAMS,
    UPDATE_APP_SETTINGS: "/admin/app-settings" + " " + constants.PATCH,
    SETTINGS: "/admin/device-speed-movement" + " " + constants.GET,
    UPDATE_SETTINGS: "/admin/device-speed-movement" + " " + constants.PATCH_URL_ENCODED,
}

export const FIELDTYPE = {
    LISTFIELDTYPE: "admin/fieldType/list" + " " + constants.GET_URL_PARAMS,
    DELETEFIELDTYPE: "admin/fieldType/delete" + " " + constants.DELETE_ID_PARAMS,
    ADDFIELDTYPE: "admin/fieldType/add" + " " + constants.POST_RAW,
    EDITFIELDTYPE: "admin/fieldType/edit" + " " + constants.PATCH_ID,
    UPDATESTATUS: "admin/fieldType/edit-status" + " " + constants.PATCH_ID,
}

export const INVESTOR = {
    PORTFOLIO: 'investor/portfolio' + ' ' + constants.GET,
    MY_INVESTMENTS: 'investor/my-investments' + ' ' + constants.GET,
    INVESTMENT_DETAIL: 'investor/my-investments' + ' ' + constants.GET_ID_PARAMS,
    PAYOUTS: 'investor/payouts' + ' ' + constants.GET,
    AVAILABLE_INVESTMENTS: 'investor/available-investments' + ' ' + constants.GET,
}