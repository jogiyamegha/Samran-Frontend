export const PREF_TOKEN = "bearerToken";
export const IS_INTRO = "/";
export const IS_LOGIN = "Login";
// export const BASE_URL = "https://api.symboint.com";
export const BASE_URL = import.meta.env.VITE_APP_API_URL || "http://127.0.0.1:3000/";
export const IMAGE_URL = BASE_URL;
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
    function CMSTypes() { }
    CMSTypes.AboutUs = 1;
    CMSTypes.PrivacyPolicy = 2;
    CMSTypes.TermsAndCondition = 3;
    CMSTypes.ContactUs = 4;
    return CMSTypes;
})();

export const PropertyTypes = (function () {
    function PropertyTypes() { };
    PropertyTypes.HousingSociety = 1;
    PropertyTypes.ManufacturingUnit = 2;
    return PropertyTypes;
})();

export const PlantStatus = (function () {
    function PlantStatus() { };
    PlantStatus.Submitted = 1;
    PlantStatus.Approved = 2;
    PlantStatus.Rejected = 3;

    return PlantStatus;
})();

export const UserTypes = (function () {
    function UserTypes() { }
    UserTypes.Admin = 1;
    UserTypes.Investor = 2;
    UserTypes.Consumer = 3;
    return UserTypes;
})();

export const Months = (function Months() {
    function Months() { };
    Months.January = 1;
    Months.February = 2;
    Months.March = 3;
    Months.April = 4;
    Months.May = 5;
    Months.June = 6;
    Months.July = 7;
    Months.August = 8;
    Months.September = 9;
    Months.October = 10;
    Months.November = 11;
    Months.December = 12;

    return Months;
})();

export const UserPaymentMethod = (function () {
    function UserPaymentMethod() { };
    UserPaymentMethod.Cash = 1;
    UserPaymentMethod.Online = 2;

    return UserPaymentMethod;
})();

export const TransactionType = (function () {
    function TransactionType() { };
    TransactionType.BillPayment = 1;
    TransactionType.Return = 2;
    TransactionType.InvestorReturn = 3;
    TransactionType.WalletDeposit = 4;

    return TransactionType;
})();

export const TransactionStatus = (function () {
    function TransactionStatus() { };
    TransactionStatus.Pending = 1;
    TransactionStatus.Successful = 2;
    TransactionStatus.Failed = 3;
    TransactionStatus.InProgress = 4;

    return TransactionStatus;
})();