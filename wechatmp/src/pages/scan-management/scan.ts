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
                'Reason': "", 'quantity': 0,
            },
        ],
        BarcodeOperations: [],
        pendingBarcode: new Set(),
        sameRecordIdBarcode: new Set(),
    }
    scanFunctionIsUseable: boolean;
    scanInterval = null;
    BarcodeOperations: IEndPointScanProductionPerformanceRequest;
    listData: listData;
    operation: number;

    onLoad() {
        let currentPages = getCurrentPages()[0];
        this.operation = parseInt(currentPages.options.process);
    }
    onShow() {
        this.scanControl();
        this.data.pendingBarcode.clear()
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
                wepy.showToast({ title: '请求成功' });
                this.$redirect(`pages/index`);
            }
        ).catch(
            iFailure => {
                wepy.showModal({ title: '请求失败成功', content: '错误条码信息' });
            }
        )
    }
    onConfirm() {
        // if (this.operation)
        this.data.pendingBarcode.forEach(barCode => {
            let temp = {
                "Barcode": barCode,
                "Operation": this.operation
            };
            this.BarcodeOperations.push(temp);
        });
        console.log('pendingBarcode', this.data.BarcodeOperations);
        this.api.EndPoint.ScanProductionPerformance(this.BarcodeOperations).then(
            iSuccess => {
                wepy.showToast({ title: '设置生产动态成功', icon: 'success' })
                wepy.switchTab({ url: '/pages/index' });
            }
        ).catch(
            iFailure => {
                wepy.showModal({ title: '设置生产动态失败', content: '', cancelText: '确定' });
            }
        );
    }

    methods = {
        takeCode(e) {
            if (this.scanFunctionIsUseable) {
                this.scanFunctionIsUseable = false;
                console.log('这次扫码', e.detail);
                if (this.sameRecordIdBarcode && this.sameRecordIdBarcode.has(e.detail.result)) {
                    //todo 缓存同一recordId的条形码
                }
                if (!this.pendingBarcode.has(e.detail.result)) {
                    //拿这个码请求,可以得到pid,recordID,再计算出每个record下已经扫描的总数量s
                    this.api.EndPoint.ScanBarcodeInfo(e.detail.result).then(
                        iSuccess => {
                            iSuccess.Result.Barcodes.forEach(item => {
                                this.sameRecordIdBarcode.add(item);
                            }
                            );
                            let isHas = false;
                            this.listData.forEach(list => {
                                if (list.Pid === iSuccess.Result.Pid && list.RecordID === iSuccess.Result.RecordID) {
                                    isHas = true;
                                    list.quantity++;
                                };
                            });
                            // 已保存的条形码中,无该条形码
                            if (!isHas) {
                                this.pendingBarcode.add(iSuccess.Result.Barcode);
                                this.api.EndPoint.GetUnDeliveryAmount(e.detail.result).then(
                                    ISuccess => {
                                        let temp = { ...iSuccess.Result, quantity: 1, unDeliveryAmount: ISuccess.Result.UnDeliveryAmount };
                                        this.listData.push(temp);
                                    }
                                ).catch();
                            };
                            console.log('this.listData', this.listData);
                            this.$apply(() => { });
                            wx.vibrateShort();//15ms的震动
                        }
                    ).catch(
                        iFailure => {
                            console.log('iFailure', iFailure);
                        }
                    )
                }
            };
            console.log('this.pendingBarcode', this.pendingBarcode);
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
            this.data.scanSpeed = this.inputVal;
            wepy.showToast({ title: '已修改扫码速度', icon: "success", });
        }
    }
}