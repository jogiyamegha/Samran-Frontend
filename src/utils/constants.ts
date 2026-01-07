export const PREF_TOKEN = "bearerToken";
export const IS_INTRO = "/";
export const IS_LOGIN = "Login";
// export const BASE_URL = "https://api.symboint.com";
export const BASE_URL = "http://127.0.0.1:3000/";
export const PAGE_LIMIT = 10;

// API TYPES
export const GET = "GET";
export const GET_URL_PARAMS = "GET_URL_PARAMS";
export const GET_ID_PARAMS = "GET_ID_PARAMS";
export const GET_ID_ENCODED = "GET_ID_ENCODED";
export const GET_URL_ENCODED = "GET_URL_ENCODED";
export const GET_URL_ID_PARAMS = "GET_URL_ID_PARAMS";
export const POST = "POST";
export const POST_ID_PARAMS = "POST_ID_PARAMS";
export const POST_RAW = "POST_RAW";
export const POST_FORM = "POST_FORM";
export const POST_URL_ENCODED = "POST_URL_ENCODED";
export const POST_URL_PARAMS = "POST_URL_PARAMS";
export const POST_URL_ENCODED_ID_PARAMS = "POST_URL_ENCODED_ID_PARAMS";
export const MULTI_PART_POST = "MULTI_PART";
export const PATCH = "PATCH";
export const PATCH_ID = "PATCH_ID";
export const PATCH_FORM = "PATCH_FORM";
export const PATCH_FORM_ID = "PATCH_FORM_ID";
export const PATCH_URL_ENCODED = "PATCH_URL_ENCODED";
export const PATCH_FORM_ID_URL_ENCODED = "PATCH_FORM_ID_URL_ENCODED";
export const MULTI_PART_ID_POST = "MULTI_PART";
export const MULTI_PART_ID_PATCH = "MULTI_PART_PATCH";
export const DELETE = "DELETE";
export const DELETE_URL_PARAMS = "DELETE_URL_PARAMS";
export const DELETE_URL_ENCODED = "DELETE_URL_ENCODED";
export const DELETE_ID_PARAMS = "DELETE_ID_PARAMS";

//Response
export const ResponseFail = 400;
export const ResponseSuccess = 200;
export const AuthError = 401;
export const Maintenance = 503;

// Otp timer
export const OtpSeconds = 59;


// CMS Types
export const CMSTypes = (function () {
    function CMSTypes() {}
    CMSTypes.AboutUs = 1;
    CMSTypes.PrivacyPolicy = 2;
    CMSTypes.TermsAndCondition = 3;
    CMSTypes.ContactUs = 4;
    return CMSTypes;
})();

export const ReceiverType = (function () {
    function ReceiverType() {}
    ReceiverType.SuperVisor = 2;
    ReceiverType.Employee = 3;
    ReceiverType.Subcontractor = 4;
    ReceiverType.Everyone = 5;
    return ReceiverType;
})();

export const NotificationType = (function () {
    function NotificationType() {}
    NotificationType.System = 1;
    NotificationType.Custom = 2;
    NotificationType.ApplyLeave = 3;
    NotificationType.ActionLeave = 4;
    NotificationType.ActionTimesheet = 5;
    NotificationType.ActionRequisition = 6;
    NotificationType.ActionJob = 7;
    NotificationType.Reminder = 8;
    NotificationType.AttendanceAlert = 9;
    NotificationType.TimesheerAlert = 10;
    NotificationType.UnsubmittedTimesheetAlert = 11;
    NotificationType.TimesheetSubmissionReminder = 12;
    return NotificationType;
})();

export const BottleStatus = (function () {
    function BottleStatus() {}
    BottleStatus.Available = 1;
    BottleStatus.OnSite = 2;
    BottleStatus.Returned = 3;
    BottleStatus.Generated = 4;
    return BottleStatus;
})();
export const ToolStatus = (function () {
    function ToolStatus() {}
    ToolStatus.Available = 1;
    ToolStatus.OnSite = 2;
    ToolStatus.Returned = 3;
    ToolStatus.Generated = 4;
    return ToolStatus;
})();
