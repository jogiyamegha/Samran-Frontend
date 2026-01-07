import { Button, Form, Modal, Row } from "react-bootstrap"
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { success } from '../../global/toast';
import APICallService from '../../api/apiCallService';
import { CMS } from '../../api/apiEndPoints';
import { Cms } from '../../utils/toast';

const AddFaqs = (props: any) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [faqData, setFaqData] = useState<{
        question: string;
        answer: string;
    }> ({
        question: '',
        answer: ''
    })

    const [faqValidation, setFaqValidation] = useState<{
        question: boolean;
        answer: boolean
    }> ({
        question: false,
        answer: false,
    })

    useEffect(() => {
        setFaqData({
            question: props.question || '',
            answer: props.answer || '',
        })
    }, [props.question, props.answer]);

    const handleChange = (value: string, name: string) => {
        const temp: any = { ...faqData };
        const tempValidation: any = { ...faqValidation };
        if (value.length === 0) {
            tempValidation[name] = true;
        } else {
            tempValidation[name] = false;
        }

        temp[name] = value;
        setFaqData(temp);
        setFaqValidation(tempValidation);
    }

    const handleSubmit = async () => {
        const temp = { ...faqData };
        const tempValidation = { ...faqValidation };

        if (temp.question.trim().length === 0) {
            tempValidation.question = true;
        }

        if (temp.answer.trim().length === 0) {
            tempValidation.answer = true;
        }
        if (!tempValidation.answer && !tempValidation.question) {
            setLoading(true);
            let endPoint;
            let params: any = undefined;
            if (props.title === 'Add') {
                endPoint = CMS.ADD_FAQ;
            }
            if (props.title === 'Edit') {
                endPoint = CMS.UPDATE_FAQ;
                params = {
                    _id: props.id,
                };
            }
            const apiService = new APICallService(endPoint, temp, params);
            const response = await apiService.callAPI();
            if (response) {
                if (props.title === 'Add') {
                success(Cms.addFaq);
                } else if (props.title === 'Edit') {
                success(Cms.editFaq);
                }
                props.onHide();
            }
            setLoading(false);
        }
        setFaqValidation(tempValidation);
    };
    return (
        <>
            <Modal
                {...props}
                show={props.show}
                onHide={props.handleClose}
                dialogClassName="modal-dialog-centered min-w-lg-600px"
                className="border-r10px"
            >
                <Modal.Header className="border-bottom-0 pb-6 text-center mx-auto">
                    <Modal.Title className="fs-26 fw-bolder mw-lg-375px mt-8">
                        {props.title === 'Add' ? 'Add FAQ' : 'Edit FAQ'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="align-items-center mx-4 my-3">
                        <Form.Group controlId="formBasicQuestion">
                            <Form.Label className="fs-16 fw-500">Question</Form.Label>
                            <Form.Control
                                className={clsx(
                                    'form-control-custom bg-light',
                                    faqValidation.question ? 'border-danger' : 'border'
                                )}
                                value={faqData.question}
                                onChange={(event: any) =>
                                    handleChange(event.target.value.trimStart(), 'question')
                                }
                                placeholder="Type here..."
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicAnswer">
                            <Form.Label className="pt-7 fs-16 fw-500">Answer</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    className={clsx(
                                        'form-control-custom bg-light',
                                        faqValidation.answer ? 'border-danger' : 'border'
                                    )}
                                    value={faqData.answer}
                                    onChange={(event: any) =>
                                        handleChange(event.target.value.trimStart(), 'answer')
                                    }
                                    placeholder="Type here..."
                                />
                        </Form.Group>
                    </Row>
                </Modal.Body>
            <Modal.Footer className="justify-content-center pt-1 mb-4 border-top-0">
                <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {!loading && (
                        <span className="indicator-label fs-16 fw-bold">Save</span>
                    )}
                    {loading && (
                        <span
                            className="indicator-progress fs-16 fw-bold"
                            style={{ display: 'block' }}
                        >
                            Please Wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
  );
}

export default AddFaqs;
