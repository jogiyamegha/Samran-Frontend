import {useEffect} from "react";
import {Outlet, Link} from "react-router-dom";
import AuthPhoto from "../../../_admin/assets/media/The-Dunreidy-Story.png";
import {Card, Col, Row} from "react-bootstrap";
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
        <div
            className="gradient-background-side1 "
            style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            <div
                className="vh-lg-100"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="d-flex flex-column p-5">
                    <div className="d-flex flex-column flex-lg-row-fluid">
                        <div className="d-flex flex-center flex-column flex-column-fluid">
                            <Card className="w-md-600px w-lg-650px w-xl-750px shadow-lg">
                                <Card.Body className="p-lg-4 p-md-6">
                                    <Row className="gy-10 gx-6">
                                        <Col lg={6} className="order-lg-last d-flex">
                                            <img
                                                className="w-100 h-100 object-fit-cover rounded"
                                                src={AuthPhoto}
                                                alt=""
                                            />
                                        </Col>
                                        <Col lg={6} className=" align-self-center">
                                            <div className="p-sm-10 p-lg-5">
                                                <Outlet />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                {/* <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 ">
          <div className="d-flex flex-center flex-column flex-lg-row-fluid">
            <div className="w-lg-500px p-10">
              <Outlet />
            </div>
          </div>
          <div className="d-flex flex-center flex-wrap px-5"></div>
        </div>
        <div className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2">
          <div className="d-flex flex-column flex-center">
            <img
              className="img-fluid rounded w-100 h-100"
              src={AuthPhoto}
              alt=""
            />
          </div>
          <div className="bg-light"></div>
        </div>
      </div> */}
            </div>
        </div>
    );
};
export {AuthLayout};
