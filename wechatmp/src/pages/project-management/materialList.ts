import wepy from "wepy";
import { API, TVerifyStatus } from "../../api.service";

export type DesignContents = {
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
export default class materialList extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "材料-列表",
    }
    data = {
        pid: -1,
        materialList: []
    }
    pid: number;
    materialList: DesignContents;
    onLoad() {
        this.initData();
    }
    initData() {
        this.pid = parseFloat(getCurrentPages()[0].options.Pid);
        this.api.EndPoint.Project.Design.GetDesignContent(this.pid).then(
            iSuccess => {
                this.materialList = iSuccess.Result.DesignContents;
                console.log(' this.materialList', this.materialList);
                this.$apply(() => { });
            }
        ).catch()
    }
    onDetail(e) {
        let pid: number = e.currentTarget.dataset.item.Pid;
        let recordID: number = e.currentTarget.dataset.item.RecordID;
        this.$route('navigateTo', '/pages/project-management/detail', { Pid: pid, RecordID: recordID });
        // this.$redirect('/pages/project-management/project-detail/projectDetail', { Pid: pid, RecordID: recordID });
    }
}