import {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
// import { Authentication } from '../../../../utils/string';
// import OtpInput from '../../../custom/otp-input/otp-input';
import APICallService from "../../../../api/apiCallService";
import {AUTH} from "../../../../api/apiEndPoints";
import {APIJSON} from "../../../../api/apiJSON/auth";
// import { success } from '../../../../Global/toast';
import {Auth} from "../../../../utils/toast";
import {success, error} from "../../../../global/toast";
import OtpInput from "../../../custom/otp-input";
import clsx from "clsx";
import Logo from "../../../../_admin/assets/media/svg/authLogo.svg";

export function VerifyOTP() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string[]>([]);
    const [seconds, setSeconds] = useState(59);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const {state}: any = useLocation();
    const [email, setEmail] = useState(state?.email);
    const {search} = useLocation();

    useEffect(() => {
        inputRefs.current[0].focus();
    }, []);

    useEffect(() => {
        // Only check email on initial mount or when search changes
        const params = new URLSearchParams(search);
        const emailFromUrl = params.get("email");

        // Set email from URL if available
        if (emailFromUrl) {
            setEmail(emailFromUrl);
            console.log("Email from URL:", emailFromUrl);
        } else if (state?.email && !email) {
            // Only set from state if email is not already set
            setEmail(state.email);
        }

        // Only redirect if no email is found in URL, state, or current email state
        if (!emailFromUrl && !state?.email && !email) {
            navigate("/auth/login");
            return;
        }

        window.history.pushState({name: "browserBack"}, "on browser back click", window.location.href);
        const onBackPress = (event: any) => {
            if (event.state) {
                navigate("/auth/login");
            }
        };
        window.addEventListener("popstate", onBackPress);
        return () => {
            window.removeEventListener("popstate", onBackPress);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]); // Only depend on search to prevent redirect on resend OTP

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                const temp = seconds;
                setSeconds(temp - 1);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) {
            return; // Only allow numeric input
        }
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus forward if a number is entered (for 4-digit OTP, last index is 3)
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newOtp = [...otp];

            newOtp[index] = "";
            setOtp(newOtp);

            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleResendOtp = async () => {
        if (!email) {
            error("Email is required");
            return;
        }
        setLoading(true);
        const apiService = new APICallService(AUTH.resendOTP, {
            email,
            isCallForResend: true,
        });
        const response = await apiService.callAPI();
        console.log("resend otp response:", response);
        if (response) {
            setOtp([]);
            success(Auth.optSent);
            setSeconds(59);
            // Clear input refs
            inputRefs.current.forEach((ref) => {
                if (ref) ref.value = "";
            });
            inputRefs.current[0]?.focus();
        }
        setLoading(false);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedText = e.clipboardData.getData("text").trim();

        if (/^\d{4}$/.test(pastedText)) {
            setOtp(pastedText.split(""));

            pastedText.split("").forEach((char, index) => {
                if (inputRefs.current[index]) {
                    inputRefs.current[index].value = char;
                }
            });

            inputRefs.current[3]?.focus(); // Focus on last digit (4th digit, index 3)
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            error("Email is required");
            return;
        }

        if (otp.length < 4 || otp.some((value) => !value)) {
            error("Please enter a valid 4-digit OTP");
            return;
        }

        setLoading(true);

        const apiService = new APICallService(AUTH.verifyOTP, APIJSON.verifyOTP({otp: otp.join(""), email}));
        const response = await apiService.callAPI();

        if (response) {
            // Response is truthy means API call was successful (200 status)
            setLoading(false);
            navigate("/user/verify-details/verification-success");
        } else {
            // Response is 0 or falsy means there was an error
            // Error message is already shown by the API call service through toast
            setLoading(false);
        }
    };
    return (
        <form
            className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            id="kt_login_password_reset_form"
            //   onSubmit={formik.handleSubmit}
            onSubmit={handleSubmit}
        >
            <div className="d-flex flex-column gap-10">
                <div className="d-flex justify-content-center align-items-center">
                    <img src={Logo} alt="logo" />
                </div>
            </div>

            <div className="d-flex flex-column align-items-center gap-2">
                {/* <img
          //   src={IMAGES.mailIcon2}
          src={IMAGES.AdminLogo}
          alt="Plane Icon"
          height={53}
          width={53}
        /> */}
                <h2 className="fs-38 fw-600 text-center">Check your email</h2>
                <p className="fs-18 fw-400 text-secondary text-center">
                    To confirm your identity we'll send a verification code to <span className="fw-bold">{email}</span>
                </p>
            </div>
            <div className="px-lg-7">
                <div className="d-flex flex-wrap mb-2 justify-content-center">
                    <div className="d-flex flex-wrap">
                        <OtpInput
                            value={otp}
                            valueLength={4}
                            onChange={handleChange}
                            inputRefs={inputRefs}
                            onKeyDown={handleKeyDown}
                            onPaste={handlePaste}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    id="kt_sign_in_submit"
                    className="btn btn-primary btn-lg w-100 mt-7 custom-button"
                    disabled={otp.length < 4 || otp.some((value) => !value)}
                >
                    {!loading && (
                        <span className="indicator-label fs-16 fw-bolder">
                            {/* {Authentication.Continue} */}
                            continue
                        </span>
                    )}
                    {loading && (
                        <span className="indicator-progress fs-16 fw-bold" style={{display: "block"}}>
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    )}
                </button>
                <div className="text-center mt-7">
                    {seconds > 0 ? (
                        <>
                            Resend OTP In{" "}
                            <span className="fs-14 fw-500">
                                00:{seconds < 10 && 0}
                                {seconds}
                            </span>
                        </>
                    ) : (
                        <>
                            Didn't receive a code?{" "}
                            <Link
                                to="#"
                                className="fs-16 fw-normal text-dark fw-bold"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleResendOtp();
                                }}
                            >
                                Resend OTP
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
