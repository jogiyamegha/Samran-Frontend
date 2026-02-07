import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import APICallService from '../../../../api/apiCallService';
import { USER_SIGNUP } from '../../../../api/apiEndPoints';
import { APIJSON } from '../../../../api/apiJSON/auth';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Minimum 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must contain 8 chars, one uppercase, one lowercase, one number and one special character'
    )
    .required('Password is required'),
  userType: Yup.string()
    .oneOf(['2', '3'], 'Select account type')
    .required('Account type is required'),
});

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      userType: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      setError('');
      try {
        console.log('Registration data:', values);
        const apiService = new APICallService(
          USER_SIGNUP,
          APIJSON.register({
            name: values.name,
            email: values.email,
            phone: values.phone,
            password: values.password,
            userType: parseInt(values.userType), // Convert to number
            phoneCountry: 'IN'
          })
        );

        const response = await apiService.callAPI();
        console.log('Registration response:', response);

        // APICallService returns 0 on error, truthy object/1 on success
        if (response) {
          alert('Registration successful! Please login to continue.');
          navigate('/auth/login');
        } else {
          // Toast is shown by apiCallService for 400s, but we can set a fallback local error
          setError('Registration failed. Please check your details and try again.');
        }
      } catch (err: any) {
        console.error('Registration error:', err);
        setError(err.message || 'Registration failed.');
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-100">
      <div className="text-center mb-10">
        <h1 className="text-[#0b1f33] fw-black mb-3 display-6 tracking-tight">Create Account</h1>
        <div className="text-slate-500 fw-bold fs-5">
          Already have an account? <Link to="/auth/login" className="text-[#0f766e] hover:text-[#43EBA6] fw-bolder text-decoration-none transition-colors">Sign In</Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
          <i className="fas fa-exclamation-circle text-danger fs-3 me-3"></i>
          <div className="fw-semibold">{error}</div>
        </div>
      )}

      <form
        className="form w-100"
        onSubmit={formik.handleSubmit}
        noValidate
        id="kt_register_form"
        autoComplete="off"
      >
        <div className="row g-6 mb-8">
          <div className="col-12">
            <label className="form-label fs-6 fw-bold text-[#0b1f33] text-uppercase ls-1" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps('name')}
              placeholder="John Doe"
              autoComplete="name"
              className={clsx(
                'form-control form-control-solid p-4 border-2 border-slate-200 focus:border-[#43EBA6] rounded-xl fs-5 bg-slate-50',
                { 'is-invalid border-red-500': formik.touched.name && formik.errors.name }
              )}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback fw-bold">{formik.errors.name}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label fs-6 fw-bold text-[#0b1f33] text-uppercase ls-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              placeholder="name@company.com"
              autoComplete="email"
              className={clsx(
                'form-control form-control-solid p-4 border-2 border-slate-200 focus:border-[#43EBA6] rounded-xl fs-5 bg-slate-50',
                { 'is-invalid border-red-500': formik.touched.email && formik.errors.email }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback fw-bold">{formik.errors.email}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label fs-6 fw-bold text-[#0b1f33] text-uppercase ls-1" htmlFor="phone">Phone</label>
            <div className="input-group">
              <span className="input-group-text bg-slate-100 border-2 border-slate-200 border-end-0 rounded-start-xl fw-bold text-slate-500">+91</span>
              <input
                id="phone"
                type="text"
                {...formik.getFieldProps('phone')}
                placeholder="9876543210"
                autoComplete="tel"
                className={clsx(
                  'form-control form-control-solid p-4 border-2 border-slate-200 focus:border-[#43EBA6] rounded-end-xl fs-5 bg-slate-50',
                  { 'is-invalid border-red-500': formik.touched.phone && formik.errors.phone }
                )}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <div className="invalid-feedback fw-bold d-block">{formik.errors.phone}</div>
            )}
          </div>

          <div className="col-12">
            <label className="form-label fs-6 fw-bold text-[#0b1f33] text-uppercase ls-1" htmlFor="userType">Account Type</label>
            <select
              id="userType"
              {...formik.getFieldProps('userType')}
              className={clsx(
                'form-select form-control-solid p-4 border-2 border-slate-200 focus:border-[#43EBA6] rounded-xl fs-5 bg-slate-50',
                { 'is-invalid border-red-500': formik.touched.userType && formik.errors.userType }
              )}
            >
              <option value="">Select an option</option>
              <option value="2">Solar Investor (Earn Returns)</option>
              <option value="3">Solar Consumer (Save Bills)</option>
            </select>
            {formik.touched.userType && formik.errors.userType && (
              <div className="invalid-feedback fw-bold">{formik.errors.userType}</div>
            )}
          </div>

          <div className="col-12">
            <label className="form-label fs-6 fw-bold text-[#0b1f33] text-uppercase ls-1" htmlFor="password">Secure Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              placeholder="••••••••"
              autoComplete="new-password"
              className={clsx(
                'form-control form-control-solid p-4 border-2 border-slate-200 focus:border-[#43EBA6] rounded-xl fs-5 bg-slate-50',
                { 'is-invalid border-red-500': formik.touched.password && formik.errors.password }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback fw-bold">{formik.errors.password}</div>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn w-100 py-4 fs-4 fw-bold mb-8 shadow-lg bg-[#43EBA6] text-[#052F2B] hover:bg-[#34d399] hover:shadow-xl hover:-translate-y-1 transition-all rounded-xl"
            disabled={formik.isSubmitting || loading}
          >
            {!loading ? 'Create My Account' : (
              <span className="d-flex align-items-center justify-content-center">
                Processing...
                <span className="spinner-border spinner-border-sm ms-3"></span>
              </span>
            )}
          </button>

          <div className="fs-7 text-slate-400 fw-bold">
            By joining, you agree to our
            <Link to="/terms-conditions" className="text-[#0f766e] hover:text-[#43EBA6] text-decoration-none px-1">Terms of Service</Link>
            and
            <Link to="/privacy-policy" className="text-[#0f766e] hover:text-[#43EBA6] text-decoration-none px-1">Privacy Policy</Link>.
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;