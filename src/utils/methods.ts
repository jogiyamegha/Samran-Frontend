import moment from 'moment';
import { PropertyTypes, UserTypes, PlantStatus } from './constants';

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
            case UserTypes.Admin: 
                return 'Admin';
            case UserTypes.Consumer:
                return "Consumer";
            case UserTypes.Investor:
                return "Investor";
            
            default:
                return "Unknown";
        }
    },
    getPlantStatusLabel: (plantStatus: number) => {
        switch (plantStatus) {
            case PlantStatus.Submitted: 
                return 'Submitted';
            case PlantStatus.Approved:
                return "Approved";
            case PlantStatus.Rejected:
                return "Rejected";
            
            default:
                return "Unknown";
        }
    },
    plantStatusBadgeColor: (status: number) => {
        switch (status) {
            case PlantStatus.Submitted:
                return {backgroundColor: "#b5caec", color: "#0c4360"}; 
            case PlantStatus.Approved:
                return {backgroundColor: "#d4edda", color: "#155724"}; 
            case PlantStatus.Rejected:
                return {backgroundColor: "rgb(232, 172, 161)", color: "#7d2702ff"}; // Light yellow/orange
            
            default:
                return {backgroundColor: "#f8f9fa", color: "#6c757d"}; // Light gray
        }
    },
  
    getPropertyTypeLabel: (propertyType: number) => {
        switch (propertyType) {
            case PropertyTypes.HousingSociety:
                return "Housing Society";
            case PropertyTypes.ManufacturingUnit :
                return "Manufacturing Unit";
            default:
                return "Unknown";
        }
    },
}

export default Method;