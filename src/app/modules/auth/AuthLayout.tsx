import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_admin/helpers";

const AuthLayout = () => {
    useEffect(() => {
        const root = document.getElementById("root");
        if (root) {
            root.style.height = "100%";
        }
        return () => {
            if (root) {
                root.style.height = "auto";
            }
        };
    }, []);

    return (
        <div className="re-main d-flex flex-column flex-lg-row h-100 min-vh-100 bg-white">
            {/* Left Side: Dynamic Branding & Content */}
            <div className="d-flex flex-column flex-lg-row-auto w-lg-500px w-xl-600px position-relative bg-[#052F2B] p-12 overflow-hidden justify-content-between">
                {/* Branding */}
                <div className="position-relative z-index-2">
                    <Link to="/" className="mb-12 d-block">
                        <h2 className="text-white fw-black ls-n1 mb-0 display-6">SAMRAN <span className="text-[#43EBA6]">SOLAR</span></h2>
                    </Link>

                    <div className="mt-20">
                        <h1 className="display-4 text-white fw-bolder mb-8 ls-n1">
                            The future of <br />
                            <span className="text-[#43EBA6]">Clean Energy</span> <br />
                            is Digital.
                        </h1>
                        <p className="fs-3 text-[#B2F5EA] opacity-75 fw-light line-height-xl">
                            Join over 1,200+ investors managing solar assets across India's largest digital energy network.
                        </p>
                    </div>
                </div>

                {/* Footer/Trust */}
                <div className="position-relative z-index-2 pt-10">
                    <div className="d-flex align-items-center gap-4 py-6 px-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-4">
                        <div className="avatar-group d-flex">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="symbol symbol-35px symbol-circle border border-2 border-[#052F2B] ms-n2">
                                    <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <span className="text-[#ECFDF5] small fw-medium">Join 400+ new investors this month</span>
                    </div>
                </div>

                {/* Background Graphics */}
                <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundImage: `url(${toAbsoluteUrl('media/redesign/solar_farm_v3.png')})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: '0.2',
                        mixBlendMode: 'luminosity'
                    }}
                ></div>
                <div className="position-absolute bottom-0 end-0 w-300px h-300px bg-[#43EBA6] opacity-20 blur-100px mb-n20 me-n20 rounded-circle"></div>
                <div className="position-absolute top-0 start-0 w-200px h-200px bg-[#0f766e] opacity-20 blur-80px mt-n10 ms-n10 rounded-circle"></div>
            </div>

            {/* Right Side: Form Content */}
            <div className="d-flex flex-column flex-lg-row-fluid py-10">
                <div className="d-flex flex-center flex-column flex-column-fluid">
                    <div className="w-lg-500px p-10 p-lg-15 mx-auto">
                        <Outlet />
                    </div>
                </div>

                {/* Auth Footer */}
                <div className="d-flex flex-center flex-wrap px-5 py-4">
                    <div className="d-flex fw-semibold text-primary fs-base gap-5">
                        <Link to="/terms-conditions" className="text-muted text-hover-primary px-3 text-decoration-none small">Terms</Link>
                        <Link to="/privacy-policy" className="text-muted text-hover-primary px-3 text-decoration-none small">Privacy</Link>
                        <Link to="/contact" className="text-muted text-hover-primary px-3 text-decoration-none small">Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AuthLayout };
