import * as Yup from 'yup';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../core/Auth';
import { useState } from 'react';
import APICallService from '../../../../api/apiCallService';
import { USER_LOGIN } from '../../../../api/apiEndPoints';
import { APIJSON } from '../../../../api/apiJSON/auth';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Password must be at least 3 characters')
        .required('Password is required')
});

const initialValues = {
    email: '',
    password: '',
}

export function Login() {
    const [loading, setLoading] = useState(false);
    const { saveAuth, saveCurrentUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true);
            const apiService = new APICallService(
                USER_LOGIN,
                APIJSON.login({ email: values.email, password: values.password })
            );

            try {
                const response = await apiService.callAPI();
                if (response) {
                    saveAuth({ token: response?.token });
                    const userData = response?.user || response?.admin;
                    saveCurrentUser(userData);

                    // Redirect based on user type
                    if (userData?.userType === 1) { // Admin
                        navigate('/dashboard');
                    } else if (userData?.userType === 2) { // Investor
                        navigate('/investor/dashboard');
                    } else if (userData?.userType === 3) { // Consumer
                        navigate('/consumer/dashboard');
                    } else {
                        navigate('/dashboard');
                    }
                } else {
                    setStatus('The login details are incorrect');
                    saveAuth(undefined);
                    saveCurrentUser(undefined);
                }
            } catch (error) {
                console.error("Login error:", error);
                setStatus('The login details are incorrect');
                saveAuth(undefined);
                saveCurrentUser(undefined);
            }

            setLoading(false);
            setSubmitting(false);
        }
    });

    return (
        <form
            className="form w-100"
            onSubmit={formik.handleSubmit}
            noValidate
        >
            <div className="text-center mb-12">
                <h1 className="text-[#0b1f33] fw-black mb-3 display-6 tracking-tight">Sign In</h1>
                <div className="text-slate-500 fw-bold fs-5">
                    New here? <Link to="/auth/registration" className="text-[#0f766e] hover:text-[#43EBA6] fw-bolder text-decoration-none transition-colors">Create an account</Link>
                </div>
            </div>

            {formik.status && (
                <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
                    <i className="fas fa-exclamation-circle text-danger fs-3 me-3"></i>
                    <div className="fw-semibold">{formik.status}</div>
                </div>
            )}

            <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bold text-[#0b1f33] text-uppercase ls-1">Email Address</label>
                <input
                    placeholder="name@company.com"
                    {...formik.getFieldProps('email')}
                    className={clsx(
                        'form-control form-control-solid p-4 border-2 border-slate-200 focus:border-[#43EBA6] rounded-xl fs-5 bg-slate-50 transition-all',
                        { 'is-invalid border-red-500': formik.touched.email && formik.errors.email }
                    )}
                    type="email"
                    name="email"
                    autoComplete="off"
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback fw-bold">{formik.errors.email}</div>
                )}
            </div>

            <div className="fv-row mb-12">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label fs-6 fw-bold text-[#0b1f33] text-uppercase ls-1 mb-0">Password</label>
                    <Link
                        to="/auth/forgot-password"
                        className="text-[#0f766e] fs-7 fw-bold hover:text-[#43EBA6] text-decoration-none"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <input
                    type="password"
                    autoComplete="off"
                    placeholder="••••••••"
                    {...formik.getFieldProps('password')}
                    className={clsx(
                        'form-control form-control-solid p-4 border-2 border-slate-200 focus:border-[#43EBA6] rounded-xl fs-5 bg-slate-50 transition-all',
                        { 'is-invalid border-red-500': formik.touched.password && formik.errors.password }
                    )}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback fw-bold">{formik.errors.password}</div>
                )}
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="btn w-100 py-4 fs-4 fw-bold mb-5 shadow-lg bg-[#0b1f33] text-white hover:bg-[#0b1f33] hover:shadow-xl hover:-translate-y-1 transition-all rounded-xl"
                    disabled={formik.isSubmitting}
                >
                    {!loading ? 'Sign In' : (
                        <span className="d-flex align-items-center justify-content-center">
                            Validating...
                            <span className="spinner-border spinner-border-sm ms-3"></span>
                        </span>
                    )}
                </button>

                <div className="fs-6 text-slate-400 fw-bold">
                    By signing in, you agree to our
                    <Link to="/terms-conditions" className="text-[#0f766e] hover:text-[#43EBA6] text-decoration-none px-1">Terms</Link>
                    &
                    <Link to="/privacy-policy" className="text-[#0f766e] hover:text-[#43EBA6] text-decoration-none px-1">Privacy</Link>.
                </div>
            </div>
        </form>
    );
}