import { Modal, Button } from 'react-bootstrap';

const DeleteModal = (props: any) => {

    const handleDelete = () => {
        props.onHide();
        props.handleDelete();
    };

    return (
        <Modal
            {...props}
            show={props.show}
            onHide={props.onHide}
            dialogClassName="modal-dialog-centered max-w-450px"
            className="border-r10px"
            centered
            backdrop={true}
            size="md"
        >
            <Modal.Body>
                <div className='text-center d-flex flex-column gap-2 '>
                    <span className="text-center fs-18 fw-600">
                        Are you sure you want to delete this {props.itemName}?
                    </span>
                    <span className='fs-16 fw-normal'>Once you delete this {props.itemName}, they cannot be recovered</span>
                </div>
            </Modal.Body>
            <div className="d-flex justify-content-center gap-5 mb-8">
                <button
                    onClick={props.onHide}
                    className="btn fw-bolder bg-gray-200"
                >
                    Cancel
                </button>
                <Button
                    style={{ background: '#b30000' }}
                    variant="danger"
                    size="lg"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
