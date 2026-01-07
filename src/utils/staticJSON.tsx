import AdminLogo from "../_admin/assets/media/svg/dunreidy-logo.svg";
import DefaultImage from "../_admin/assets/media/default-user.png";

export const userTypeOptions = [
    {value: 1, label: 'Admin'},
    {value: 2, label: 'Supervisor'},
    {value: 3, label: 'Employee'},
    {value: 4, label: 'Subcontractor'},
];

export const IMAGES = {
    AdminLogo,
    DefaultImage
}

interface Option {
    value: number;
    label: string;
}

export const weekdayOptions: Option[] = [
    {value: 1, label: "Monday"},
    {value: 2, label: "Tuesday"},
    {value: 3, label: "Wednesday"},
    {value: 4, label: "Thursday"},
    {value: 5, label: "Friday"},
    {value: 6, label: "Saturday"},
    {value: 7, label: "Sunday"},
]