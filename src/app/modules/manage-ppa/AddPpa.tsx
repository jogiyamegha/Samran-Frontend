import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APICallService from '../../../api/apiCallService';
import { CustomSelectWhite } from '../../custom/select/CustomSelectWhite';
import { error, success } from '../../../global/toast';
import { PPA } from '../../../api/apiEndPoints';
import { PPAAPIJSON } from '../../../api/apiJSON/ppa';
import { IAddPpa } from '../../../types/request_data/ppa';
import { PLANT } from '../../../api/apiEndPoints';
import { PLANTAPIJSON } from '../../../api/apiJSON/plant';
import clsx from 'clsx';
import { PlantStatus } from '../../../utils/constants';
import CustomDatePicker from '../../custom/DateRange/DatePicker';

const AddPpa = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [plantOptions, setPlantOptions] = useState<any[]>([]);
    const [formData, setFormData] = useState<IAddPpa>({
        ppaName: null,
        plantId: null,
        plantCapacity: null,
        tarrif: null,
        expectedYears: null,
        startDate: null,
        ppaDocument: null,
        leaseDocument: null,
    });
    const [validation, setValidation] = useState<any>({
        plantId: false,
        plantCapacity: false,
        tarrif: false,
        expectedYears: false,
        startDate: false,
        ppaDocument: false,
        leaseDocument: false,
    });

    // Fetch Plants from dropdown
    useEffect(() => {
        const fetchPlants = async () => {
            const params = {
                page: 1,
                limit: 1000,
                sortKey: '_createdAt',
                sortOrder: -1,
                needCount: false,
                plantStatus: PlantStatus.Approved
            };
            const apiService = new APICallService(
                PLANT.LISTPLANT,
                PLANTAPIJSON.listPlant(params)
            );

            const response = await apiService.callAPI();
            if (response && response.records) {
                const options = response.records.map((plant: any) => ({
                    value: plant._id,
                    label: `${plant?.plantUniqueName} (${plant?.propertyAddress?.address})`,
                }));
                setPlantOptions(options);
            }
        };
        fetchPlants();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            //Validate file type
            const validTypes = [
                'application/pdf',
                'image/jpg',
                'image/jpeg',
                'image/png'
            ];

            if (!validTypes.includes(file.type)) {
                error('Only JPG/JPEG/PNG files are allowed');
                e.target.value = ''; // Clear invalid file
                validateField('ppaDocument', null);
                validateField('leaseDocument', null);
                return;
            }
        }

        setFormData({
            ...formData,
            ppaDocument : file,
            leaseDocument : file
        });
        validateField('ppaDocument', file)
        validateField('leaseDocument', file)
    }

    const handleSelectChange = (selected: any) => {
        const value = selected ? selected.value : null;
        setFormData({
            ...formData,
            plantId: value
        });
        validateField('plantId', value);
    }

    const validateField = (name: string, value: any) => {
        let isInvalid = false;
        if(name === 'ppaName') {
            isInvalid = value === null;
        }else if(name === 'plantId') {
            isInvalid = value === null;
        } else if( name === 'plantCapacity') {
            isInvalid = value === 0;
        } else if( name === 'tarrif') {
            isInvalid = value === 0;
        } else if (name === 'expectedYears') {   
            isInvalid = value === 0;
        } else if( name === 'startDate') {
            isInvalid = value === null;
        } 

        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    }

    const handleDateChange = (date: Date | null) => {
        setFormData({
            ...formData,
            startDate: date,
        });
        validateField('startDate', date);
    };

    const handleAddPpa = async () => {
        setLoading(true);
        const newValidation = {
            ppaName: !formData.ppaName,
            plantId: !formData.plantId,
            plantCapacity : !formData.plantCapacity,
            tarrif : !formData.tarrif,
            expectedYears : !formData.expectedYears,
            startDate : !formData.startDate,
            ppaDocument : !formData.ppaDocument,
            leaseDocument : !formData.leaseDocument
        }
        setValidation(newValidation);

        let form = new FormData();
        const Data = {
            plantId: formData.plantId?.trim(),
            plantCapacity : formData.plantCapacity,
            tarrif : formData.tarrif,
            expectedYears : formData.expectedYears,
            startDate : formData.startDate,
            ppaDocument : formData.ppaDocument,
            leaseDocument : formData.leaseDocument
        }
        const isValid = !Object.values(newValidation).some((value) => value);

        if(isValid) {
            try {
                const apiService = new APICallService(
                    PPA.ADDPPA,
                    PPAAPIJSON.AddPpa({
                        ppaName: formData.ppaName,
                        plantId: formData.plantId,
                        plantCapacity: formData.plantCapacity,
                        tarrif: formData.tarrif,
                        expectedYears : formData.expectedYears,
                        startDate: formData.startDate,
                        ppaDocument : formData.ppaDocument,
                        leaseDocument : formData.leaseDocument 
                    })
                );

                const response = await apiService.callAPI();
                if(response) {
                    success("PPA has been added successfully!");
                    navigate('/ppa/all-ppa')
                }
            } catch (err) {
                error('Failed to add ppa');
            }
        }
        setLoading(false);
    }

    const handleBack = () => {
        navigate('/plant/all-ppa')
    }

    return (
        <div className="p-9">
            <Row className="mb-6">
                <Col xs={12}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <h1 className="fs-22 fw-bolder">Add PPA</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card className="bg-white pt-2 mb-6 mb-xl-9 border">
                        <Card.Header className="border-bottom-0">
                        <Card.Title>
                            <h5 className="fs-22 fw-bolder">PPA details</h5>
                        </Card.Title>
                        </Card.Header>

                        <Card.Body className="pt-0 pb-5">
                        <Row className="align-items-center">
                            <Col>
                            <Row>
                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="ppaName"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            PPA's Unique Name
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.ppaName }
                                            )}
                                            type="string"
                                            placeholder="Type here…"
                                            name="ppaName"
                                            value={formData.ppaName ?? ''}
                                            onChange={handleInputChange}
                                            style={{
                                                border: validation.ppaName
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="plantId"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Plant
                                        </Form.Label>
                                        <CustomSelectWhite
                                            border={validation.plantId ? '#F1416C' : ''}
                                            placeholder="Select Plant"
                                            options={plantOptions}
                                            isMulti={false}
                                            onChange={handleSelectChange}
                                            value={plantOptions.find(
                                                (option) => option.value === formData.plantId
                                            ) || null}
                                            minHeight="60px"
                                            controlFontSize="14px"
                                            fontWeight="500"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="plantCapacity"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Plant's Capacity
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.plantCapacity }
                                            )}
                                            type="number"
                                            placeholder="Type here…"
                                            name="plantCapacity"
                                            value={formData.plantCapacity ?? ''}
                                            onChange={handleInputChange}
                                            style={{
                                                border: validation.plantCapacity
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="tarrif"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Tarrif
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.tarrif }
                                            )}
                                            type="number"
                                            placeholder="Type here…"
                                            name="tarrif"
                                            value={formData.tarrif ?? ''}
                                            onChange={handleInputChange}
                                            style={{
                                                border: validation.tarrif
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="expectedYears"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Expected Years
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.expectedYears }
                                            )}
                                            type="number"
                                            placeholder="Type here…"
                                            name="expectedYears"
                                            value={formData.expectedYears ?? ''}
                                            onChange={handleInputChange}
                                            style={{
                                                border: validation.expectedYears
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="startDate"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Start Date
                                        </Form.Label>
                                            <CustomDatePicker
                                                className={clsx(
                                                    'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                                    { 'border-danger': validation.startDate }
                                                )}
                                                selected={formData.startDate}
                                                onChange={handleDateChange}
                                                placeholder="Select Date…"
                                                dateFormat="dd-MM-yyyy"
                                                isClearable={true}
                                                style={{
                                                    border: validation.startDate
                                                    ? '1px solid #F1416C !important'
                                                    : '1px solid #e0e0df',
                                                }}
                                                // minDate={new Date()}
                                            />
                                    </Form.Group>
                                </Col>
                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="ppaDocument"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            PPA Document (Pdf only)
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.ppaDocument }
                                            )}
                                            type="file"
                                            accept=".pdf" // Allow PDF
                                            onChange={handleFileChange}
                                            style={{
                                                border: validation.ppaDocument
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                                height: '60px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                paddingTop: '16px',
                                                paddingBottom: '16px',
                                            }}
                                        />
                                        <Form.Text className="text-muted fs-12 mt-1">
                                            Only PDF files are allowed
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="leaseDocument"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Lease Document (Pdf only)
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.leaseDocument }
                                            )}
                                            type="file"
                                            accept=".pdf" // Allow PDF
                                            onChange={handleFileChange}
                                            style={{
                                                border: validation.leaseDocument
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                                height: '60px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                paddingTop: '16px',
                                                paddingBottom: '16px',
                                            }}
                                        />
                                        <Form.Text className="text-muted fs-12 mt-1">
                                            Only PDF files are allowed
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <div className="d-flex justify-content-center gap-4">
                <Button
                    size="lg"
                    onClick={handleAddPpa}
                    disabled={loading}
                >
                    {loading ? (
                    <>
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </>
                    ) : (
                    <span className="indicator-label fs-16 fw-bold">
                        Add PPA
                    </span>
                    )}
                </Button>
                {/* <Button
                    className="indicator-label fs-16 fw-bold"
                    onClick={handleBack}
                >
                    Cancel
                </Button> */}
                </div>
            </Row>
        </div>
    );
}

export default AddPpa;