import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Logo from '../../../../_admin/assets/media/svg/authLogo.svg';
import LockLogo from '../../../../_admin/assets/media/svg/Lock(field).svg';
import { FormLabel, InputGroup, FormControl, Button } from 'react-bootstrap';
import eyeIcon from '../../../../_admin/assets/media/svg/eyeIcon.svg';
import eyeActiveIcon from '../../../../_admin/assets/media/svg/eyeFill.svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import APICallService from '../../../../api/apiCallService';
import { AUTH } from '../../../../api/apiEndPoints';
import { APIJSON } from '../../../../api/apiJSON/auth';
import { error, success } from '../../../../global/toast';

const initialValues = {
    newPassword : '',
    confirmPassword : '',
}

const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(
            8,
            'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number and one special character.'
        )
        .max(50, 'Maximum 50 characters')
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/,
            'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.'
        )
        .required('New Password is required'),
    
    confirmPassword : Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm Password is required'),
})

export function ResetPassword() {
    const url = useLocation();
    const token = url.search.split('=')[1];
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState<any>({
        newPassword: false,
        confirmPassword: false,
    })
    const navigate = useNavigate();
    const togglePasswordVisibility = (field: any) => {
        setShowPassword((prev: any) => ({
            ...prev,
            [field] : !prev[field]
        }))
    }
    const formik = useFormik({
        initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: async (values, { setStatus, setSubmitting} ) => {
            setLoading(true);
            const apiService = new APICallService(
                AUTH.RESET_PASSWORD,
                APIJSON.resetPassword({
                    resetToken: token,
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword,
                })
            );

            const response = await apiService.callAPI();
            if(response) {
                navigate('/auth/success');
            }
            setLoading(false);
            setSubmitting(false);
        }
    })
    return (
        <form
            className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            id="kt_login_password_reset_form"
            onSubmit={formik.handleSubmit}
        >
        <div className="d-flex flex-column gap-4">
            <div className="d-flex justify-content-center align-items-center">
                <img
                    src={Logo}
                    height={120}
                    width={200}
                    alt="logo"
                />
            </div>
            <div className="d-flex justify-content-center align-items-center fs-3 fw-bold mb-6">
                Please set new passwords.
            </div>
        </div>
        <div className="fv-row mb-8">
            <FormLabel className="fs-14 fw-normal text-gray-900">
                New Password
            </FormLabel>
                <InputGroup
                    className={clsx(
                        'border border border-r5px',
                        formik.touched.newPassword && formik.errors.newPassword
                        ? 'border-danger border-1'
                        : ''
                    )}
                >
                <InputGroup.Text className="border-0 bg-white">
                    <img
                        src={LockLogo}
                        width={25}
                        height={25}
                        alt="lock logo"
                    />
                </InputGroup.Text>
                <FormControl
                    type={showPassword.newPassword ? 'text' : 'password'}
                    placeholder="Type here..."
                    autoComplete="off"
                    {...formik.getFieldProps('newPassword')}
                    className="border-0 form-control-custom"
                />
                <InputGroup.Text className="border-0 bg-white">
                    <Button
                        variant="link"
                        className="btn-flush"
                        onClick={() => togglePasswordVisibility('newPassword')}
                    >
                        <img
                            width={25}
                            height={16}
                            src={showPassword.newPassword ? eyeActiveIcon : eyeIcon}
                            alt="Toggle Password Visibility"
                        />
                    </Button>
                </InputGroup.Text>
            </InputGroup>
            {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                        <span role="alert">{formik.errors.newPassword}</span>
                    </div>
                </div>
            )}
        </div>
        <div className="fv-row mb-8">
            <FormLabel className="fs-14 fw-normal text-gray-900">
                Confirm Password
            </FormLabel>
            <InputGroup
                className={clsx(
                    'border border border-r5px',
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-danger border-1'
                    : ''
                )}
            >
                <InputGroup.Text className="border-0 bg-white">
                    <img
                        src={LockLogo}
                        width={25}
                        height={25}
                        alt="lock logo"
                    />
                </InputGroup.Text>
                <FormControl
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    placeholder="Type here..."
                    autoComplete="off"
                    {...formik.getFieldProps('confirmPassword')}
                    className="border-0 form-control-custom"
                />
                <InputGroup.Text className="border-0 bg-white">
                    <Button
                        variant="link"
                        className="btn-flush"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                    >
                        <img
                            width={25}
                            height={16}
                            src={showPassword.confirmPassword ? eyeActiveIcon : eyeIcon}
                            alt="Toggle Password Visibility"
                        />
                    </Button>
                </InputGroup.Text>
            </InputGroup>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                        <span role="alert">{formik.errors.confirmPassword}</span>
                    </div>
                </div>
            )}
        </div>
        <div className="d-flex flex-wrap justify-content-center">
            <Button
                type="submit"
                id="kt_password_reset_submit"
                className="btn btn-primary w-100"
                disabled={formik.isSubmitting || !formik.isValid}
            >
                <span className="indicator-label">Submit</span>
                {loading && (
                    <span className="indicator-progress">
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                )}
            </Button>
        </div>
        </form>
    )
}