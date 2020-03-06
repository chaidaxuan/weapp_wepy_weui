import wepy from "wepy";
import { API, TProductionPerformanceStatus, TReceivingDeliveryStatus } from "../../api.service";
import { IEndPointScanProductionPerformanceRequest } from "../../api/endpoint";
import { ScanOperation, TRollbackOperation } from "../../api/constants";
import { IFailure } from "../../api/api";

export type listData = {
    Barcodes: string[];
    Barcode: string;
    Pid: number;
    PName: string;
    RecordID: number;
    ProductionPerformanceStatus: TProductionPerformanceStatus;
    ReceivingDeliveryStatus: TReceivingDeliveryStatus
    Reason: string;
    quantity: number,
    unDeliveryAmount: number
}[];
// { Pid: iSuccess.result.Pid, recordID: iSuccess.Result.RecordID, info: iSuccess };
export type sameRecordIdBarcode = {
    Pid: number;
    recordID: number;
    info: {
        Barcodes: string[];
        Barcode: string;
        Pid: number;
        PName: string;
        RecordID: number;
        ProductionPerformanceStatus: TProductionPerformanceStatus;
        ReceivingDeliveryStatus: TReceivingDeliveryStatus
        Reason: string;
    };
}
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
        listData: [],
        BarcodeOperations: [],
        pendingBarcode: new Set<string>(),
        sameRecordIdBarcodes: [],
    }
    pendingBarcode = new Set<string>();
    scanFunctionIsUseable: boolean;
    scanInterval = null;
    sameRecordIdBarcodes: sameRecordIdBarcode;
    BarcodeOperations: IEndPointScanProductionPerformanceRequest;
    listData: listData;
    operation: number;

    onLoad() {
        let currentPages = getCurrentPages()[0];
        this.operation = parseInt(currentPages.options.process);
    }
    onShow() {
        this.scanControl();
        // this.data.pendingBarcode.clear();
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
    onConfirm() {
        this.data.pendingBarcode.forEach(barCode => {
            let temp = {
                "Barcode": barCode,
                "Operation": this.operation
            };
            this.BarcodeOperations.push(temp);
        });

        let pendingBarcode: string[] = [];
        this.data.pendingBarcode.forEach(barCode => { pendingBarcode.push(barCode) });

        if (this.operation === ScanOperation.DELIVERY) {

            this.api.EndPoint.ScanDelivery(pendingBarcode).then(
                iSuccess => {
                    wepy.showToast({ title: '发货成功', icon: 'success' });
                    wepy.switchTab({ url: '/pages/index' });
                }
            ).catch(
                (iFailure: IFailure) => {
                    wepy.showModal({ title: '发货失败', content: `原因${iFailure.Reason}`, cancelText: '确定' });
                }
            )
        } else if (this.operation === ScanOperation.RECEIPT) {

            this.api.EndPoint.ScanReceiving(pendingBarcode).then(
                iSuccess => {
                    wepy.showToast({ title: '收货成功', icon: 'success' });
                    wepy.switchTab({ url: '/pages/index' });
                }
            ).catch(
                (iFailure: IFailure) => {
                    wepy.showModal({ title: '收货失败', content: `原因${iFailure.Reason}`, cancelText: '确定' });
                }
            )
        } else if (this.operation === ScanOperation.ROLLBACK_MODIFY_PRODUCTION || this.operation === ScanOperation.ROLLBACK_REPRODUCTION) {

            if (this.operation === ScanOperation.ROLLBACK_MODIFY_PRODUCTION) {
                this.api.EndPoint.ScanRollback(pendingBarcode, TRollbackOperation.MODIFYPRODUCE).then(
                    iSuccess => {
                        wepy.showToast({ title: '重新生产成功', icon: 'success' });
                        wepy.switchTab({ url: '/pages/index' });
                    }
                ).catch((iFailure: IFailure) => {
                    wepy.showModal({ title: '重新生产失败', content: `原因${iFailure.Reason}`, cancelText: '确定' });
                })
            }
            if (this.operation === ScanOperation.ROLLBACK_REPRODUCTION) {
                this.api.EndPoint.ScanRollback(pendingBarcode, TRollbackOperation.REPRODUCE).then(
                    iSuccess => {
                        if (iSuccess.Result.InvalidBarcodeOperations) {

                            wepy.showModal({ title: '修改生产成功', content: `以下条形码未成功`, confirmText: '确定' });
                        } else {
                            wepy.showModal({ title: '修改生产成功', content: '', confirmText: '确定' });
                            wepy.switchTab({ url: '/pages/index' });
                        }
                    }
                ).catch((iFailure: IFailure) => {
                    wepy.showModal({ title: '修改生产失败', content: `原因${iFailure.Reason}`, cancelText: '确定' });
                })
            }

        } else {
            this.api.EndPoint.ScanProductionPerformance(this.BarcodeOperations).then(
                iSuccess => {
                    let content = ''
                    if (iSuccess.Result.InvalidBarcodeOperations) {
                        iSuccess.Result.InvalidBarcodeOperations.forEach(x => {
                            content += `条码:${x.Barcode}——原因：${x.Reason}\r\n`
                        })
                        console.log('content', content);
                        wepy.showModal({ title: '更新动态成功', content: `以下条形码未成功\r\n${content}`, confirmText: '确定' });
                    } else {
                        wepy.showModal({ title: '更新动态成功', content: content, });
                    }
                    wepy.switchTab({ url: '/pages/index' });
                }
            ).catch(
                (iFailure: IFailure) => {
                    wepy.showModal({ title: '设置生产动态失败', content: `原因${iFailure.Reason}`, cancelText: '确定' });
                }
            );
        }
        this.data.pendingBarcode.clear();
    }

    methods = {
        takeCode(e) {
            if (this.scanFunctionIsUseable) {
                this.scanFunctionIsUseable = false;
                console.log('这次扫码', e.detail);
                if (!this.pendingBarcode.has(e.detail.result)) {
                    let sameRecordIdBarcodesIsHas = false;
                    console.log('this.sameRecordIdBarcodesIsHas', this.sameRecordIdBarcodes);
                    this.data.listData.forEach(x => {
                        console.log('listData', x);
                        if (x.Barcodes) {
                            x.Barcodes.forEach(y => {
                                if (y === e.detail.result) {
                                    x.quantity++;
                                    wx.vibrateShort();
                                    this.pendingBarcode.add(e.detail.result);
                                    sameRecordIdBarcodesIsHas = true;
                                }
                            })
                        }
                    })
                    console.log('sameRecordIdBarcodesIsHas', sameRecordIdBarcodesIsHas)
                    if (!sameRecordIdBarcodesIsHas) {
                        //拿这个码请求,可以得到pid,recordID,再计算出每个recordID下已经扫描的总数量
                        this.api.EndPoint.ScanBarcodeInfo(e.detail.result).then(
                            iSuccess => {
                                let temp: sameRecordIdBarcode = { Pid: iSuccess.Result.Pid, recordID: iSuccess.Result.RecordID, info: iSuccess.Result };
                                this.sameRecordIdBarcodes.push(temp);
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
                                            this.$apply(() => { });
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