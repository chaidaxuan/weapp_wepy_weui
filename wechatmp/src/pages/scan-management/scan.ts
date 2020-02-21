import wepy from "wepy";
import { API, TProductionPerformanceStatus, TReceivingDeliveryStatus } from "../../api.service";
import { IEndPointScanProductionPerformanceRequest } from "../../api/endpoint";

export type listData = {
    Barcodes: string[];
    Barcode: string;
    Pid: number;
    PName: string;
    RecordID: number;
    ProductionPerformanceStatus: TProductionPerformanceStatus;
    ReceivingDeliveryStatus: TReceivingDeliveryStatus
    Reason: string;
}[];

export default class scan extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "扫码页面",
    }
    data = {
        scanFunctionIsUseable: true,
        isShowInput: false,
        hiddenModalInput: true,
        inputVal: 10,
        scanSpeed: this.data.inputVal,
        listData: [
            {
                "Barcode": "0", "Pid": "3", "PName": "type1", "RecordID": '8',
                'ProductionPerformanceStatus': 3, 'ReceivingDeliveryStatus': 0,
                'Reason': "", 'quantity': 0
            },
        ],
        BarcodeOperations: [
            {
                "Barcode": "3-7-0",
                "Operation": 3
            },
            {
                "Barcode": "3-7-101",
                "Operation": 3
            }
        ]
    }
    scanFunctionIsUseable: boolean;
    scanInterval = null;
    BarcodeOperations: IEndPointScanProductionPerformanceRequest;
    listData: listData;

    onShow() {
        this.scanControl();

    }
    scanControl() {
        this.scanInterval = setInterval(() => {
            this.scanFunctionIsUseable = true;
            console.log('1');
        }, 3000);
    }
    onHide() {
    }
    onUnload() {
        clearInterval(this.scanInterval);
        this.scanInterval = null;
    }
    backTo() {
        this.api.EndPoint.ScanProductionPerformance(this.BarcodeOperations).then(
            iSuccess => {
                wepy.showToast({ title: '请求成功' })
            }
        ).catch(
            iFailure => {
                wepy.showModal({ title: '请求失败成功', content: '错误条码信息' });
            }
        )
    }

    methods = {
        takeCode(e) {
            if (this.scanFunctionIsUseable) {
                this.scanFunctionIsUseable = false;
                console.log('这次扫码', e.detail) //拿这个码请求,可以得到pid,recordID,再计算出每个record下已经扫描的总数量
                this.api.EndPoint.ScanBarcodeInfo(e.detail.result).then(
                    iSuccess => {
                        let isHas = false;
                        this.listData.forEach(list => {
                            if (list.Pid === iSuccess.Result.Pid && list.RecordID === iSuccess.Result.RecordID) {
                                isHas = true;
                                list.quantity++;
                            }
                        })
                        if (!isHas) {
                            let temp = { ...iSuccess.Result, quantity: 1 }
                            this.listData.push(temp);
                        }
                        this.$apply(() => { });
                    }
                ).catch(
                    iFailure => {
                        console.log('iFailure', iFailure);
                    }
                )
                wx.vibrateShort();//15ms的震动
            };
        },


        onDelete() {
            this.$route('navigateTo', '/pages/scan-management/delete');
        },
        showModalInput() {
            this.data.hiddenModalInput = false;
        },

        cancel() {
            this.data.hiddenModalInput = true;
        },

        confirm() {
            this.data.hiddenModalInput = true;
            this.data.scanSpeed = this.inputVal
            wepy.showToast({ title: '已修改扫码速度', icon: "success", });
        }
    }
    //
}