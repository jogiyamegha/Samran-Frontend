import { useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays } from 'date-fns';

const CustomChartDatePicker = ({
    view, 
    onViewChange
} : {
    view: string;
    onViewChange: (view: string) => void;
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [endDate, setEndDate] = useState(
        endOfWeek(new Date(), { weekStartsOn: 0 })
    );

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isCustomDate, setIsCustomDate] = useState(false);

    const handlePrev = () => {
        if (view === 'week') {
            setCurrentDate(subWeeks(currentDate, 1));
            setEndDate(subWeeks(endDate, 1));
            setIsCustomDate(false);
        } else {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() - 1);
            setCurrentDate(newDate);
        }
    };
    const handleNext = () => {
        if (view === 'week') {
            setCurrentDate(addWeeks(currentDate, 1));
            setEndDate(addWeeks(endDate, 1));
            setIsCustomDate(false);
        } else {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() + 1);
            setCurrentDate(newDate);
        }
    };

    const getDateRange = () => {
        if (view === 'week') {
            const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 0 });
            const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 0 });
            return `${format(startOfWeekDate, 'MMM dd')} - ${format(
                endOfWeekDate,
                'MMM dd'
            )}`;
        } else {
            const startOfMonthDate = startOfMonth(currentDate);
            const endOfMonthDate = endOfMonth(currentDate);
            return `${format(startOfMonthDate, 'MMM dd')} - ${format(
                endOfMonthDate,
                'MMM dd'
            )}`;
        }
    };

    const handleDateChange = (date: Date) => {
        setCurrentDate(date);
        setEndDate(addDays(date, 7));
        setShowDatePicker(false);
        setIsCustomDate(true);
    };

    return (
        <div className="d-flex align-items-center position-relative">
            <button  
                onClick={handlePrev}
                className="btn btn-link p-0"
            >
                <i
                    className="bi bi-chevron-left"
                    style={{ color: 'black' }}
                ></i>
            </button>
            <span
                onClick={() => setShowDatePicker(true)}
                style={{ cursor: 'pointer' }}
            >
                {isCustomDate
                ? `${format(currentDate, 'MMM dd')} - ${format(endDate, 'MMM dd')}`
                : getDateRange()}
            </span>
            <button
                onClick={handleNext}
                className="btn btn-link p-0 ms-2"
            >
                <i
                    className="bi bi-chevron-right"
                    style={{ color: 'black' }}
                ></i>
            </button>

            <div
                className="position-absolute"
                style={{ zIndex: '1', top: '24px', left: '-30px' }}
            >
                {showDatePicker && (
                    <DatePicker
                        selected={currentDate}
                        onChange={handleDateChange}
                        maxDate={new Date()}
                        inline
                    />
                )}
            </div>
        </div>
    )
}
export default CustomChartDatePicker;