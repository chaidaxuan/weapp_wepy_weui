
import { ApiService, ISuccessE, IBlob } from '../../api';
import { TProjectRole, TVerifyStatus, TTimestamp } from '../../constants';

type IEndPointUploadDesignMaterialListReturn = ISuccessE;

interface IEndPointGetDesignContentReturn {
    Result: {
        DesignContents: {
            Id: number;
            Pid: number;
            RecordID: number;
            Category: string;
            ClientName: string;
            EngineeringName: string;
            ProjectName: string;
            AttributionPosition: string;
            ProductName: string;
            DesignNumber: string;
            OrderNumber: string;
            Length: string;
            Width: string;
            Height: string;
            Unit: string;
            Amount: number;
            SingleArea: string;
            ChargeUnit: string;
            ChargeArea: string;
            MaterialSize: string;
            ProcessDrawingNumber: string;
            Material: string;
            Color: string;
            MaterialThickness: string;
            DrawingNumber: string;
            Drawer: string;
            Adjuster1: string;
            Adjuster2: string;
            Auditor: string;
            Comment: string;
            Identifier: string;
            DrawingID: number;
            Drawing_DesignDepartmentVerifierUid: number;
            Drawing_DesignDepartmentVerifyStatus: TVerifyStatus;
            Drawing_DesignDepartmentVerifierName: string;
            Drawing_DesignDepartmentVerifyDate: number;
            Drawing_EngineeringDepartmentVerifierUid: number;
            Drawing_EngineeringDepartmentVerifyStatus: TVerifyStatus;
            Drawing_EngineeringDepartmentVerifierName: string;
            Drawing_EngineeringDepartmentVerifyDate: number;
            Drawing_MaterialDepartmentVerifierUid: number;
            Drawing_MaterialDepartmentVerifyStatus: TVerifyStatus;
            Drawing_MaterialDepartmentVerifierName: string;
            Drawing_MaterialDepartmentVerifyDate: number;
            Drawing_DesigningInstituteVerifierUid: number;
            Drawing_DesigningInstituteVerifyStatus: TVerifyStatus;
            Drawing_DesigningInstituteVerifierName: string;
            Drawing_DesigningInstituteVerifyDate: number;
            PlanID: number;
            Plan_DesigningInstituteVerifierUid: number;
            Plan_DesigningInstituteVerifyStatus: TVerifyStatus
            Plan_DesigningInstituteVerifierName: string;
            Plan_DesigningInstituteVerifyDate: number;
            Plan_PartyAVerifierUid: number;
            Plan_PartyAVerifyStatus: TVerifyStatus;
            Plan_PartyAVerifierName: string;
            Plan_PartyAVerifyDate: number;
            OrderDate: number;
            DeliveryDate: number;
            CreatorUid: number;
            CreatorName: string;
            CreatorPhone: string;
            LastModified: number;
        }[];
    };
    Addition: {};
}

type IEndPointUploadDesignDrawingReturn = ISuccessE;

type IEndPointWithdrawDesignDrawingReturn = ISuccessE;

type IEndPointVerifyDesignDrawingReturn = ISuccessE;

type IEndPointUploadDesignPlanReturn = ISuccessE;

type IEndPointWithdrawDesignPlanReturn = ISuccessE;

type IEndPointVerifyDesignPlanReturn = ISuccessE;

type IEndPointSetDesignOrderDateReturn = ISuccessE;

type IEndPointSetDesignDeliveryDateReturn = ISuccessE;

type IEndPointModifyDesignContent = ISuccessE;

type IEndPointDeleteDesignContentReturn = ISuccessE;

interface IEndPointGetDesignContentHistoryReturn {
    Result: {
        DesignContents: {
            Id: number;
            Pid: number;
            RecordID: number;
            P_Label: string;
            P_AttributionPosition: string;
            P_Drawer: string;
            P_Adjuster: string;
            P_Auditor: string;
            P_OrderNumber: string;
            P_DesignNumber: string;
            P_ProductName: string;
            P_Length: string;
            P_Width: string;
            P_Amount: string;
            P_Unit: string;
            P_SingleAmount: string;
            P_TotalAmount: string;
            P_UnitOfAccount: string;
            P_MaterialThickness: string;
            P_Colour: string;
            P_DrawingNumber: string;
            P_Comment: string;
            P_DrawingID: number;
            P_Drawing_DesignDepartmentVerifierUid: number;
            P_Drawing_DesignDepartmentVerifyStatus: TVerifyStatus;
            P_Drawing_DesignDepartmentVerifierName: string;
            P_Drawing_DesignDepartmentVerifyDate: number;
            P_Drawing_EngineeringDepartmentVerifierUid: number;
            P_Drawing_EngineeringDepartmentVerifyStatus: TVerifyStatus;
            P_Drawing_EngineeringDepartmentVerifierName: string;
            P_Drawing_EngineeringDepartmentVerifyDate: number;
            P_Drawing_MaterialDepartmentVerifierUid: number;
            P_Drawing_MaterialDepartmentVerifyStatus: TVerifyStatus;
            P_Drawing_MaterialDepartmentVerifierName: string;
            P_Drawing_MaterialDepartmentVerifyDate: number;
            P_Drawing_DesigningInstituteVerifierUid: number;
            P_Drawing_DesigningInstituteVerifyStatus: TVerifyStatus;
            P_Drawing_DesigningInstituteVerifierName: string;
            P_Drawing_DesigningInstituteVerifyDate: number;
            P_PlanID: number;
            P_Plan_DesigningInstituteVerifierUid: number;
            P_Plan_DesigningInstituteVerifyStatus: TVerifyStatus;
            P_Plan_DesigningInstituteVerifierName: string;
            P_Plan_DesigningInstituteVerifyDate: number;
            P_Plan_PartyAVerifierUid: number;
            P_Plan_PartyAVerifyStatus: TVerifyStatus;
            P_Plan_PartyAVerifierName: string;
            P_Plan_PartyAVerifyDate: number;
            P_OrderDate: number;
            P_DeliveryDate: number;
            CreatorUid: number;
            CreatorName: string;
            CreatorPhone: string;
            LastModified: number;
        }[];
    };
    Addition: {};
}

