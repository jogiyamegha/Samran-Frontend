import React, {useEffect, useState} from "react";
import {Button, Card, Col, FormLabel, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {KTSVG} from "../../../_admin/helpers";
import Loader from "../../../global/loader";
import {PAGE_LIMIT} from "../../../utils/constants";
import Pagination from "../../../global/pagination";
import ThreeDots from "../../../_admin/assets/media/svg/threeDots.svg";
import {CustomSelectTable} from "../../custom/select/CustomSelectTable";
import APICallService from "../../../api/apiCallService";
import {PPA, USER} from "../../../api/apiEndPoints";
import {PPAAPIJSON} from "../../../api/apiJSON/ppa";
import {useDebounce} from "../../../utils/useDebounce";
import {IListPpa} from "../../../types";
import AddIcon from "../../../_admin/assets/media/svg/add.svg";
import { USERAPIJSON } from "../../../api/apiJSON/user";
import { CustomSelectWhite } from "../../custom/select/CustomSelectWhite";
 
const Ppa = () => {

}

export default Ppa;