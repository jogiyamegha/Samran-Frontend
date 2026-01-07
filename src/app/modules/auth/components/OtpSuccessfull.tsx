import { useNavigate } from 'react-router-dom';
import Lock from '../../../../_admin/assets/media/svg/lock.svg';
import { Button } from 'react-bootstrap';

export function OtpSuccessfull() {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column gap-4">
            <div className="d-flex justify-content-center align-items-center">
                <img
                src={Lock}
                alt="Success Icon"
                />
            </div>
            <div className="d-flex justify-content-center align-items-center fs-3 fw-bold">
                OTP Verification Successful!
            </div>
            <div className="d-flex justify-content-center align-items-center text-center fs-5 fw-normal text-secondary">
                Thank you for verifying your OTP. You can now use all features
                through the Android app. Please download or open the app to continue.
            </div>
            {/* <div className="d-flex justify-content-center align-items-center w-100">
                <Button
                className="btn btn-primary w-100"
                onClick={() => navigate('/auth/login')} // Placeholder; adjust as needed
                >
                Go to Login
                </Button>
            </div> */}
        </div>
    );
}
