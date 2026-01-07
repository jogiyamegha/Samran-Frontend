import { useState,useEffect } from "react"
import APICallService from "../../../api/apiCallService";
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { CMS } from '../../../api/apiEndPoints';
import { success } from "../../../global/toast";
import Loader from '../../../global/loader';

const AppSettings = () => {
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [formData, setFormData] = useState({
        androidVersion: '',
        iOSVersion: '',
        androidForceUpdate: false,
        iOSForceUpdate: false,
        iOSUnderMaintenance: false,
        androidUnderMaintenance: false,
        interface: 'i3',
    });
    const [validation, setValidation] = useState({
        androidVersion: false,
        iOSVersion: false,
    });

    useEffect(() => {
        (async () => {
            setFetchLoading(true);
            await fetchData('i3');
            setFetchLoading(false)
        }) ();
    }, []);

    const fetchData = async (selectedAppValue: any) => {
        setFetchLoading(true);
        const apiService = new APICallService(CMS.GET_APP_SETTINGS, {
            interface: 'i3'
        });
        const response = await apiService.callAPI();
        if (response) {
            const tempDate: any = {
                androidForceUpdate: response.androidForceUpdate,
                iOSForceUpdate: response.iOSForceUpdate,
                iOSUnderMaintenance: response.iOSUnderMaintenance,
                androidUnderMaintenance: response.androidUnderMaintenance,
                interface: selectedAppValue,
                androidVersion: response?.androidVersion || '',
                iOSVersion: response?.iOSVersion || '',
            };
            setFormData(tempDate);
        }
        setFetchLoading(false);
    }

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({
            ...prevData,
            [name] : newValue
        }));

        if (name === 'iOSVersion') {
            const isValid = /^\d+\.\d+$/.test(value);
            setValidation((prevValidation) => ({
                ...prevValidation,
                iOSVersion: !isValid,
            }))
        } else if (name === 'androidVersion') {
            const isValid = /^\d+\.\d+\.\d+$/.test(value);
            setValidation((prevValidation) => ({
                ...prevValidation,
                androidVersion: !isValid,
            }));
        }
    }
    const handleSave = async (data: any) => {
        const tempValidation = { ...validation };
        if (formData.iOSVersion.trim().length === 0 || formData.iOSVersion === '0') {
            tempValidation.iOSVersion = true;
        }

        if (formData.androidVersion.trim().length === 0 || formData.androidVersion === '0') {
            tempValidation.androidVersion = true;
        }

        if (!tempValidation.iOSVersion && !tempValidation.androidVersion) {
            setLoading(true);
            const apiService = new APICallService(CMS.UPDATE_APP_SETTINGS, data);
            const response = await apiService.callAPI();
            if (response) {
                success('App settings has been updated successfully');
            }
            setLoading(false);
        } else {
            console.error('Validation failed. Cannot save data.');
        }
        setValidation(tempValidation);
    };

    return (
        <div className="p-8">
            <Row className="align-items-center">
                <Col
                    md
                    className="align-self-center mb-5"
                >
                    <Row className="align-items-center">
                        <Col
                            lg={8}
                            md={6}
                        >
                            <h1 className="fs-22 fw-bolder">App Settings</h1>
                        </Col>
                    </Row>
                </Col>
                {fetchLoading ? (
                    <div className="d-flex justify-content-center m-4">
                        <Loader loading={fetchLoading} />
                    </div>
                ) : (
                    <>
                        <Col xs={12}>
                            <Card className="bg-light border mb-7">
                                <Card.Body className="px-7">
                                    <Row className="gx-6 gy-6 gx-lg-10">
                                        <Col
                                            md={7}
                                            lg={6}
                                        >
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fs-16 fw-500">
                                                    Android Version <span className='fs-14 fw-400'>(Eg: 1.0.0)</span>
                                                </Form.Label>
                                                <Form.Control
                                                    className={`form-control-custom bg-white ${
                                                        validation.androidVersion ? 'border-danger' : ''
                                                    }`}
                                                    type="text"
                                                    placeholder="Type here..."
                                                    name="androidVersion"
                                                    value={formData.androidVersion}
                                                    onChange={handleInputChange}
                                                />
                                                {validation.androidVersion && (
                                                    <div className="text-danger fs-12 fw-bold">
                                                        Android version should not be empty, zero and up to
                                                        two dots (.) are allowed.
                                                    </div>
                                                )}
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fs-16 fw-500">
                                                    iOS Version <span className='fs-14 fw-400'>(Eg: 1.0)</span>
                                                </Form.Label>
                                                <Form.Control
                                                    className={`form-control-custom bg-white ${
                                                        validation.iOSVersion ? 'border-danger' : ''
                                                    }`}
                                                    type="text"
                                                    placeholder="Type here..."
                                                    name="iOSVersion"
                                                    value={formData.iOSVersion}
                                                    onChange={handleInputChange}
                                                />
                                                {validation.iOSVersion && (
                                                    <div className="text-danger fs-12 fw-bold">
                                                        iOS version should not be empty, zero and only one
                                                        dot (.) is allowed.
                                                    </div>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col
                                            md={5}
                                            lg={6}
                                        >
                                        <div className=" d-flex flex-column flex-wrap gap-5">
                                            <div className="form-check form-check-custom form-check-solid form-check-lg">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="1"
                                                    id="androidForceUpdate"
                                                    name="androidForceUpdate"
                                                    checked={formData.androidForceUpdate}
                                                    onChange={handleInputChange}
                                                />
                                                <label
                                                    className="form-check-label fs-16 fw-600 text-black ms-3"
                                                    htmlFor="androidForceUpdate"
                                                    onChange={handleInputChange}
                                                >
                                                    Android Force Update
                                                </label>
                                            </div>
                                                <div className="form-check form-check-custom form-check-solid form-check-lg">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="1"
                                                    id="androidUnderMaintenance"
                                                    name="androidUnderMaintenance"
                                                    checked={formData.androidUnderMaintenance}
                                                    onChange={handleInputChange}
                                                />
                                                <label
                                                    className="form-check-label fs-16 fw-600 text-black ms-3"
                                                    htmlFor="androidUnderMaintenance"
                                                    onChange={handleInputChange}
                                                >
                                                    Android App Maintenance
                                                </label>
                                            </div>
                                                <div className="form-check form-check-custom form-check-solid form-check-lg">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="1"
                                                    id="iOSForceUpdate"
                                                    name="iOSForceUpdate"
                                                    checked={formData.iOSForceUpdate}
                                                    onChange={handleInputChange}
                                                />
                                                <label
                                                    className="form-check-label fs-16 fw-600 text-black ms-3"
                                                    htmlFor="iOSForceUpdate"
                                                    onChange={handleInputChange}
                                                >
                                                    iOS Force Update
                                                </label>
                                            </div>
                                            <div className="form-check form-check-custom form-check-solid form-check-lg">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="1"
                                                    id="iOSUnderMaintenance"
                                                    name="iOSUnderMaintenance"
                                                    checked={formData.iOSUnderMaintenance}
                                                    onChange={handleInputChange}
                                                />
                                                <label
                                                    className="form-check-label fs-16 fw-600 text-black ms-3"
                                                    htmlFor="iOSUnderMaintenance"
                                                    onChange={handleInputChange}
                                                >
                                                    iOS App Maintenance
                                                </label>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                            <Row>
                                <Col xs={3}>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => handleSave(formData)}
                                    disabled={loading}
                                >
                                    {!loading && (
                                    <span className="indicator-label">Update</span>
                                    )}
                                    {loading && (
                                    <span
                                        className="indicator-progress"
                                        style={{ display: 'block' }}
                                    >
                                        Please wait...
                                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    </span>
                                    )}
                                </Button>
                            </Col>
                        </Row>
                        </Col>
                    </>
                )}
            </Row>
        </div>
    )
}
export default AppSettings;