import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./dateRange.css";

const CustomDatePicker = (props: any) => {
    return (
        <>
            <DatePicker 
                className={props.className || "form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px"}
                //@ts-ignore
                style={props.style}
                selected={props.selected}
                onChange={props.onChange}
                startDate={props.startDate}
                endDate={props.endDate}
                dateFormat={props.dateFormat}
                selectsRange={props.selectsRange}
                showFullMonthYearPicker={props.showFullMonthYearPicker}
                maxDate={props.maxDate ? props.maxDate : new Date()}
                minDate={props.minDate ? props.minDate : "2023-01-01"}
                isClearable={props.isClearable}
                disabled={props.disabled}
                showMonthYearPicker={props.showMonthYearPicker}
                showWeekNumbers={props.showWeekNumbers}
                showWeekPicker={props.showWeekPicker}
                showYearPicker={props.showYearPicker}
                placeholderText={props.placeholder}
                customInput={props.customInput}
                showYearDropdown={true}
                dropdownMode="select"
                showTimeSelect={props.showTimeSelect}
                showTimeSelectOnly={props.showTimeSelectOnly}
                timeIntervals={props.timeIntervals}
                timeCaption={props.timeCaption}
            />
        </>
    )
}
export default CustomDatePicker;