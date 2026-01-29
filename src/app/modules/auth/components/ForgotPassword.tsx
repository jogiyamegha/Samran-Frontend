import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Logo from '../../../../_admin/assets/media/svg/authLogo.svg';
import EmailLogo from '../../../../_admin/assets/media/svg/Email(field).svg';
import { FormLabel, InputGroup, FormControl, Button } from 'react-bootstrap';
import APICallService from '../../../../api/apiCallService';
import { AUTH } from '../../../../api/apiEndPoints';
import { APIJSON } from '../../../../api/apiJSON/auth';
import { error, success } from '../../../../global/toast';
import { Auth } from '../../../../utils/toast'

const initialValues = {
    email: '',
}

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter valid email')
        .min(3, 'Minimum 3 Symbols')
        .max(50, 'Maximum 50 Symbols')
        .required('Email is required')
});
 
export function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues,
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true);
            const data = { email: values.email };
            const apiService = new APICallService(
                AUTH.FORGOT_PASSWORD,
                APIJSON.forgotPassword(data)
            );

            const response = await apiService.callAPI();
            if (response) {
                success(Auth.emailSent);
                navigate('/auth');
            }
            setLoading(false);
            setSubmitting(false);
        }
    });

    return (
        <form 
            className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            id="kt_login_password_reset_form"
            onSubmit={formik.handleSubmit}
        >
            <div className='d-flex flex-column gap-10'>
                <div className='d-flex justify-content-center align-items-center'>
                    <img
                        src={Logo}
                        height={120}
                        width={200}
                        alt='logo'
                    />
                </div>
                <div className='text-center fs-3 fw-bold mb-4'>
                    Enter the registered email address and we'll send an email with a link
                    to reset your password.
                </div>
            </div>
            <div className='fv-row mb-8'>
                <FormLabel className='fs-6 fw-normal text-gray-900'>Email</FormLabel>
                <InputGroup 
                    className={clsx(
                        'border border border-r5px',
                        formik.touched.email && formik.errors.email
                        ? 'border-danger border-1'
                        : ''
                    )}
                >
                    <InputGroup.Text className='border-0 bg-white'>
                        <img
                            src={EmailLogo}
                            width={25}
                            height={25} 
                            alt='lock logo'
                        />
                        <FormControl 
                            type='email'
                            placeholder='Type here....'
                            autoComplete='off'
                            {...formik.getFieldProps('email')}
                            className='border-0 form-control-custom' />
                    </InputGroup.Text>
                </InputGroup>
                {formik.touched.email && formik.errors.email && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.email}</span>
                        </div>
                    </div>
                )}
            </div>
            {/* end:: From group */}
            {/* begin:: From group */}
            <div className='d-flex flex-wrap justify-content-center'>
                <Button
                    type="submit"
                    id="kt_password_reset_submit"
                    className="btn btn-primary w-100"
                    disabled={formik.isSubmitting || !formik.isValid}
                >
                    {!loading && <span className='indicator-label'>Submit</span>}
                    {loading && (
                        <span 
                            className="indicator-progress"
                            style={{ display: 'block' }}
                        >
                            Please Wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    )}
                </Button>
            </div>
            {/* end::Form group */}
        </form>
    )
}