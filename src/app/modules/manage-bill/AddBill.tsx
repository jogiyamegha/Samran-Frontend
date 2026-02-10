import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Dropdown, Form, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APICallService from '../../../api/apiCallService';
import { CustomSelectWhite } from '../../custom/select/CustomSelectWhite';
import { error, success } from '../../../global/toast';
import { Bill } from '../../../api/apiEndPoints';
import { BILLAPIJSON } from '../../../api/apiJSON/bill';
import { IAddBill } from '../../../types/request_data/bill';
import { PPA } from '../../../api/apiEndPoints';
import { PPAAPIJSON } from '../../../api/apiJSON/ppa';
import clsx from 'clsx';
import { Months } from '../../../utils/constants';
import Method from '../../../utils/methods';
import CustomDatePicker from '../../custom/DateRange/DatePicker';

const AddBill = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ppaOptions, setPpaOptions] = useState<any[]>([]);
    const [formData, setFormData] = useState<IAddBill>({
        ppaId: null,
        billingMonth: null,
        billingYear: null,
        generatedUnits: null,
        consumedUnits: null,
        exportedUnits: null,
    });
    const [validation, setValidation] = useState<any>({
        ppaId: false,
        billingMonth: false,
        billingYear: false,
        generatedUnits: false,
        consumedUnits: false,
        exportedUnits: false,
    });

    // Fetch PPA from dropdown
    useEffect(() => {
        const fetchPpa = async () => {
            const params = {
                page: 1,
                limit: 1000,
                sortKey: '_createdAt',
                sortOrder: -1,
                needCount: false,
                isSigned : true
            };
            const apiService = new APICallService(
                PPA.LISTPPA,
                PPAAPIJSON.listPpa(params)
            );

            const response = await apiService.callAPI();
            if (response && response.records) {
                const options = response.records.map((ppa: any) => ({
                    value: ppa._id,
                    label: `${ppa?.ppaName} (${ppa?.ppaUniqueId})`
                }));
                setPpaOptions(options);
            }
        };
        fetchPpa();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const parsedValue = value === "" ? null : Number(value);

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue,
        }));

        validateField(name, parsedValue);
    };

    const handleSelectChange = (selected: any) => {
        const value = selected ? selected.value : null;
        setFormData({
            ...formData,
            ppaId: value
        });
        validateField('ppaId', value);
    }

    const validateField = (name: string, value: any) => {
        let isInvalid = false;
         if (name === 'ppaId') {
            isInvalid = !value;
        } else {
            isInvalid = value === null || value === 0;
        }  

        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    }

    const handleAddBill = async () => {
        setLoading(true);
        const newValidation = {
            ppaId: formData.ppaId === null,
            billingMonth: formData.billingMonth === null,
            billingYear: formData.billingYear === null,
            generatedUnits: formData.generatedUnits === null,
            consumedUnits: formData.consumedUnits === null,
            exportedUnits: formData.exportedUnits === null,
        }
        setValidation(newValidation);
        const isValid = !Object.values(newValidation).some((value) => value);
        if(isValid) {
            try {
                const apiService = new APICallService(
                    Bill.ADDBILL,
                    BILLAPIJSON.AddBill(formData)
                );

                const response = await apiService.callAPI();
                if(response) {
                    success("Bill created successfully!");
                    navigate('/bill/all-bills')
                }
            } catch (err) {
                error('Failed to add bill');
            }
        }
        setLoading(false);
    }

    const handleBack = () => {
        navigate('/bill/all-bills')
    }

    const handleMonthSelect = (eventKey: string | null) => {
        const value = eventKey ? Number(eventKey) : null;

        setFormData((prev) => ({
            ...prev,
            billingMonth: value,
        }));

        validateField('billingMonth', value);
    };

    const handleDateChange = (date: Date | null) => {
        const year = date ? date.getFullYear() : null;
        setFormData({
            ...formData,
            billingYear: year,
        });

        validateField('billingYear', year);
    };

    return (
        <div className="p-9">
            <Row className="mb-6">
                <Col xs={12}>
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="light"
                            className="p-0"
                            onClick={handleBack}
                            style={{border: "none", background: "transparent"}}
                        >
                            <i className="bi bi-arrow-left fs-24 text-dark"></i>
                        </Button>
                        <h1 className="fs-22 fw-bolder mb-0"  style={{ color: '#1e3369' }}>Add Bill</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card className="bg-white pt-2 mb-6 mb-xl-9 border">
                        <Card.Header className="border-bottom-0">
                            <Card.Title>
                                <h5 className="fs-22 fw-bolder">Bill details</h5>
                            </Card.Title>
                        </Card.Header>

                        <Card.Body className="pt-0 pb-5">
                        <Row className="align-items-center">
                            <Col md={12} className="mb-3">
                            <Row>
                                <Col md={4} className="mb-3">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="plantId"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            PPA
                                        </Form.Label>
                                        <CustomSelectWhite
                                            border={validation.ppaId ? '#F1416C' : ''}
                                            placeholder="Select ppa"
                                            options={ppaOptions}
                                            isMulti={false}
                                            onChange={handleSelectChange}
                                            value={ppaOptions.find(
                                                (option) => option.value === formData.ppaId
                                            ) || null}
                                            minHeight="45px"
                                            controlFontSize="14px"
                                            fontWeight="500"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <FormLabel className="fs-16 fw-500 text-dark required">
                                        Billing Month
                                    </FormLabel>
                                    <Dropdown onSelect={handleMonthSelect}>
                                        <Dropdown.Toggle
                                            variant="white"
                                            className={clsx(
                                                'form-control bg-white min-h-40px fs-14 fw-bold text-dark text-start border border-3px border-radius-15px',
                                                { 'border-danger': validation.billingMonth }
                                            )}
                                            id="dropdown-billing-month"
                                        >
                                            {formData.billingMonth
                                                ? Method.getMonthLabel(formData.billingMonth)
                                                : 'Select Billing Month'}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {Object.values(Months)
                                                .filter(v => typeof v === "number")
                                                .map((month) => (
                                                <Dropdown.Item key={month} eventKey={month}>
                                                    {Method.getMonthLabel(month)}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="billingYear"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Billing Year
                                        </Form.Label>
                                        <CustomDatePicker
                                            className={clsx(
                                                'form-control bg-white min-h-45px fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.billingYear }
                                            )}
                                            selected={
                                            formData.billingYear 
                                                ? new Date(formData.billingYear, 0, 1)   // 1 Jan of that year
                                                : null
                                            }
                                            onChange={handleDateChange}
                                            placeholder="Select Year"
                                            dateFormat="yyyy"
                                            showYearPicker={true}
                                            isClearable={true}
                                            style={{
                                                border: validation.billingYear
                                                ? '1px solid #F1416C !important'
                                                : '1px solid #e0e0df',
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="generatedUnits"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Generated Units
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.generatedUnits }
                                            )}
                                            type="number"
                                            placeholder="Type here…"
                                            name="generatedUnits"
                                            value={formData.generatedUnits ?? ""}
                                            onChange={handleInputChange}
                                            style={{
                                                border: validation.generatedUnits
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="consumedUnits"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Consumed Units
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.consumedUnits }
                                            )}
                                            type="number"
                                            placeholder="Type here…"
                                            name="consumedUnits"
                                            value={formData.consumedUnits ?? ""}
                                            onChange={handleInputChange}
                                            style={{
                                                border: validation.consumedUnits
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exportedUnits"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Exported Units
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.exportedUnits }
                                            )}
                                            type="number"
                                            placeholder="Type here…"
                                            name="exportedUnits"
                                            value={formData.exportedUnits ?? ""}
                                            onChange={handleInputChange}
                                            style={{
                                                border: validation.exportedUnits
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center gap-4">
                            <Button
                                size="lg"
                                onClick={handleAddBill}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        Please wait...
                                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    </>
                                    ) : (
                                    <span className="indicator-label fs-16 fw-bold">
                                        <i className="bi bi-plus-lg"></i>
                                        Add Bill
                                    </span>
                                )}
                            </Button>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </div>
    );
}

export default AddBill;