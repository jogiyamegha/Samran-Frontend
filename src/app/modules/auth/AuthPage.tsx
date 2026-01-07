import { Route, Routes } from 'react-router-dom';
import { ForgotPassword } from './components/ForgotPassword';
import { Login } from './components/Login';
import { AuthLayout } from './AuthLayout';
import { ResetPassword } from './components/Newpassword';
import { Successfull } from './components/Successful';

const AuthPage = () => (
    <div
        className="overflow-lg-hidden"
        style={{
            position: "relative",
            height: "100%",
            minHeight: "100dvh",
        }}
    >
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="success" element={<Successfull />} />
                {/* <Route path="otp-success" element={<OtpSuccessfull />} />
                <Route path="verify-otp" element={<VerifyOTP />} />
                <Route path="verification-success" element={<OtpSuccessfull />} /> */}
                <Route index element={<Login />} />
            </Route>
        </Routes>
    </div>
)

// Public route component for user verification
export const UserVerifyDetails = () => (
    <div
        className="overflow-lg-hidden"
        style={{
            position: "relative",
            height: "100%",
            minHeight: "100dvh",
        }}
    >
        {/* <Routes>
            <Route element={<AuthLayout />}>
                <Route index element={<VerifyOTP />} />
                <Route path="verification-success" element={<OtpSuccessfull />} />
            </Route>
        </Routes> */}
    </div>
);

export {AuthPage};
