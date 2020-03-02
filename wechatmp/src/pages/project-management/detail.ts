import wepy from "wepy";
import { API, TTimestamp, TVerifyStatus } from "../../api.service";
import { IFailure } from "../../api/api";

export type ProductionContents = {
    Id: number;
    Pid: number;
    RecordID: number;
    ProductName: string;
    CraftAuditorUid: number;
    CraftAuditorName: string;
    ProcessingUnitCode: string;
    ProcessingUnitName: string
    ProcessingUnitManagerUid: number;
    ProcessingUnitMangerName: string;
    ProductionPerformance: string;
    ProductionCycle: string;
    Delivery1Date: TTimestamp;
    Delivery1Quantity: number;
    Delivery1VerifierUid: number;
    Delivery1VerifierName: string;
    Delivery1VerifyDate: number;
    Delivery2Date: TTimestamp;
    Delivery2Quantity: number;
    Delivery2VerifierUid: number;
    Delivery2VerifierName: string;
    Delivery2VerifyDate: number;
    Delivery3Date: TTimestamp;
    Delivery3Quantity: number;
    Delivery3VerifierUid: number;
    Delivery3VerifierName: string;
    Delivery3VerifyDate: number;
    Delivery4Date: TTimestamp;
    Delivery4Quantity: number;
    Delivery4VerifierUid: number;
    Delivery4VerifierName: string;
    Delivery4VerifyDate: number;
    Delivery5Date: TTimestamp;
    Delivery5Quantity: number;
    Delivery5VerifierUid: number;
    Delivery5VerifierName: string;
    Delivery5VerifyDate: number;
    UnDeliveryQuantity: number;
    Comment: string;
    CertificateID: number;
    CreatorUid: number;
    CreatorName: string;
    CreatorPhone: string;
    LastModified: number;
};
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
};

export default class detail extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "项目详情",
    }
    // var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

    data = {
        tabs: ["设计", "生产", "收发货", "结算"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        sliderWidth: 96,
        list: '',
        designList: [],
        productionList: [],
        pid: -1,
        recordID: -1
    }
    sliderLeft: number;
    tabs: Array<string>;
    sliderWidth: number;
    sliderOffset: number;
    activeIndex: number;

    productionList: ProductionContents;
    designList: DesignContents;
    pid: number;
    recordID: number;

    onLoad() {
        this.initData();
    }
    // onShow() {
    //     this.initData();
    // }
    initData() {
        console.log('Material getCurrentPages', getCurrentPages());
        this.pid = parseInt(getCurrentPages()[getCurrentPages().length - 1].options.Pid);
        this.recordID = parseInt(getCurrentPages()[getCurrentPages().length - 1].options.RecordID);

        this.api.EndPoint.Project.Production.GetProductionContent(this.pid).then(
            iSuccess => {
                console.log('this.recordID', this.recordID);
                this.productionList = iSuccess.Result.ProductionContents.filter(x => x.RecordID === this.recordID)[0];
                console.log('this.list', this.productionList);
            }
        ).catch()
        this.api.EndPoint.Project.Design.GetDesignContent(this.pid).then(
            iSuccess => {
                this.designList = iSuccess.Result.DesignContents.filter(x => x.RecordID === this.recordID)[0];
            }
        ).catch()

        wepy.getSystemInfo().then(res => {
            this.sliderLeft = (res.windowWidth / this.tabs.length - this.sliderWidth) / 2
        }).catch(iFailure => {

        })
        console.log('this.data', this.data);
    }
    tabClick(e) {
        this.sliderOffset = e.currentTarget.offsetLeft,
            this.activeIndex = e.currentTarget.id
    }

    preview(e) {
        // let Id = e.currentTarget.dataset.item.Id;
        // this.api.EndPoint.Project.Production.DownloadCertificate(this.pid, Id).then(
        //     res => {
        //         let fileBlob = res.Blob;
        //         wx.openDocument({
        //             filePath: '',
        //             success: function () {

        //             }
        //         })
        //     }
        // ).catch((iFailure: IFailure) => {
        //     console.log(`文件下载失败：原因${iFailure.Reason}`);
        // }
        // )
    }

}