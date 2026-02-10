import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APICallService from '../../../api/apiCallService';
import { CustomSelectWhite } from '../../custom/select/CustomSelectWhite';
import { error, success } from '../../../global/toast';
import { PLANT } from '../../../api/apiEndPoints';
import { PLANTAPIJSON } from '../../../api/apiJSON/plant';
import { IAddPlant } from '../../../types/request_data/plant';
import { USER } from '../../../api/apiEndPoints';
import { USERAPIJSON } from '../../../api/apiJSON/user';
import clsx from 'clsx';
import Method from '../../../utils/methods';
import { PropertyTypes } from '../../../utils/constants';

const AddPlant = () => {
    const navigate = useNavigate();
    const [propertyType, setPropertyType] = useState<number | null>(
        null
    );
    const [loading, setLoading] = useState(false);
    const [userOptions, setUserOptions] = useState<any[]>([]);
    const [formData, setFormData] = useState<IAddPlant>({
        userId: null,
        propertyName: '',
        propertyType: 0,
        address: '',
        city: '',
        state: '',
        pincode: null,
        roofArea: null,
        billAmount: null,
        billImage: null,
        electricityRate: null,
    });
    const [validation, setValidation] = useState<any>({
        userId: false,
        propertyName: false,
        propertyTypes: false,
        address: false,
        city: false,
        state: false,
        pincode: false,
        roofArea: false,
        billAmount: false,
        billImage: false,
        electricityRate: false,
    });

    // Fetch users from dropdown
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
                validateField('billImage', null);
                return;
            }
        }

        setFormData({
            ...formData,
            billImage : file
        });
        validateField('billImage', file)
    }

    const handleSelectChange = (selected: any) => {
        const value = selected ? selected.value : null;
        setFormData({
            ...formData,
            userId: value
        });
        validateField('userId', value);
    }

    const handlePropertyTypeSelectChange = (name: string, eventKey: string | null) => {
        const value = eventKey ? parseInt(eventKey) : 0;
        setPropertyType(value);
        setFormData((prev) => ({
            ...prev,
            propertyType: value,
        }));
        validateField(name, value);
    };


    const validateField = (name: string, value: any) => {
        let isInvalid = false;
        if(name === 'propertyName') {
            isInvalid = value.trim() === '';
        } else if( name === 'propertyTypes') {
            isInvalid = value === 0;
        } else if (name === 'address') {   
            isInvalid = value.trim() === '';
        } else if( name === 'city') {
            isInvalid = value.trim() === '';
        } else if (name === 'state') {   
            isInvalid = value.trim() === '';
        } else if( name === 'pincode') {
            isInvalid = value === 0;
        } else if (name === 'roofArea') {   
            isInvalid = value === 0;
        } else if( name === 'billAmount') {
            isInvalid = value === 0;
        } else if (name === 'electricityRate') {   
            isInvalid = value === 0;
        } 

        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    }

    const handleAddPlant = async () => {
        setLoading(true);
        const newValidation = {
            userId: !formData.userId,
            propertyName : formData.propertyName.trim().length === 0,
            propertyType : !formData.propertyType,
            address : formData.address.trim().length === 0,
            city : formData.city.trim().length === 0,
            state : formData.state.trim().length === 0,
            pincode : !formData.pincode,
            roofArea : !formData.roofArea,
            billAmount : !formData.billAmount,
            electricityRate : !formData.electricityRate,
            billImage : !formData.billImage
        }
        setValidation(newValidation);

        let form = new FormData();
        const Data = {
            userId: formData.userId?.trim(),
            propertyName: formData.propertyName.trim(),
            propertyType: formData.propertyType,
            address : formData.address.trim(),
            state: formData.state.trim(),
            city: formData.city.trim(),
            roofArea : formData.roofArea,
            pincode : formData.pincode,
            electricityRate : formData.electricityRate,
            billImage : formData.billImage,
            billAmount : formData.billAmount,
        }

        const isValid = !Object.values(newValidation).some((value) => value);
        if(isValid) {
            try {
                const apiService = new APICallService(
                    PLANT.ADDPLANT,
                    PLANTAPIJSON.AddPlant({
                        userId: formData.userId,
                        propertyName: formData.propertyName,
                        propertyType: formData.propertyType,
                        address : formData.address,
                        city: formData.city,
                        state: formData.state,
                        pincode : formData.pincode,
                        roofArea : formData.roofArea,
                        billAmount : formData.billAmount,
                        electricityRate : formData.electricityRate,
                        billImage : formData.billImage 
                    })
                    // PLANTAPIJSON.AddPlant(Data)
                );

                const response = await apiService.callAPI();
                if(response) {
                    success("Plant has been added successfully!");
                    navigate('/plant/all-plants')
                }
            } catch (err) {
                error('Failed to add plant');
            }
        }
        setLoading(false);
    }

    const handleBack = () => {
        navigate('/plant/all-plants')
    }

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
                        <h1 className="fs-22 fw-bolder mb-0"  style={{ color: '#1e3369' }}>Add Plant</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card className="bg-white pt-2 mb-6 mb-xl-9 border">
                        <Card.Header className="border-bottom-0">
                        <Card.Title>
                            <h5 className="fs-22 fw-bolder">Plant details</h5>
                        </Card.Title>
                        </Card.Header>

                        <Card.Body className="pt-0 pb-5">
                        <Row className="align-items-center">
                            <Col md={12} className="mb-3">
                                <Row>
                                    <Col md={6} className="mb-3">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="propertyType"
                                    >
                                        <Form.Label className="fs-16 fw-500 required">
                                            Property Name
                                        </Form.Label>
                                        <Form.Control
                                            className={clsx(
                                                'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                { 'border-danger': validation.propertyName }
                                            )}
                                            type="text"
                                            placeholder="Type here…"
                                            name="propertyName"
                                            value={formData.propertyName}
                                            onChange={handleInputChange}
                                            style={{
                                                border: validation.propertyName
                                                ? '1px solid #F1416C'
                                                : '1px solid #e0e0df',
                                            }}
                                        />
                                    </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="propertyType"
                                        >
                                            <Form.Label className="fs-16 fw-500 required">
                                                Property Type
                                            </Form.Label>
                                            <Dropdown
                                                onSelect={(eventKey) =>
                                                    handlePropertyTypeSelectChange("propertyType" ,eventKey)
                                                }
                                            >
                                                <Dropdown.Toggle
                                                    variant="white"
                                                    className={clsx(
                                                        'form-control bg-white min-h-40px fs-14 fw-bold text-dark text-start border border-3px border-radius-15px',
                                                        { 'border-danger': validation.propertyType }
                                                    )}
                                                    id="dropdown-property-type"
                                                    aria-label="Select Property type"
                                                >
                                                    {propertyType
                                                    ? Method.getPropertyTypeLabel(propertyType)
                                                    : 'Select Property Type'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey={PropertyTypes.HousingSociety}>
                                                        {Method.getPropertyTypeLabel(PropertyTypes.HousingSociety)}
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey={PropertyTypes.ManufacturingUnit}>
                                                        {Method.getPropertyTypeLabel(PropertyTypes.ManufacturingUnit)}
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="address"
                                        >
                                            <Form.Label className="fs-16 fw-500 required">
                                                Property Address
                                            </Form.Label>
                                            <Form.Control
                                                className={clsx(
                                                    'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                    { 'border-danger': validation.address }
                                                )}
                                                type="text"
                                                placeholder="Type here…"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                style={{
                                                    border: validation.address
                                                    ? '1px solid #F1416C'
                                                    : '1px solid #e0e0df',
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="city"
                                        >
                                            <Form.Label className="fs-16 fw-500 required">
                                                City
                                            </Form.Label>
                                            <Form.Control
                                                className={clsx(
                                                    'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                    { 'border-danger': validation.city }
                                                )}
                                                type="text"
                                                placeholder="Type here…"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                style={{
                                                    border: validation.city
                                                    ? '1px solid #F1416C'
                                                    : '1px solid #e0e0df',
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="state"
                                        >
                                            <Form.Label className="fs-16 fw-500 required">
                                                State
                                            </Form.Label>
                                            <Form.Control
                                                className={clsx(
                                                    'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                    { 'border-danger': validation.state }
                                                )}
                                                type="text"
                                                placeholder="Type here…"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                style={{
                                                    border: validation.state
                                                    ? '1px solid #F1416C'
                                                    : '1px solid #e0e0df',
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="pincode"
                                        >
                                            <Form.Label className="fs-16 fw-500 required">
                                                Pincode
                                            </Form.Label>
                                            <Form.Control
                                                className={clsx(
                                                    'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                    { 'border-danger': validation.pincode }
                                                )}
                                                type="number"
                                                placeholder="Type here…"
                                                name="pincode"
                                                value={formData.pincode ?? ''}
                                                onChange={handleInputChange}
                                                style={{
                                                    border: validation.pincode
                                                    ? '1px solid #F1416C'
                                                    : '1px solid #e0e0df',
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="roofArea"
                                        >
                                            <Form.Label className="fs-16 fw-500 ">
                                                Roof Area
                                            </Form.Label>
                                            <Form.Control
                                                className={clsx(
                                                    'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                    { 'border-danger': validation.roofArea }
                                                )}
                                                type="number"
                                                placeholder="Type here…"
                                                name="roofArea"
                                                value={formData.roofArea ?? ''}
                                                onChange={handleInputChange}
                                                style={{
                                                    border: validation.roofArea
                                                    ? '1px solid #F1416C'
                                                    : '1px solid #e0e0df',
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="billAmount"
                                        >
                                            <Form.Label className="fs-16 fw-500 required">
                                                Bill Amount
                                            </Form.Label>
                                            <Form.Control
                                                className={clsx(
                                                    'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                    { 'border-danger': validation.billAmount }
                                                )}
                                                type="number"
                                                placeholder="Type here…"
                                                name="billAmount"
                                                value={formData.billAmount ?? ''}
                                                onChange={handleInputChange}
                                                style={{
                                                    border: validation.billAmount
                                                    ? '1px solid #F1416C'
                                                    : '1px solid #e0e0df',
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="electricityRate"
                                        >
                                            <Form.Label className="fs-16 fw-500 required">
                                                Electricity Rate
                                            </Form.Label>
                                            <Form.Control
                                                className={clsx(
                                                    'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                    { 'border-danger': validation.electricityRate }
                                                )}
                                                type="number"
                                                placeholder="Type here…"
                                                name="electricityRate"
                                                value={formData.electricityRate ?? ''}
                                                onChange={handleInputChange}
                                                style={{
                                                    border: validation.electricityRate
                                                    ? '1px solid #F1416C'
                                                    : '1px solid #e0e0df',
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="userId"
                                        >
                                            <Form.Label className="fs-16 fw-500 required">
                                                User
                                            </Form.Label>
                                            <CustomSelectWhite
                                                border={validation.userId ? '#F1416C' : ''}
                                                placeholder="Select User"
                                                options={userOptions}
                                                isMulti={false}
                                                onChange={handleSelectChange}
                                                value={userOptions.find(
                                                    (option) => option.value === formData.userId
                                                ) || null}
                                                minHeight="42px"
                                                controlFontSize="14px"
                                                fontWeight="500"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="billImage"
                                        >
                                            <Form.Label className="fs-16 fw-500 required">
                                                Bill Image (IMAGE only)
                                            </Form.Label>
                                            <Form.Control
                                                className={clsx(
                                                    'form-control bg-white fs-15 fw-500 border-radius-15px',
                                                    { 'border-danger': validation.billImage }
                                                )}
                                                type="file"
                                                accept=".jpg,.jpeg,.png" // Allow Images
                                                onChange={handleFileChange}
                                                style={{
                                                    border: validation.billImage
                                                    ? '1px solid #F1416C'
                                                    : '1px solid #e0e0df',
                                                    height: '42px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    paddingTop: '16px',
                                                    paddingBottom: '16px',
                                                }}
                                            />
                                            <Form.Text className="text-muted fs-12 mt-1">
                                                Only Image files are allowed
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center gap-4">
                            <Button
                                size="lg"
                                onClick={handleAddPlant}
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
                                        Add Plant
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

export default AddPlant;