import { ApiService } from './api';
import { TProjectStatus, TProductionPerformanceStatus, TReceivingDeliveryStatus } from './constants';

import { ApiProject } from './endpoint/project';

interface IEndPointGetProjectsReturn {
    Result: {
        Projects: {
            Pid: number;
            PName: string;
            CreatorName: string;
            CreatorPhone: string;
            ProjectAccountName: string;
            ProjectAccountPhone: string;
            ProjectAccountUid: number;
            ClientCode: string;
            ClientName: string;
            Description: string;
            Comment: string;
            Status: TProjectStatus;
            LastModified: number;
        }[];
    };
    Addition: {};
}

interface IEndPointGetProjectHistoryReturn {
    Result: {
        Projects: {
            Pid: number;
            PName: string;
            CreatorName: string;
            CreatorPhone: string;
            ProjectAccountUid: number;
            ProjectAccountName: string;
            ProjectAccountPhone: string;
            ClientCode: string;
            ClientName: string;
            Description: string;
            Comment: string;
            Status: TProjectStatus;
            LastModified: number;
        }[];
    };
    Addition: {};
}

export type IEndPointScanProductionPerformanceRequest = {
    Barcode: string;
    Operation: TProductionPerformanceStatus;
}[];



interface IEndPointScanProductionPerformanceReturn {
    Result: {
        InvalidBarcodeOperations: {
            Barcode: string;
            Operation: TProductionPerformanceStatus;
            Reason: string;
        }[];
    };
    Addition: {};
}

interface IEndPointScanBarcodeInfoReturn {
    Result: {
        Barcodes: string[];
        Barcode: string;
        Pid: number;
        PName: string;
        RecordID: number;
        ProductionPerformanceStatus: TProductionPerformanceStatus;
        ReceivingDeliveryStatus: TReceivingDeliveryStatus
        Reason: string;
    };
    Addition: {};
}

interface IEndPointGetUnDeliveryAmountReturn {
    Result: {
        Pid: number;
        RecordID: number;
        UnDeliveryAmount: number;
    };
    Addition: {};
}

export class ApiEndPoint {
    constructor(private api: ApiService, public Project: ApiProject) { }

    GetProjects(): Promise<IEndPointGetProjectsReturn> {
        return this.api.JSON('/endpoint/getprojects', {});
    }

    GetProjectHistory(Pid: number): Promise<IEndPointGetProjectHistoryReturn> {
        return this.api.JSON('/endpoint/getprojecthistory', { Pid });
    }

    // 生产动态扫码
    ScanProductionPerformance(BarcodeOperations: IEndPointScanProductionPerformanceRequest): Promise<IEndPointScanProductionPerformanceReturn> {
        return this.api.JSON('/endpoint/scanproductionperformance', { BarcodeOperations });
    }

    // 扫码时返回信息
    ScanBarcodeInfo(Barcode: string): Promise<IEndPointScanBarcodeInfoReturn> {
        return this.api.JSON('/endpoint/scanbarcodeinfo', { Barcode });
    }

    // 扫码返回剩余发货数量
    GetUnDeliveryAmount(Barcode: string): Promise<IEndPointGetUnDeliveryAmountReturn> {
        return this.api.JSON('/endpoint/getundeliveryamount', { Barcode });
    }

}

