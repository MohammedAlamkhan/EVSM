import { Pagination } from '../Models/Pagination';


class Clients {
    clientAddress: string
        ; clientId: number
        ; clientName: string
        ; contactPersonEmailid: string
        ; contactPersonName: string
        ; contactPersonNo: string
}


export class SalesOrder {
    clients: Clients
        ; invoiceDate: string
        ; invoiceNo: string
        ; orderCreateDate: string
        ; orderStatus: string
        ; poDate: string
        ; poNo: string
        ; salesOrderId: number
        ; salesOrderNo: string
        ; totalBilledAssest: number
        ; totalQuantity: number
}


export class SalesRoot extends Pagination {
    salesOrder: SalesOrder[]
}



    export interface SalesOrder {
        salesOrderId: number;
        clients: Clients;
        salesOrderNo: string;
        poNo: string;
        poDate: string;
        totalQuantity: number;
        totalBilledAssest: number;
        invoiceNo: string;
        invoiceDate: string;
        orderCreateDate: string;
        customerCode?: any;
        customerName?: any;
        customerPersonName?: any;
        customerPersonMobileNo?: any;
        customerPersonEmailId?: any;
        orderStatus: string;
    }


    export interface Sites {
        siteId: number;
        siteName: string;
        sapSiteId: string;
        customerName: string;
        contactPersonName: string;
        emailId: string;
        contactNumner: string;
        alternateContactNumner: string;
        address: string;
        cityName: string;
        stateName: string;
        countryName: string;
        pinCode: string;
        latitude: string;
        longitude: string;
    }

    export interface Assest {
        assestId: number;
        salesOrder: SalesOrder;
        clients: Clients;
        sites: Sites;
        irf_status: string;
        installation_status: string;
        survey_status: string;
        commission_status: string;
        TypeOfCharger: string;
        ratingOfCharger: string;
        quantity: number;
        icPoStatus: string;
        icPoNo: string;
        icPrice: string;
        assetSerialNumber: string;
        partCode: string;
        account: string;
        assestDescription: string;
        primaryAccountNo: string;
        plant_code: string;
        plant: string;
        assetWarranty: string;
        assetStatus: string;
        remarks: string;
        poNo: string;
        poDate: Date;
        sapDeliveryDocumentNo: string;
        sapMaterialDocumentNo: string;
        deliveryDate: Date;
        installDate: Date;
        warrantyFromDODMonth: number;
        warrantyFromInstallationDateMonths: number;
        dodExpirationDate: Date;
        installExpiryDate: Date;
        warrantyExpiryDate: Date;
        warrantyStatus: string;
        amcPoNo: string;
        amcPoDate: Date;
        amcStartDate: Date;
        amcExpiryDate: Date;
        amcPeriodMonths: number;
        amcStatus: string;
        createdBy: number;
        created_date: string;
        modifyedBy: number;
        modifyed_date: string;
        typeOfCharger: string;
    }

    export interface SalesObject {
        totalRow: number;
        totalRecords: number;
        assests: Assest[];
        currentPage: number;
    }



