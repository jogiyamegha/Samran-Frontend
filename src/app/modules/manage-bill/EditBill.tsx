import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { success, error } from '../../../global/toast';
import clsx from 'clsx';
import { Bill } from '../../../api/apiEndPoints';
import { BILLAPIJSON } from '../../../api/apiJSON/bill';
import APICallService from '../../../api/apiCallService';
import CustomDatePicker from '../../custom/DateRange/DatePicker';
import { propertyTypeOptions, weekdayOptions } from '../../../utils/staticJSON';
import { CustomSelectWhite } from '../../custom/select/CustomSelectWhite';
import { USERAPIJSON } from '../../../api/apiJSON/user';
import { UserTypes } from '../../../utils/constants';
import { IEditBill } from '../../../types/request_data/bill';

const EditBill = () => {
    const navigate = useNavigate();
    const { state }: any = useLocation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    console.log("🚀 ~ EditBill ~ state:", state)
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        generatedUnits: state?.generatedUnits || 0, 
        consumedUnits: state?.consumedUnits || 0, 
        exportedUnits: state?.exportedUnits || 0, 
    });
    const [validation, setValidation] = useState({
        generatedUnits: false,
        consumedUnits: false,
        exportedUnits: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const validateField = (name: string, value: string | number) => {
        let isInvalid =
        value === null || value.toString().trim() === '' || value === 0;
        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    };

    const handleEditSite = async () => {
        
        const newValidation = {
            generatedUnits : formData.generatedUnits === 0,
            consumedUnits : formData.consumedUnits === 0,
            exportedUnits : formData.exportedUnits === 0,
        };
        setValidation(newValidation);
        
        setLoading(true);
        
        const isValid = !Object.values(newValidation).some((value) => value);
        if (isValid) {
            const billId = state._id;

            const apiService = new APICallService(
                Bill.EDITBILL,
                BILLAPIJSON.EditBill(formData),
                { id: state?._id }
            );
            const response = await apiService.callAPI();
            if (response) {
                success('Bill edited successfully');
                navigate('/bill/all-bills');
            }
        }
        setLoading(false);
    };

    const handleBack = () => {
        navigate('/bill/all-bills');
    };

    return (
        <div className="p-9 bg-light">
            <Row className="mb-6">
                <Col xs={12}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <h1 className="fs-22 fw-bolder">Edit Bill</h1>
                    </div>
                </Col>
            </Row>
            <Card className="border bg-white">
                <Card.Body className="p-6">
                <Form>
                    <Row className="g-6">
                    <Col md={6}>
                        <Form.Group className="mb-4">
                        <Form.Label className="fs-16 fw-600 text-dark required">
                            Generated Units
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="generatedUnits"
                            value={formData.generatedUnits}
                            onChange={handleInputChange}
                            className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                        <Form.Label className="fs-16 fw-600 text-dark required">
                            Consumed Units
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="consumedUnits"
                            value={formData.consumedUnits}
                            onChange={handleInputChange}
                            className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                Exported Units
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="exportedUnits"
                                value={formData.exportedUnits}
                                onChange={handleInputChange}
                                className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                    <div className="d-flex justify-content-center gap-4">
                    <Button
                        variant="primary"
                        onClick={handleEditSite}
                        size="sm"
                        disabled={loading}
                    >
                        {loading ? (
                        <>
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </>
                        ) : (
                        <span className="indicator-label fs-16 fw-bold">Save</span>
                        )}
                    </Button>
                    <Button onClick={handleBack}>Cancel</Button>
                    </div>
                </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditBill;