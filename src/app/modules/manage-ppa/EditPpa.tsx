import clsx from "clsx";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import CustomDatePicker from "../../custom/DateRange/DatePicker";
import {CustomSelectWhite} from "../../custom/select/CustomSelectWhite";
import {error, success} from "../../../global/toast";
import APICallService from "../../../api/apiCallService";
import { PLANT, PPA } from "../../../api/apiEndPoints";
import {PLANTAPIJSON} from "../../../api/apiJSON/plant";
import {PPAAPIJSON} from "../../../api/apiJSON/ppa";
import { PlantStatus } from "../../../utils/constants";
import { fork } from "child_process";

const EditPpa = () => {
    const navigate = useNavigate();
    const {state}: any = useLocation();
    const [loading, setLoading] = useState(false);
    const [plantOptions, setPlantOptions] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        ppaName: state?.ppaName || null,
        plantId: state?.plantDetail?.plantId || null,
        plantCapacity: state?.plantCapacity || null,
        tarrif: state?.tarrif || null,
        expectedYears: state?.expectedYears || null,
        startDate: state?.startDate ? new Date(state.startDate) : null,
        ppaDocument: state?.ppaDocument || null,
        leaseDocument:  state?.leaseDocument || null,
    });
    const [validation, setValidation] = useState({
        ppaName: false,
        plantId: false,
        plantCapacity: false,
        tarrif: false,
        expectedYears: false,
        startDate: false,
        ppaDocument: false,
        leaseDocument: false,
    });

    useEffect(() => {
        const fetchPlants = async () => {
            const params = {
                page: 1,
                limit: 1000,
                sortKey: '_createdAt',
                sortOrder: -1,
                needCount: false,
            };
            const apiService = new APICallService(
                PLANT.LISTPLANT,
                PLANTAPIJSON.listPlant(params)
            );

            const response = await apiService.callAPI();
            console.log("response",response);
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
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const handlePpaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        console.log("knu 1",file);
        setFormData({
            ...formData,
            ppaDocument: file,
        });
        console.log(formData);
        validateField("ppaDocument", file);
    };

    const handleLeaseFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        console.log("knu 2", file);
        setFormData({
            ...formData,
            leaseDocument: file,
        });
        validateField("leaseDocument", file);
    };

    const handleSelectChange = (selected: any) => {
        const value = selected ? selected.value : null;
        setFormData({
            ...formData,
            plantId: value,
        });
        validateField("plantId", value);
    };

    const handleDateChange = (date: Date | null) => {
        setFormData({
            ...formData,
            startDate: date,
        });
        validateField("startDate", date);
    };

    const validateField = (name: string, value: any) => {
        let isInvalid = value === null || value === "" || (typeof value === "string" && value.trim() === "");
        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    };

    // const handleEditPpa = async () => {
    //     setLoading(true);
    //     const newValidation = {
    //         ppaName: formData.ppaName.trim() === "",
    //         plantId: formData.plantId === null,
    //         plantCapacity: formData.plantCapacity === null,
    //         tarrif: formData.tarrif === null,
    //         expectedYears: formData.expectedYears === null,
    //         startDate: formData.startDate === null,
    //         ppaDocument: false, // PpaDocument is optional for edit
    //         leaseDocument: false, // leaseDocument is optional for edit
    //     };
    //     setValidation(newValidation);

    //     const isValid = !Object.values(newValidation).some((value) => value);
    //     if (isValid) {
    //         // Use PATCH_FORM_ID if new file is uploaded, otherwise use PATCH_ID
    //         const hasNewFile = formData.ppaDocument instanceof File || formData.leaseDocument instanceof File;
    //         const endpoint = hasNewFile ? PPA.EDITPPA_FORM : PPA.EDITPPA;

    //         const payload = hasNewFile
    //             ? PPAAPIJSON.editPpa({
    //                   ppaName: formData.ppaName,
    //                   plantId: formData.plantId!,
    //                   plantCapacity: formData.plantCapacity!,
    //                   startDate: formData.startDate!,
    //                   tarrif: formData.tarrif!,
    //                   expectedYears: formData.expectedYears!,
    //                   ppaDocument: formData.ppaDocument!,
    //                   leaseDocument: formData.leaseDocument!,
    //               })
    //             : PPAAPIJSON.editPpaWithoutFile({
    //                 ppaName: formData.ppaName,
    //                 plantId: formData.plantId!,
    //                 plantCapacity: formData.plantCapacity!,
    //                 tarrif: formData.tarrif!,
    //                 expectedYears: formData.expectedYears!,
    //                 startDate: formData.startDate!
    //             });

    //         const apiService = new APICallService(endpoint, payload, {id: state._id});
    //         const response = await apiService.callAPI();
    //         if (response) {
    //             success("File has been edited successfully");
    //             // navigate("/manage-certificates/all-certificates");
    //         }
    //     }
    //     setLoading(false);
    // };

    const handleEditPpa = async () => {
        setLoading(true);

        const hasNewFile = formData.ppaDocument instanceof File || formData.leaseDocument instanceof File;

        const endpoint = hasNewFile ? PPA.EDITPPA_FORM : PPA.EDITPPA;

        const payload = hasNewFile ? PPAAPIJSON.editPpa(formData) : PPAAPIJSON.editPpaWithoutFile(formData);

        const apiService = new APICallService(
            endpoint,
            payload,
            { id: state._id }
        );

        const response = await apiService.callAPI();

        if (response) {
            success('PPA updated successfully');
            navigate('/ppa/all-ppa');
        }
        setLoading(false);
    };

    const handleBack = () => {
        navigate("/ppa/all-ppa");
    };

    return (
      <div className="p-9 bg-light">
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
                        <h1 className="fs-22 fw-bolder mb-0"  style={{ color: '#1e3369' }}>Edit PPA</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mb-lg-0 mb-8">
                    <Card className="border bg-white">
                        <Card.Body className="p-6">
                            <Form>
                            <Row className="g-6">
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark">
                                                    PPA name
                                                </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="ppaName"
                                                        value={formData.ppaName}
                                                        onChange={handleInputChange}
                                                        placeholder="Type here…"
                                                        className="form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px"
                                                        style={{
                                                            border: validation.ppaName
                                                            ? '1px solid #F1416C'
                                                            : '1px solid #e0e0df',
                                                        }}
                                                    />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark">
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
                                                    )}
                                                    minHeight="40px"
                                                    controlFontSize="14px"
                                                    fontWeight="500"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark">
                                                    Plant's Capacity
                                                </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="plantCapacity"
                                                        value={formData.plantCapacity}
                                                        onChange={handleInputChange}
                                                        placeholder="Type here…"
                                                        className="form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px"
                                                        style={{
                                                            border: validation.plantCapacity
                                                            ? '1px solid #F1416C'
                                                            : '1px solid #e0e0df',
                                                        }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark">
                                                    Tarrif
                                                </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="tarrif"
                                                        value={formData.tarrif}
                                                        onChange={handleInputChange}
                                                        placeholder="Type here…"
                                                        className="form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px"
                                                        style={{
                                                            border: validation.tarrif
                                                            ? '1px solid #F1416C'
                                                            : '1px solid #e0e0df',
                                                        }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark">
                                                    Expected Years
                                                </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="expectedYears"
                                                        value={formData.expectedYears}
                                                        onChange={handleInputChange}
                                                        placeholder="Type here…"
                                                        className="form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px"
                                                        style={{
                                                            border: validation.expectedYears
                                                            ? '1px solid #F1416C'
                                                            : '1px solid #e0e0df',
                                                        }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark">
                                                    Start Date
                                                </Form.Label>
                                                <CustomDatePicker
                                                    selected={formData.startDate}
                                                    onChange={handleDateChange}
                                                    placeholder="Select Date…"
                                                    dateFormat="dd-MM-yyyy"
                                                    isClearable={true}
                                                    className={clsx(
                                                        'form-control bg-white min-h-43px fs-15 fw-500 border-radius-15px',
                                                        validation.startDate && 'border-danger'
                                                    )}
                                                    style={{
                                                        border: validation.startDate
                                                        ? '1px solid #F1416C !important'
                                                        : '1px solid #e0e0df',
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark">
                                                    PPA File
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept=".pdf"
                                                    name="ppaDocument"
                                                    onChange={handlePpaFileChange}
                                                    className="form-control bg-white fs-15 fw-500 border-radius-15px"
                                                    style={{
                                                        border: validation.ppaDocument
                                                        ? '1px solid #F1416C'
                                                        : '1px solid #e0e0df',
                                                        height: '40px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        paddingTop: '16px',
                                                        paddingBottom: '16px',
                                                    }}
                                                />
                                                {formData.ppaDocument && (
                                                    <div className="mt-2 fs-14 fw-500 text-success">
                                                        New file selected: {formData.ppaDocument.name}
                                                    </div>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark">
                                                    Lease File
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept=".pdf"
                                                    name="leaseDocument"
                                                    onChange={handleLeaseFileChange}
                                                    className="form-control bg-white fs-15 fw-500 border-radius-15px"
                                                    style={{
                                                        border: validation.leaseDocument
                                                        ? '1px solid #F1416C'
                                                        : '1px solid #e0e0df',
                                                        height: '40px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        paddingTop: '16px',
                                                        paddingBottom: '16px',
                                                    }}
                                                />
                                                {formData.ppaDocument && (
                                                    <div className="mt-2 fs-14 fw-500 text-success">
                                                        New file selected: {formData.leaseDocument.name}
                                                    </div>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        {state?.ppaDocument && (
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark mb-3">
                                                    Current PPA Document
                                                </Form.Label>
                                                <Card className="border bg-light">
                                                    <Card.Body className="p-4">
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <div className="fs-14 fw-500 text-dark">
                                                            <i className="bi bi-file-pdf me-2 text-danger"></i>
                                                                Current PPA File
                                                            </div>
                                                            <a
                                                                href={state.ppaDocument}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-sm btn-primary"
                                                            >
                                                                <i className="bi bi-box-arrow-up-right me-1"></i>
                                                                Open in New Tab
                                                            </a>
                                                        </div>
                                                        {/* <div
                                                            className="border rounded"
                                                            style={{
                                                                height: '600px',
                                                                overflow: 'hidden',
                                                                backgroundColor: '#f8f9fa',
                                                            }}
                                                        >
                                                            <iframe
                                                                src={state.ppaDocument}
                                                                title="PPA PDF"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    border: 'none',
                                                                }}
                                                            />
                                                        </div> */}
                                                    </Card.Body>
                                                </Card>
                                                </Form.Group>
                                            </Col>
                                        )}
                                        {state?.leaseDocument && (
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                <Form.Label className="fs-16 fw-600 text-dark mb-3">
                                                    Current Lease Document
                                                </Form.Label>
                                                <Card className="border bg-light">
                                                    <Card.Body className="p-4">
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <div className="fs-14 fw-500 text-dark">
                                                            <i className="bi bi-file-pdf me-2 text-danger"></i>
                                                                Current Lease File
                                                            </div>
                                                            <a
                                                                href={state.leaseDocument}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-sm btn-primary"
                                                            >
                                                                <i className="bi bi-box-arrow-up-right me-1"></i>
                                                                Open in New Tab
                                                            </a>
                                                        </div>
                                                        {/* <div
                                                            className="border rounded"
                                                            style={{
                                                                height: '600px',
                                                                overflow: 'hidden',
                                                                backgroundColor: '#f8f9fa',
                                                            }}
                                                        >
                                                            <iframe
                                                                src={state.leaseDocument}
                                                                title="Lease PDF"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    border: 'none',
                                                                }}
                                                            />
                                                        </div> */}
                                                    </Card.Body>
                                                </Card>
                                                </Form.Group>
                                            </Col>
                                        )}
                                    </Row>
                                <div className="d-flex justify-content-center gap-4 mt-4">
                                    <Button
                                        variant="primary"
                                        onClick={handleEditPpa}
                                        size="sm"
                                        disabled={loading}
                                    >
                                    {loading ? (
                                        <>
                                            Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </>
                                    ) : (
                                        <span className="indicator-label fs-16 fw-bold">
                                            Save Changes
                                        </span>
                                    )}
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="fs-16 fw-bold"
                                        onClick={handleBack}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        </div>
    );
};

export default EditPpa;