export class ApiDesign {
    constructor(private api: ApiService) { }

    UploadDesignMaterialList(Pid: number, FileID: number): Promise<IEndPointUploadDesignMaterialListReturn> {
        return this.api.JSON('/endpoint/project/design/uploaddesignmateriallist', { Pid, FileID });
    }

    GetDesignContent(Pid: number): Promise<IEndPointGetDesignContentReturn> {
        return this.api.JSON('/endpoint/project/design/getdesigncontent', { Pid });
    }

    UploadDesignDrawing(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadDesignDrawingReturn> {
        return this.api.JSON('/endpoint/project/design/uploaddesigndrawing', { Pid, RecordID, FileID });
    }

    WithdrawDesignDrawing(Pid: number, RecordID: number): Promise<IEndPointWithdrawDesignDrawingReturn> {
        return this.api.JSON('/endpoint/project/design/withdrawdesigndrawing', { Pid, RecordID });
    }

    DownloadDesignDrawing(Pid: number, Id: number): Promise<IBlob> {
        return this.api.BLOB('/endpoint/project/design/downloaddesigndrawing', { Pid, Id });
    }

    VerifyDesignDrawing(Pid: number, RecordID: number, VerifyStatus: TVerifyStatus, VerifyRole: TProjectRole):
        Promise<IEndPointVerifyDesignDrawingReturn> {
        return this.api.JSON('/endpoint/project/design/verifydesigndrawing', { Pid, RecordID, VerifyStatus, VerifyRole });
    }

    UploadDesignPlan(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadDesignPlanReturn> {
        return this.api.JSON('/endpoint/project/design/uploaddesignplan', { Pid, RecordID, FileID });
    }

    WithdrawDesignPlan(Pid: number, RecordID: number): Promise<IEndPointWithdrawDesignPlanReturn> {
        return this.api.JSON('/endpoint/project/design/withdrawdesignplan', { Pid, RecordID });
    }

    DownloadDesignPlan(Pid: number, Id: number): Promise<IBlob> {
        return this.api.BLOB('/endpoint/project/design/downloaddesignplan', { Pid, Id });
    }

    VerifyDesignPlan(Pid: number, RecordID: number, VerifyStatus: TVerifyStatus, VerifyRole: TProjectRole):
        Promise<IEndPointVerifyDesignPlanReturn> {
        return this.api.JSON('/endpoint/project/design/verifydesignplan', { Pid, RecordID, VerifyStatus, VerifyRole });
    }

    SetDesignOrderDate(Pid: number, RecordID: number, OrderDate: TTimestamp): Promise<IEndPointSetDesignOrderDateReturn> {
        return this.api.JSON('/endpoint/project/design/setdesignorderdate', { Pid, RecordID, OrderDate });
    }

    SetDesignDeliveryDate(Pid: number, RecordID: number, DeliveryDate: TTimestamp): Promise<IEndPointSetDesignDeliveryDateReturn> {
        return this.api.JSON('/endpoint/project/design/setdesigndeliverydate', { Pid, RecordID, DeliveryDate });
    }

    ModifyDesignContent(
        Pid: number, RecordID: number, Label: string, AttributionPosition: string, Drawer: string,
        Adjuster: string, Auditor: string, OrderNumber: string, DesignNumber: string,
        ProductName: string, Length: string, Width: string, Amount: string, Unit: string,
        SingleAmount: string, TotalAmount: string, UnitOfAccount: string, MaterialThickness: string,
        Colour: string, DrawingNumber: string, Comment: string): Promise<IEndPointModifyDesignContent> {
        return this.api.JSON('/endpoint/project/design/modifydesigncontent', {
            Pid, RecordID, Label, AttributionPosition, Drawer, Adjuster, Auditor, OrderNumber,
            DesignNumber, ProductName, Length, Width, Amount, Unit, SingleAmount, TotalAmount,
            UnitOfAccount, MaterialThickness, Colour, DrawingNumber, Comment
        });
    }

    GetDesignContentHistory(Pid: number, RecordID: number): Promise<IEndPointGetDesignContentHistoryReturn> {
        return this.api.JSON('/endpoint/project/design/getdesigncontenthistory', { Pid, RecordID });
    }
    DeleteDesignContent(Pid: number, RecordID: number): Promise<IEndPointDeleteDesignContentReturn> {
        return this.api.JSON('/endpoint/project/design/deletedesigncontent', { Pid, RecordID });
    }
}
