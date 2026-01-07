import moment from 'moment';
import {BottleStatus, NotificationType, ReceiverType, ToolStatus} from './constants';

const Method = {
    convertDateToFormat : (date: string, format: string) => {
        return moment(date).local().format(format)
    },
    convertDateToDDMMYYYY: (date: string) => {
        return moment(date).local().format('DD/MM/YYYY ');
    },
    convertDateToDDMMYYYYHHMM: (date: string) => {
        return moment(date).local().format('DD/MM/YYYY hh:mm ');
    },
    convertDateToDDMMYYYYHHMMAMPM: (date: string) => {
        return moment(date).local().format('DD/MM/YYYY hh:mm A');
    },
    convertDateToDDMMYYYYHOURS: (date: string) => {
        return moment(date).local().format("DD/MM/YYYY [,] HH:mm ");
    },
    checkisSameOrAfter: (date1: string, date2: string) => {
        return moment(date2).isSameOrAfter(date1);
    },
    dayDifference: (date1: string, date2: string) => {
        return moment(date2).diff(date1, 'days');
    },
    getUserTypeLabel: (userType: number) => {
        switch (userType) {
            case 1: 
                return 'Admin';
            case 2:
                return "Supervisor";
            case 3:
                return "Employee";
            case 4:
                return "Sub Contractor";
            default:
                return "Unknown";
        }
    },
    getToolStatusLabel: (status: number) => {
        switch (status) {
            case ToolStatus.Available:
                return "Available";
            case ToolStatus.OnSite:
                return "On Site";
            case ToolStatus.Returned:
                return "Returned";
            case ToolStatus.Generated:
                return "Generated";
            default:
                return "Unknown";
        }
    },
    getToolStatusBadgeColor: (status: number) => {
        switch (status) {
            case ToolStatus.Available:
                return {backgroundColor: "#d4edda", color: "#155724"}; // Light green
            case ToolStatus.OnSite:
                return {backgroundColor: "#d1ecf1", color: "#0c5460"}; // Light blue
            case ToolStatus.Returned:
                return {backgroundColor: "#fff3cd", color: "#856404"}; // Light yellow/orange
            case ToolStatus.Generated:
                return {backgroundColor: "#e2d9f3", color: "#6f42c1"}; // Light purple
            default:
                return {backgroundColor: "#f8f9fa", color: "#6c757d"}; // Light gray
        }
    },
    getBottleStatusLabel: (status: number) => {
        switch (status) {
            case BottleStatus.Available:
                return "Available";
            case BottleStatus.OnSite:
                return "On Site";
            case BottleStatus.Returned:
                return "Returned";
            case BottleStatus.Generated:
                return "Generated";
            default:
                return "Unknown";
        }
    },
    getBottleStatusBadgeColor: (status: number) => {
        switch (status) {
            case BottleStatus.Available:
                return {backgroundColor: "#d4edda", color: "#155724"}; // Light green
            case BottleStatus.OnSite:
                return {backgroundColor: "#d1ecf1", color: "#0c5460"}; // Light blue
            case BottleStatus.Returned:
                return {backgroundColor: "#fff3cd", color: "#856404"}; // Light yellow/orange
            case BottleStatus.Generated:
                return {backgroundColor: "#e2d9f3", color: "#6f42c1"}; // Light purple
            default:
                return {backgroundColor: "#f8f9fa", color: "#6c757d"}; // Light gray
        }
    },
    getReceiverTypeLabel: (receiverType: number) => {
        switch (receiverType) {
            case ReceiverType.Employee:
                return "Employee";
            case ReceiverType.SuperVisor:
                return "Supervisor";
            case ReceiverType.Subcontractor:
                return "Subcontractor";
            case ReceiverType.Everyone:
                return "Everyone";
            default:
                return "Unknown";
        }
    },
    getNotificationTypeLabel: (notificationType: number) => {
        switch (notificationType) {
            case NotificationType.System:
                return "Custom";
            case NotificationType.Custom:
                return "System";
            case NotificationType.ApplyLeave:
                return "ApplyLeave";
            case NotificationType.ActionLeave:
                return "ActionLeave";
            case NotificationType.ActionTimesheet:
                return "ActionTimesheet";
            case NotificationType.ActionRequisition:
                return "ActionRequisition";
            case NotificationType.ActionJob:
                return "ActionJob";
            case NotificationType.Reminder:
                return "Reminder";
            case NotificationType.AttendanceAlert:
                return "AttendanceAlert";
            case NotificationType.TimesheerAlert:
                return "TimesheerAlert";
            case NotificationType.UnsubmittedTimesheetAlert:
                return "UnsubmittedTimesheetAlert";
            case NotificationType.TimesheetSubmissionReminder:
                return "TimesheetSubmissionReminder";
            default:
                return "Unknown";
        }
    },
}

export default Method;