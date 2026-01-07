import React, {useState, useEffect, useRef} from "react";

interface ProfileImageModalProps {
    show: boolean;
    onHide: () => void;
    imageUrl: string;
    altText?: string;
    isRound?: boolean;
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({
    show,
    onHide,
    imageUrl,
    altText = "Profile Image",
    isRound = false,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [scale, setScale] = useState(1);
    const modalRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (show) {
            setShouldRender(true);
            document.body.style.overflow = "hidden";
            setScale(1);
            requestAnimationFrame(() => {
                setTimeout(() => setIsVisible(true), 50);
            });
        } else {
            setIsVisible(false);
            document.body.style.overflow = "unset";
            setScale(1);
            setTimeout(() => setShouldRender(false), 300);
        }
    }, [show]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && show) {
                onHide();
            }
        };

        if (show) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [show, onHide]);

    useEffect(() => {
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (imageContainerRef.current && imageContainerRef.current.contains(e.target as Node)) {
                e.preventDefault();
                e.stopPropagation();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                setScale((prevScale) => Math.max(0.5, Math.min(3, prevScale + delta)));
            }
        };

        if (show && shouldRender) {
            document.addEventListener("wheel", handleWheel, {passive: false, capture: true});
        }

        return () => {
            document.removeEventListener("wheel", handleWheel, {capture: true});
        };
    }, [show, shouldRender]);

    if (!shouldRender) return null;

    return (
        <div
            ref={modalRef}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                zIndex: 9999,
                backdropFilter: "blur(4px)",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onClick={onHide}
        >
            <div
                ref={imageContainerRef}
                className="position-relative"
                onClick={(e) => e.stopPropagation()}
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? `scale(${scale})` : "scale(0.95)",
                    transition:
                        "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <img
                    src={imageUrl}
                    alt={altText}
                    className={`img-fluid shadow-lg ${isRound ? "rounded-circle" : "rounded"}`}
                    style={{
                        maxWidth: isRound ? "350px" : "80vw",
                        maxHeight: isRound ? "350px" : "80vh",
                        width: isRound ? "400px" : "auto",
                        height: isRound ? "400px" : "auto",
                        objectFit: "contain",
                    }}
                />
                <button
                    className="btn btn-link text-white position-absolute p-0 d-flex align-items-center justify-content-center"
                    style={{
                        top: "8px",
                        right: "8px",
                        zIndex: 10,
                        width: "34px",
                        height: "34px",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "50%",
                    }}
                    onClick={onHide}
                >
                    <i className="bi bi-x-lg fs-4"></i>
                </button>
            </div>
        </div>
    );
};

export {ProfileImageModal};
