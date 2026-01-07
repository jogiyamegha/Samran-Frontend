import { useNavigate } from 'react-router-dom';
import Lock from '../../../../_admin/assets/media/svg/lock.svg';
import { Button } from 'react-bootstrap';
export function Successfull() {
    const navigate = useNavigate();
    return (
        <div className="d-flex flex-column gap-4">
            <div className="d-flex justify-content-center align-items-center">
                <img
                    src={Lock}
                    alt="logo"
                />
            </div>
            <div className="d-flex justify-content-center align-items-center fs-3 fw-bold">
                Password reset successfully!
            </div>
        <div className="d-flex justify-content-center align-items-center w-100">
                <Button
                    className="btn btn-primary w-100"
                    onClick={() => navigate('/')}
                >
                    Back to login
                </Button>
            </div>
        </div>
    );
}
