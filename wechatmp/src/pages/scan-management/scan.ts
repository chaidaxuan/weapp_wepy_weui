import wepy from "wepy";

export default class scan extends wepy.page {
    config = {
        navigationBarTitleText: "扫码页面",
    }
    data = {
        scanFunctionIsUseable: true,
        isShowInput: false,
    }
    onShow() {
        setInterval(() => {
            this.data.scanFunctionIsUseable = !this.data.scanFunctionIsUseable
        }, 3000);
    }
    methods = {
        takeCode(e) {
            if (this.data.scanFunctionIsUseable) {
                console.log('scanFunctionIsUseable', this.data.scanFunctionIsUseable)
                console.log('这次扫码', e.detail.result)
                wx.vibrateShort();//15ms的震动
                this.data.scanFunctionIsUseable = false;
            }
        },
        backTo() {
            // wx.navigateBack({ delta: 1 })
            console.log('backTo');
            this.data.isShowInput = true;
        }
    }
    //
}