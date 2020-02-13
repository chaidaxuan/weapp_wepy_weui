import wepy from "wepy";

export default class scan extends wepy.page {
    config = {
        navigationBarTitleText: "扫码页面",
    }
    data = {
        scanFunctionIsUseable: true,
        isShowInput: false,
        hiddenModalInput: true,
        inputVal: 100,
        scanSpeed: this.data.inputVal,
    }
    onShow() {
        setInterval(() => {
            this.data.scanFunctionIsUseable = !this.data.scanFunctionIsUseable
        }, this.data.scanSpeed * 1000);
    }

    methods = {
        takeCode(e) {
            if (this.data.scanFunctionIsUseable) {
                console.log('scanFunctionIsUseable', this.data.scanFunctionIsUseable)
                console.log('这次扫码', e.detail.result)
                wx.vibrateShort();//15ms的震动
                this.scanFunctionIsUseable = false;
            }
        },
        backTo() {
            // wx.navigateBack({ delta: 1 })
            console.log('backTo');
            this.hiddenModalInput = false;
        },

        cancel() {
            this.hiddenModalInput = true;
        },

        confirm() {
            this.hiddenModalInput = true;
            this.data.scanSpeed = this.inputVal
            wepy.showToast({ title: '已修改扫码速度', icon: "success", });
        }
    }
    //
}