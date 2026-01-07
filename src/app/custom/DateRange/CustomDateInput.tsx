import CalendarIcon from "../../../_admin/assets/media/svg/Calendar(field).svg";
const CustomDateInput = ({value, onClick, placeholder, inputClass, size}: any) => {
    return (
        <button
             className={`form-control ${
                size ? `h-${size}px` : "h-60px"
            } d-flex justify-content-between align-items-center ${value ? "text-black fw-bold" : ""} ${
                inputClass ? inputClass : "bg-f9f9f9 h-40px ms-1 min-w-lg-200px fs-12"
            }  `}
            onClick={onClick}
        >
            {value || placeholder}
            <img className="ms-4" src={CalendarIcon} height={40} width={20} />
        </button>
    )
}

export default CustomDateInput;