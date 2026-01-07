// API END-POINTS
import * as constants from '../utils/constants';
/**------------------Authentication-------------------- */
export const LOGIN = 'admin/login' + " " + constants.POST_RAW;
export const LOGOUT = 'admin/logout' + " " + constants.POST_RAW;
export const AUTH = {
    FORGOT_PASSWORD: 'admin/password/forgot' + ' ' + constants.POST_RAW,
    RESET_PASSWORD: 'admin/password/reset' + ' ' + constants.POST_RAW,
    CHANGE_PASSWORD: 'admin/password/change' + ' ' + constants.PATCH,
    verifyOTP: "user/verify-details" + " " + constants.PATCH,
    resendOTP: "user/confirm-details" + " " + constants.GET_URL_PARAMS,
}

export const PLANT = {
    ADDPLANT : 'admin/plant/add' + ' ' + constants.POST_RAW,
    LISTPLANT : 'admin/plant/list' + ' ' + constants.GET_URL_PARAMS,
    PLANTINFO : 'admin/plant/info' + ' ' + constants.PATCH_FORM_ID,
    PLANTSTATUSUPDATE : 'admin/plant/status/update' + ' ' + constants.GET_ID_PARAMS,
}

export const PPA = {
    ADDPPA : 'admin/ppa/add' + ' ' + constants.POST_RAW,
    LISTPPA : 'admin/ppa/list' + ' ' + constants.GET_URL_PARAMS,
    PPAINFO : 'admin/ppa/info' + ' ' + constants.PATCH_FORM_ID,
}

export const DASHBOARD = {
    GET_DASHBOARD_DATA: "admin/dashboard" + " " + constants.GET,
};

export const USER = {
    ADDUSER: 'admin/user/add' + ' ' + constants.POST_FORM,
    EDITUSER: 'admin/user/edit' + ' ' + constants.PATCH_FORM_ID,
    LISTUSER: 'admin/user/list' + ' ' + constants.GET_URL_PARAMS,
    DELETEUSER: 'admin/user/delete' + ' ' + constants.DELETE_ID_PARAMS,
    GETUSERSITEJOBS: 'admin/user' + ' ' + constants.GET_ID_PARAMS,
    GETUSERTIMELOGS: "admin/user/time-logs" + " " + constants.GET_ID_PARAMS,
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