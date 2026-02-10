import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import APICallService from '../../../../api/apiCallService';
import { AUTH } from '../../../../api/apiEndPoints';
import { APIJSON } from '../../../../api/apiJSON/auth';

const initialValues = {
    email: '',
}

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required')
});

export function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true);
            try {
                const apiService = new APICallService(
                    AUTH.USER_FORGOT_PASSWORD,
                    APIJSON.forgotPassword({ email: values.email })
                );
                await apiService.callAPI();
                setSent(true);
            } catch (err) {
                setStatus('Failed to send reset link.');
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        }
    });

    if (sent) {
        return (
            <div className="text-center animate__animated animate__fadeIn">
                <div className="mb-10 p-8 bg-ps-primary-light rounded-circle d-inline-block">
                    <i className="fas fa-paper-plane text-primary display-4"></i>
                </div>
                <h1 className="text-secondary fw-bolder mb-3 display-6">Check your email</h1>
                <p className="text-muted fs-5 mb-10">
                    We've sent a password reset link to <br />
                    <span className="fw-bold text-secondary">{formik.values.email}</span>
                </p>
                <div className="d-grid">
                    <button onClick={() => navigate('/auth/login')} className="btn btn-ps-secondary btn-lg py-5 fs-4">
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form
            className="form w-100"
            noValidate
            onSubmit={formik.handleSubmit}
        >
            <div className="text-center mb-10">
                <h1 className="text-secondary fw-bolder mb-3 display-6">Forgot Password?</h1>
                <div className="text-muted fw-bold fs-5">
                    Enter your email to reset your secret key.
                </div>
            </div>

            {formik.status && (
                <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
                    <div className="fw-semibold">{formik.status}</div>
                </div>
            )}

            <div className="fv-row mb-10">
                <label className="form-label fs-6 fw-bold text-secondary text-uppercase ls-1">Email Address</label>
                <input
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="off"
                    {...formik.getFieldProps('email')}
                    className={clsx(
                        'form-control form-control-solid p-4 border-ps fs-5',
                        { 'is-invalid': formik.touched.email && formik.errors.email }
                    )}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback fw-bold">{formik.errors.email}</div>
                )}
            </div>

            <div className="d-flex flex-column gap-5">
                <button
                    type="submit"
                    className="btn btn-ps-primary btn-lg w-100 py-5 fs-4 fw-bolder shadow-sm"
                    disabled={formik.isSubmitting}
                >
                    {!loading ? 'Send Reset Link' : (
                        <span className="d-flex align-items-center justify-content-center">
                            Sending...
                            <span className="spinner-border spinner-border-sm ms-3"></span>
                        </span>
                    )}
                </button>
                <Link to="/auth/login" className="btn btn-ps-light btn-lg w-100 py-5 fs-4 fw-bold text-secondary text-decoration-none">
                    Cancel
                </Link>
            </div>
        </form>
    );
}