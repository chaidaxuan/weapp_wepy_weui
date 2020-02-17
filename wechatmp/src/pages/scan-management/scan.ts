import wepy from "wepy";

export default class scan extends wepy.page {
    config = {
        navigationBarTitleText: "扫码页面",
    }
    data = {
        isShowInput: false,
        hiddenModalInput: true,
        inputVal: 10,
        scanSpeed: this.data.inputVal,
        listData: [
            { "code": "01", "text": "text1", "type": "type1" },
            { "code": "02", "text": "text2", "type": "type2" },
        ],
    }
    scanFunctionIsUseable = true;
    scanInterval = null;

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

    methods = {
        takeCode(e) {
            if (this.scanFunctionIsUseable) {
                this.scanFunctionIsUseable = false;
                console.log('这次扫码', e.detail.result)//拿这个码请求,可以得到pid,recordID,再计算出每个record下已经扫描的总数量
                wx.vibrateShort();//15ms的震动
            };
        },

        backTo() {
            wx.navigateBack({ delta: 1 })
            console.log('backTo');
            this.data.listData.push({ "code": "cx", "text": "cx", "type": "cx" });
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