import wepy from "wepy";
import { sameRecordIdBarcode, listData } from "./scan";
import { API } from "../../api.service";
import { IEndPointScanProductionPerformanceRequest } from "../../api/endpoint";

export default class deleteCode extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "删码页面",
    }
    data = {
        isShowInput: false,
        hiddenModalInput: true,
        inputVal: 10,
        scanSpeed: this.data.inputVal,
        pendingBarcode: new Set(),
        listData: [],
        sameRecordIdBarcodes: []
    }
    scanFunctionIsUseable: boolean;
    scanInterval = null;
    sameRecordIdBarcodes: sameRecordIdBarcode;
    BarcodeOperations: IEndPointScanProductionPerformanceRequest;
    listData: listData;
    operation: number;
    pendingBarcode: any;

    onLoad() {
        // let currentPages = getCurrentPages();
        // console.log('delete getCurrentPages', currentPages);
    }
    onShow() {
        this.data.pendingBarcode.clear();
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
                                    this.pendingBarcode.add(e.detail.result);
                                    sameRecordIdBarcodesIsHas = true;
                                }
                            })
                        }
                    })
                    console.log('sameRecordIdBarcodesIsHas', sameRecordIdBarcodesIsHas);
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
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];
            console.log('prevPage.pendingBarcode.', prevPage.pendingBarcode);
            this.pendingBarcode.forEach(x => {
                prevPage.data.pendingBarcode.delete(x);
            });
            this.listData.forEach(cur => {
                prevPage.data.listData.forEach(prev => {
                    cur.Pid === prev.Pid && cur.RecordID === prev.RecordID
                        && cur.quantity <= prev.quantity ? prev.quantity -= cur.quantity : ''
                })
            })
            this.pendingBarcode.clear();

            wx.navigateBack({ delta: 1 });
        },
        backTo() {
            wx.navigateBack({ delta: 1 });
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