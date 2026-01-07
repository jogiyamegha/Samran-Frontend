import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Loader from '../../../global/loader'
import TextEditor from './text-editor'
import APICallService from '../../../api/apiCallService'
import { CMS } from '../../../api/apiEndPoints'
import { success } from '../../../global/toast'
import { Cms } from '../../../utils/toast'

const TermsOfService = () => {
    const [ privacyData, setPrivacyData ] = useState<any>('');
    const [ loading, setLoading ] = useState(false);
    const [ fetchLoading, setFetchLoading ] = useState(true);

    useEffect(() => {
        (async () => {
            setFetchLoading(true);
            await fetchData();
            setFetchLoading(false);
        })();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const apiService = new APICallService(CMS.TERMS_CONDITION);
        const response = await apiService.callAPI();
        if (response) {
            setLoading(true);
            const apiService = new APICallService(CMS.TERMS_CONDITION);
            const response = await apiService.callAPI();
            if (response) {
                setPrivacyData(response);
            }
            setLoading(false);
        }
    }
    
    const handleSave = async (data : any) => {
        setLoading(true);
        const apiService = new APICallService(CMS.UPDATE_TERMS_CONDITIONS, {
            content: data,
        });
        const response = await apiService.callAPI();
        if (response) {
            success(Cms.addTermsCondition);
        }
        setLoading(false);
    }

    const handleDataChange = (data: any) => {
        setPrivacyData(data);
    };
    return (
        <div className="p-9">
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
                            <h1 className="fs-22 fw-bolder">Terms of Service</h1>
                        </Col>
                    </Row>
                </Col>
                {fetchLoading ? (
                    <div className="d-flex justify-content-center m-4">
                        <Loader loading={fetchLoading} />
                    </div>
                    ) : (
                        <>
                            <TextEditor
                                data={privacyData}
                                handleDataChange={handleDataChange}
                            />
                            <Col
                                xs="auto"
                                className="pt-7"
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => handleSave(privacyData)}
                                    disabled={loading}
                                >
                                {!loading && (
                                    <span className="indicator-label">Save Changes</span>
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
                    </>
                )}
            </Row>
        </div>
    );
}
export default TermsOfService;