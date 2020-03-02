import wepy from "wepy";
import { API, TTimestamp } from "../../../api.service";
import { IFailure } from "../../../api/api";

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
export default class projectDetail extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "项目详情",
    }

    onShow() {
        this.initData();

    }
    // var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置


    data = {
        tabs: ["设计", "生产", "收发货", "结算"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        sliderWidth: 96,
        list: '',
        pid: -1
    }
    sliderLeft: number;
    tabs: Array<string>;
    sliderWidth: number;
    sliderOffset: number;
    activeIndex: number;
    list: ProductionContents;
    pid: number;

    onLoad() {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                // that.setData({
                //     sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                //     sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                // });
            }
        });
        this.pid = parseFloat(getCurrentPages()[0].options.Pid);
        this.api.EndPoint.Project.Production.GetProductionContent(this.pid).then(
            iSuccess => {
                this.list = iSuccess.Result.ProductionContents[0];
            }
        ).catch()

        wepy.getSystemInfo().then(res => {
            this.sliderLeft = (res.windowWidth / that.tabs.length - this.sliderWidth) / 2
        }).catch(iFailure => {

        })
        console.log('this.data', this.data);
    }
    tabClick(e) {
        this.sliderOffset = e.currentTarget.offsetLeft,
            this.activeIndex = e.currentTarget.id
    }

    preview(e) {
        let Id = e.currentTarget.dataset.item.Id;
        this.api.EndPoint.Project.Production.DownloadCertificate(this.pid, Id).then(
            res => {
                let fileBlob = res.Blob;
                wx.openDocument({
                    filePath: '',
                    success: function () {

                    }
                })
            }
        ).catch((iFailure: IFailure) => {
            console.log(`文件下载失败：原因${iFailure.Reason}`);
        }
        )
    }

    initData() {
        let currentPages = getCurrentPages();
        // this.api.EndPoint.Project.Production.GetProductionContent(41).then(

        // ).catch();
    }
}