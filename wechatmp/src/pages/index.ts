import wepy from "wepy";
import event from "wepy/event";
import { API } from "../api.service";


export default class pageIndex extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "首页",
    }
    components = {
    }
    computed = {
        currentProcess() {
            return this.currentProcessIndex ? this.productionProcessLabel[this.currentProcessIndex] : '';
        }
    }
    data = {
        canScan: true,
        productionProcessLabel: ['1开料', '2腐蚀', '3冲孔', '4折弯'],
        // productionProcessValue: [1, 2, 3, 4],
    }
    canScan: boolean = true;

    onShow() {
        // 初始化页面数据
        this.api.Auth.IsLoggedIn().then(iSuccess => {
            this.data.canScan = true;
        }).catch()
    }

    methods = {
        toLogin: ($evt?: event) => {
            this.$route('navigateTo', '/pages/auth/resetPassword');
        },
        toScan: () => {
            this.$route('navigateTo', '/pages/scan-management/scan')
            // wepy.scanCode({}).then(res => {

            // }).catch(fail => {
            //     console.log(fail);
            // })
        },
        // bindPickerChange: ($evt?: event) => {

        // }
        bindPickerChange: function (e) {
            console.log('picker发送选择改变，携带值为', e);
            this.currentProcessIndex = e.detail.value;
            console.log('selectedProductionProcess', this.selectedProductionProcess)
        },
    }
}
