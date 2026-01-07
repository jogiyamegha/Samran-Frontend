import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';

const initialValues = {
    email : ''
};

const forgotPasswordSchema = Yup.object().shape({
    email : Yup.string()
            .email('Please enter valid email')
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Email is required'),
})

export function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues,
        validationSchema : forgotPasswordSchema,
        onSubmit:  async (values, {setStatus, setSubmitting}) => {
            setLoading(true);
            const data = {
                email : values.email
            };
            // const apiService = new API
        }
    })
}