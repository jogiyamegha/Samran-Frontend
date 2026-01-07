import * as Yup from 'yup';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../core/Auth';
import Logo from '../../../../_admin/assets/media/svg/authLogo.svg';
import LockLogo from '../../../../_admin/assets/media/svg/Lock(field).svg';
import EmailLogo from '../../../../_admin/assets/media/svg/Email(field).svg';
import { FormLabel, InputGroup, FormControl, Button } from 'react-bootstrap';
import eyeIcon from '../../../../_admin/assets/media/svg/eyeIcon.svg';
import eyeActiveIcon from '../../../../_admin/assets/media/svg/eyeFill.svg';
import APICallService from '../../../../api/apiCallService';
import { LOGIN } from '../../../../api/apiEndPoints';
import { APIJSON } from '../../../../api/apiJSON/auth';
import { useState } from 'react';

const loginSchema = Yup.object().shape({
    email : Yup.string()
        .email('Please enter a valid email')
        .min(3, '')
        .max(50, '')
        .required('Please enter email'),
    password: Yup.string()
        .min(3, '')
        .max(50, '')
        .required('Please enter password')
});


const initialValues = {
    email : '',
    password : '',
}

export function Login() {
    const [loading, setLoading] = useState(false);
    const { saveAuth, saveCurrentUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { setStatus, setSubmitting, setFieldValue}) => {
            setLoading(true);
            const apiService = new APICallService(
                LOGIN,
                APIJSON.login({email: values.email, password: values.password})
            );

            const response = await apiService.callAPI();
            console.log("response", response);
            if(response) {
                saveAuth(response?.token);
                saveCurrentUser(response?.user);
                console.log("mjdisbjji",response?.user);
                // navigate('/dashboard');
            } else {
                setStatus('The login details are incorrect');
                saveAuth(undefined);
                saveCurrentUser(undefined);
            }
            setLoading(false)
            setSubmitting(false);
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
     
    return (
        <form
            className="form w-100"
            onSubmit={formik.handleSubmit}
            noValidate
            id="kt_login_signin_form"
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
            <div className="d-flex justify-content-center align-items-center fs-3 fw-bold mb-4">
                Welcome to Admin Portal
            </div>
        </div>
        <div className="fv-row mb-8">
            <FormLabel className="fs-6 fw-normal text-gray-900">Email</FormLabel>
            <InputGroup
                className={clsx(
                    'border border border-r5px',
                    formik.touched.email && formik.errors.email
                    ? 'border-danger border-1'
                    : ''
                )}
            >
                <InputGroup.Text className="border-0 bg-white">
                    <img
                        src={EmailLogo}
                        width={25}
                        height={25}
                        alt="email logo"
                    />
                </InputGroup.Text>
                <FormControl
                    placeholder="Type here..."
                    {...formik.getFieldProps('email')}
                    className="border-0 form-control-custom "
                    type="email"
                    name="email"
                    autoComplete="off"
                />
            </InputGroup>
            {formik.touched.email && formik.errors.email && (
                <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                        <span role="alert">{formik.errors.email}</span>
                    </div>
                </div>
            )}
        </div>
        <div className="fv-row mb-3">
            <FormLabel className="fs-6 fw-normal text-gray-900">Password</FormLabel>
            <InputGroup
                className={clsx(
                    'border border border-r5px',
                    formik.touched.password && formik.errors.password
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
                    placeholder="Type here..."
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="off"
                    {...formik.getFieldProps('password')}
                    className="border-0 form-control-custom"
                />
                <InputGroup.Text className="border-0 bg-white">
                    <Button
                        variant="link"
                        className="btn-flush"
                        onClick={togglePasswordVisibility}
                    >
                    <img
                        width={25}
                        height={16}
                        src={showPassword ? eyeActiveIcon : eyeIcon}
                        alt="Toggle Password Visibility"
                    />
                    </Button>
                </InputGroup.Text>
            </InputGroup>
            {formik.touched.password && formik.errors.password && (
                <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                    <span role="alert">{formik.errors.password}</span>
                    </div>
                </div>
            )}
        </div>
        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
            <Link
                to="/auth/forgot-password"
                className="link-primary"
            >
                Forgot Password ?
            </Link>
        </div>
        <div className="d-grid mb-10">
            <Button
                type="submit"
                id="kt_sign_in_submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting || !formik.isValid}
            >
            {!loading && <span className="indicator-label">Login</span>}
                {loading && (
                    <span
                        className="indicator-progress"
                        style={{ display: 'block' }}
                    >
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                )}
            </Button>
        </div>
        </form>
    );
}