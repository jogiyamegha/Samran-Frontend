import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import APICallService from '../../../../api/apiCallService';
import { AUTH } from '../../../../api/apiEndPoints';
import { APIJSON } from '../../../../api/apiJSON/auth';

const initialValues = {
    newPassword: '',
    confirmPassword: '',
}

const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Minimum 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Must contain 8 chars, one uppercase, one lowercase, one number and one special character'
        )
        .required('New Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm Password is required'),
})

export function ResetPassword() {
    const url = useLocation();
    const queryParams = new URLSearchParams(url.search);
    const token = queryParams.get('token') || '';
    const email = queryParams.get('email') || '';
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false,
    });
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true);
            try {
                const apiService = new APICallService(
                    AUTH.USER_RESET_PASSWORD,
                    APIJSON.resetPassword({
                        code: token,
                        email: email,
                        newPassword: values.newPassword,
                        confirmPassword: values.confirmPassword,
                    })
                );
                const response = await apiService.callAPI();
                if (response) {
                    navigate('/auth/success');
                }
            } catch (err) {
                setStatus('Failed to reset password.');
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        }
    });

    return (
        <form
            className="form w-100"
            noValidate
            onSubmit={formik.handleSubmit}
        >
            <div className="text-center mb-10">
                <h1 className="text-secondary fw-bolder mb-3 display-6">Setup New Password</h1>
                <div className="text-muted fw-bold fs-5">
                    Have you already reset the password? <Link to="/auth/login" className="link-primary fw-bolder text-decoration-none">Sign in</Link>
                </div>
            </div>

            {formik.status && (
                <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
                    <div className="fw-semibold">{formik.status}</div>
                </div>
            )}

            <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bold text-secondary text-uppercase ls-1">New Password</label>
                <div className="position-relative">
                    <input
                        type={showPassword.new ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="off"
                        {...formik.getFieldProps('newPassword')}
                        className={clsx(
                            'form-control form-control-solid p-4 border-ps fs-5',
                            { 'is-invalid': formik.touched.newPassword && formik.errors.newPassword }
                        )}
                    />
                    <span
                        className="btn btn-sm btn-icon position-absolute translate-middle-y top-50 end-0 me-3"
                        onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                    >
                        <i className={clsx('fas fs-4 text-muted', showPassword.new ? 'fa-eye-slash' : 'fa-eye')}></i>
                    </span>
                    {formik.touched.newPassword && formik.errors.newPassword && (
                        <div className="invalid-feedback fw-bold">{formik.errors.newPassword}</div>
                    )}
                </div>
            </div>

            <div className="fv-row mb-10">
                <label className="form-label fs-6 fw-bold text-secondary text-uppercase ls-1">Confirm Password</label>
                <div className="position-relative">
                    <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="off"
                        {...formik.getFieldProps('confirmPassword')}
                        className={clsx(
                            'form-control form-control-solid p-4 border-ps fs-5',
                            { 'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword }
                        )}
                    />
                    <span
                        className="btn btn-sm btn-icon position-absolute translate-middle-y top-50 end-0 me-3"
                        onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                    >
                        <i className={clsx('fas fs-4 text-muted', showPassword.confirm ? 'fa-eye-slash' : 'fa-eye')}></i>
                    </span>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div className="invalid-feedback fw-bold">{formik.errors.confirmPassword}</div>
                    )}
                </div>
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="btn btn-ps-primary btn-lg w-100 py-5 fs-4 fw-bolder shadow-sm"
                    disabled={formik.isSubmitting}
                >
                    {!loading ? 'Submit New Password' : (
                        <span className="d-flex align-items-center justify-content-center">
                            Updating...
                            <span className="spinner-border spinner-border-sm ms-3"></span>
                        </span>
                    )}
                </button>
            </div>
        </form>
    );
}