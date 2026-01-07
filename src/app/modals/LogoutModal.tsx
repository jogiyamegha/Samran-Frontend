import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../modules/auth';
import APICallService from '../../api/apiCallService';
import { LOGOUT } from '../../api/apiEndPoints';

const LogoutModal = (props: any) => {
    const { logout } = useAuth();
    const handleLogout = async () => {
        console.log("step 1")
        // Perform logout action here
        const apiService = new APICallService(LOGOUT);
        const response = await apiService.callAPI();
        console.log("logout res=>", response)
        if (response) {
            logout();
            props.onHide();
        }
    };
    return (
        <Modal
            {...props}
            show={props.show}
            onHide={props.onHide}
            dialogClassName="modal-dialog-centered"
            className="border-r10px"
            centered
            backdrop={true}
            size="md"
        >
            <Modal.Header className="border-bottom-0 d-flex justify-content-center">
                <Modal.Title className="fs-18 fw-bold">
                    {' '}
                    Are you sure you want to logout?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer className="justify-content-center border-top-0">
                <button
                    onClick={props.onHide}
                    className="btn fw-bolder"
                >
                    Cancel
                </button>
                <Button
                    style={{ background: '#b30000' }}
                    variant="danger"
                    size="lg"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default LogoutModal;
