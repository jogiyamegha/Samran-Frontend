import React from 'react';
import { Modal } from 'react-bootstrap';
import CrossSvg from '../../_admin/assets/media/svg/CloseImagePopUp.svg';

interface CommonImageModalProps {
    show: boolean;
    onHide: () => void;
    imageSrc: string;
    imageAlt?: string;
}

const CommonImageModal: React.FC<CommonImageModalProps> = ({
    show,
    onHide,
    imageSrc,
    imageAlt,
}) => {
    return (
        <>
            <style>{`
                .custom-modal-dialog {
                max-width: 90vw !important;
                margin: 1.75rem auto !important;
                }
                .custom-modal-content {
                background-color: transparent !important;
                border: none !important;
                box-shadow: none !important;
                }
            `}</style>
            <Modal
                show={show}
                onHide={onHide}
                centered
                dialogClassName="custom-modal-dialog"
                contentClassName="custom-modal-content"
            >
                <Modal.Body className="d-flex gap-3 justify-content-center px-0 py-0 bg-transparent position-relative" style={{ overflow: 'hidden' }}>

                    <img
                        src={imageSrc}
                        alt={imageAlt || 'Image'}
                        style={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '85vw',
                            maxHeight: '85vh',
                            objectFit: 'contain',
                            transition: 'transform 0.2s',
                            borderRadius: '8px',
                        }}
                    />
                    <img
                        className="cursor-pointer position-sticky"
                        width={36}
                        height={36}
                        src={CrossSvg}
                        alt="close"
                        onClick={onHide}
                        style={{
                            top: '0px',
                            left: '260px',
                            zIndex: 1060,
                        }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CommonImageModal;


 