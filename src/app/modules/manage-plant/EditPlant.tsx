import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { success, error } from '../../../global/toast';
import clsx from 'clsx';
import { PLANT, USER } from '../../../api/apiEndPoints';
import { PLANTAPIJSON } from '../../../api/apiJSON/plant';
import APICallService from '../../../api/apiCallService';
import CustomDatePicker from '../../custom/DateRange/DatePicker';
import { propertyTypeOptions, weekdayOptions } from '../../../utils/staticJSON';
import { CustomSelectWhite } from '../../custom/select/CustomSelectWhite';
import { USERAPIJSON } from '../../../api/apiJSON/user';
import { UserTypes } from '../../../utils/constants';

const EditPlant = () => {
    const navigate = useNavigate();
    const { state }: any = useLocation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    console.log("🚀 ~ EditSite ~ state:", state)
    const [userOptions, setUserOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        plantUniqueName: state?.plantUniqueName || '',
        plantUniqueId: state?.plantUniqueId || '',
        userId: state?.userDetails?.userId || '',
        propertyName: state?.propertyAddress?.propertyName || '',
        propertyType: state?.propertyAddress?.propertyType || 0,
        address: state?.propertyAddress?.address || '',
        city: state?.propertyAddress?.city || '',
        state: state?.propertyAddress?.state || '',
        pincode: state?.propertyAddress?.pincode || 0,
        roofArea: state?.propertyAddress?.roofArea || 0,
        billAmount: state?.propertyAddress?.billAmount || 0,
        electricityRate: state?.propertyAddress?.electricityRate || 0,
        billImage: state?.propertyAddress?.billImage || '' 
    });
    const [validation, setValidation] = useState({
        plantUniqueId: false,
        plantUniqueName: false,
        userId: false,
        propertyName: false,
        propertyType: false,
        address: false,
        city: false,
        state: false,
        pincode: false,
        roofArea: false,
        billAmount: false,
        electricityRate: false,
        billImage: false,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const params = {
                page: 1,
                limit: 100,
                sortKey: "_createdAt",
                sortOrder: -1,
                needCount: false,
                userType : UserTypes.Consumer,
            };
            const apiService = new APICallService(USER.LISTUSER, USERAPIJSON.listUser(params));
            const response = await apiService.callAPI();
            if (response && response.records) {
                const options = response.records.map((user: any) => ({
                    value: user._id,
                    label: `${user.name}`,
                }));
                setUserOptions(options);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData({
            ...formData,
            billImage: file,
        });
        validateField("billImage", file);
    };

    const handleSelectChange = (selected: any) => {
        const value = selected ? selected.value : null;
        setFormData({
            ...formData,
            userId: value,
        });
        validateField("userId", value);
    };

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (!file) return;

    //     if (!validateImageFile(file)) {
    //         e.target.value = '';
    //         return;
    //     }

    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         if (typeof reader.result === 'string') {
    //         setFormData(prev => ({
    //             ...prev,
    //             propertyAddress: {
    //                 ...prev.propertyAddress,
    //                 billImage: reader.result, 
    //             },
    //         }));
    //         }
    //     };

    //     reader.readAsDataURL(file);
    // };
    
    // const handlePlantNameChange = (plantUniqueName: string) => {
    //     setFormData({
    //         ...formData,
    //         plantUniqueName: plantUniqueName,
    //     });
    //     validateField('plantUniqueName', plantUniqueName);
    // };

    const validateField = (name: string, value: string | number) => {
        let isInvalid =
        value === null || value.toString().trim() === '' || value === 0;
        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    };

    const handleEditSite = async () => {
        setLoading(true);

        const newValidation = {
            plantUniqueId: false,
            plantUniqueName: formData.plantUniqueName.trim() === '',
            userId: formData.userId.trim() === '',
            propertyName: formData.propertyName.trim() === '',
            propertyType: formData.propertyType,
            address: formData.address.trim() === '',
            city: formData.city.trim() === '',
            state: formData.state.trim() === '',
            pincode: formData.pincode,
            roofArea: formData.roofArea,
            billAmount: formData.billAmount,
            billImage: formData.billImage.trim() === '',
            electricityRate: formData.electricityRate,
        };
        setValidation(newValidation);

        const isValid = !Object.values(newValidation).some((value) => value);
        console.log('Form is valid:', isValid, formData);
        if (isValid) {
            // Use PATCH_FORM_ID if new file is uploaded, otherwise use PATCH_ID
            const hasNewFile = formData.billImage !== null;
            const endpoint = hasNewFile ? PLANT.EDITPLANT_FORM : PLANT.EDITPLANT;
            const payload = hasNewFile
                ? PLANTAPIJSON.editPlant({
                      plantUniqueName: formData.plantUniqueName,
                      propertyName: formData.propertyName!,
                      propertyType: formData.propertyType!,
                      address: formData.address!,
                      city: formData.city!,
                      state: formData.state!,
                      pincode: formData.pincode!,
                      roofArea: formData.roofArea!,
                      billAmount: formData.billAmount!,
                      electricityRate: formData.electricityRate!,
                      userId: formData.userId!,
                      billImage: formData.billImage!,
                  })
                : PLANTAPIJSON.editPlantWithoutBillImage({
                      plantUniqueName: formData.plantUniqueName,
                      propertyName: formData.propertyName!,
                      propertyType: formData.propertyType!,
                      address: formData.address!,
                      city: formData.city!,
                      state: formData.state!,
                      pincode: formData.pincode!,
                      roofArea: formData.roofArea!,
                      billAmount: formData.billAmount!,
                      electricityRate: formData.electricityRate!,
                      userId: formData.userId!,
                      billImage: formData.billImage!
                  });
            const apiService = new APICallService(endpoint, payload, {id: state._id});
            const response = await apiService.callAPI();

            if (response) {
                success('Plant edited successfully');
                navigate('/plant/all-plants');
            }
        }
        setLoading(false);
    };

    const handleBack = () => {
        navigate('/manage-sites/all-sites');
    };

    return (
        <div className="p-9 bg-light">
            <Row className="mb-6">
                <Col xs={12}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <h1 className="fs-22 fw-bolder">Edit Plant</h1>
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
                            Plant's Unique Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="plantUniqueName"
                            value={formData.plantUniqueName}
                            onChange={handleInputChange}
                            className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                            style={{
                                border: validation.plantUniqueName ? '1px solid #F1416C' : '1px solid #e0e0df',
                            }}
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                        <Form.Label className="fs-16 fw-600 text-dark required">
                            Plant's Unique ID
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="plantUniqueId"
                            value={formData.plantUniqueId}
                            onChange={handleInputChange}
                            className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                            style={{
                                border: validation.plantUniqueId ? '1px solid #F1416C' : '1px solid #e0e0df',
                            }}
                            disabled={true}
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                Property Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="propertyName"
                                value={formData.propertyName}
                                onChange={handleInputChange}
                                className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                                style={{
                                border: validation.propertyName ? '1px solid #F1416C' : '1px solid #e0e0df',
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                Property Type
                            </Form.Label>
                            <CustomSelectWhite
                                height={'50px'}
                                isDisabled={true}
                                controlFontSize="14px"
                                fontWeight="500"
                                border={validation.propertyType ? 'red' : ''}
                                placeholder="Select Property Type"
                                options={propertyTypeOptions}
                                isMulti={false}
                                value={propertyTypeOptions.find(
                                    (option) => option.value === formData.propertyType
                                )}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                Address
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                                style={{
                                    border: validation.address ? '1px solid #F1416C' : '1px solid #e0e0df',
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                State
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                                style={{
                                    border: validation.state ? '1px solid #F1416C' : '1px solid #e0e0df',
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                City
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                                style={{
                                    border: validation.city ? '1px solid #F1416C' : '1px solid #e0e0df',
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                Pincode
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                                style={{
                                    border: validation.pincode? '1px solid #F1416C' : '1px solid #e0e0df',
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                Roof Area
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="roofArea"
                                value={formData.roofArea}
                                onChange={handleInputChange}
                                className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                                style={{
                                    border: validation.roofArea ? '1px solid #F1416C' : '1px solid #e0e0df',
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                Bill Amount
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="billAmount"
                                value={formData.billAmount}
                                onChange={handleInputChange}
                                className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                                style={{
                                    border: validation.billAmount ? '1px solid #F1416C' : '1px solid #e0e0df',
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                Electricity Rate
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="electricityRate"
                                value={formData.electricityRate}
                                onChange={handleInputChange}
                                className="form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"
                                style={{
                                    border: validation.electricityRate ? '1px solid #F1416C' : '1px solid #e0e0df',
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark">
                                Bill Image
                            </Form.Label>
                            <Form.Control
                                type="file"
                                accept=".jpg .png .jpeg"
                                name="certificate"
                                onChange={handleFileChange}
                                className="form-control bg-white fs-15 fw-500 border-radius-15px"
                                style={{
                                    border: validation.billImage
                                    ? '1px solid #F1416C'
                                    : '1px solid #e0e0df',
                                    height: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingTop: '16px',
                                    paddingBottom: '16px',
                                }}
                            />
                            {formData.billImage && (
                                <div className="mt-2 fs-14 fw-500 text-success">
                                    New file selected: {formData.billImage.name}
                                </div>
                            )}
                        </Form.Group>
                    </Col>
                    {state?.certificate && (
                        <Col md={12}>
                            <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark mb-3">
                                Current Bill Image
                            </Form.Label>
                            <Card className="border bg-light">
                                <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="fs-14 fw-500 text-dark">
                                    <i className="bi bi-file-pdf me-2 text-danger"></i>
                                        Current Bill Image
                                    </div>
                                    <a
                                        href={state.certificate}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-primary"
                                    >
                                    <i className="bi bi-box-arrow-up-right me-1"></i>
                                        Open in New Tab
                                    </a>
                                </div>
                                <div
                                    className="border rounded"
                                    style={{
                                        height: '600px',
                                        overflow: 'hidden',
                                        backgroundColor: '#f8f9fa',
                                    }}
                                >
                                    <iframe
                                        src={state.certificate}
                                        title="Certificate PDF"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                        }}
                                    />
                                </div>
                                </Card.Body>
                            </Card>
                            </Form.Group>
                        </Col>
                    )}
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

export default EditPlant;