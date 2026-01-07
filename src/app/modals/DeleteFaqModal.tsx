import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

const DeleteFaqModal = (props: any) => {
    const [loading, setLoading] = useState(false);

    const deleteFaq = async () => {
        setLoading(true);
        await props.handleDelete(props.faqId);
        setLoading(false);
    };

    return (
        <>
            <Modal 
                {...props}
                show={props.show}
                onHide={props.onHide}
                dialogClassName="modal-dialog-centered min-w-lg-590px"
                className="border-r10px"
                centered
            >
                <Modal.Header className="border-bottom-0 pb-0 text-center mx-auto">
                    <Modal.Title className="fs-26 fw-bolder mw-lg-375px pt-lg-3">
                        Are you sure you want to delete this FAQ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer className="justify-content-center mt-2 mb-4 border-top-0">
                    <>
                        <button
                            className="btn fw-bolder"
                            onClick={props.onHide}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <Button
                            style={{ background: '#b30000' }}
                            variant="danger"
                            size="lg"
                            onClick={deleteFaq}
                            disabled={loading}
                        >
                            {!loading && <span className="indicator-label">Delete</span>}
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
                    </>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteFaqModal;