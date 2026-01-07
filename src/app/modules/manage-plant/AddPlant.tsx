import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APICallService from '../../../api/apiCallService';
// import { FIELD, JOB, SITE } from '../../../api/apiEndPoints';
// import { JOBAPIJSON } from '../../../api/apiJSON/job';
import CustomDatePicker from '../../custom/DateRange/DatePicker';
import { CustomSelectWhite } from '../../custom/select/CustomSelectWhite';
import { error, success } from '../../../global/toast';
import CustomDateInput from '../../custom/DateRange/CustomDateInput';
import Loader from '../../../global/loader';
import { USER } from '../../../api/apiEndPoints';
import { USERAPIJSON } from '../../../api/apiJSON/user';

const addPlant = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [userOptions, setUserOptions] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        userId: null,
        propertyName: '',
        PropertyTypes: 0,
        address: '',
        city: '',
        state: '',
        pincode: 0,
        roofArea: 0,
        billAmount: 0,
        billImage: null,
        electricityRate: '',
        plantStatus: '',
    });
    const [validation, setValidation] = useState<any>({
        userId: false,
        propertyName: false,
        PropertyTypes: false,
        address: false,
        city: false,
        state: false,
        pincode: false,
        roofArea: false,
        billAmount: false,
        billImage: false,
        electricityRate: false,
        plantStatus: false,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const params = {
                page: 1,
                limit: 1000,
                sortKey: '_createdAt',
                sortOrder: -1,
                needCount: false,
            };
            const apiService = new APICallService(
                USER.LISTUSER,
                USERAPIJSON.listUser(params)
            );

            const response = await apiService.callAPI();
            if (response && response.records) {
                const options = response.records.map((user: any) => ({
                    value: user._id,
                    label: `${user.name}`
                }));
                setUserOptions(options);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const validateField = (name: string, value: any) => {
        let isInvalid = false;
        if(name === 'propertyName') {
            isInvalid = value.trim() === '';
        } else if( name === 'propertyTypes') {
            isInvalid = value.trim() === '';
        } else if (name === 'address') {   
            isInvalid = value.trim() === '';
        } else if( name === 'city') {
            isInvalid = value.trim() === '';
        } else if (name === 'state') {   
            isInvalid = value.trim() === '';
        } else if( name === 'pincode') {
            isInvalid = value.trim() === '';
        } else if (name === 'roofArea') {   
            isInvalid = value.trim() === '';
        } else if( name === 'billAmount') {
            isInvalid = value.trim() === '';
        } else if (name === 'billImage') {   
            isInvalid = value.trim() === '';
        } else if (name === 'electricityRate') {   
            isInvalid = value.trim() === '';
        } else if( name === 'plantStatus') {
            isInvalid = value.trim() === '';
        } else if (name === 'billImage') {   
            isInvalid = value.trim() === '';
        } else if( name === 'userId') {
            isInvalid = value === null;
        }

        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    }
}