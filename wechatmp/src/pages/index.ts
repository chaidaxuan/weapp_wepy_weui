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
        showLogin: true,
        currentProcessIndex: null,
        productionProcessLabel: [
            '1开料', '2腐蚀', '3冲孔', '4折弯', '5滚弧', '6焊接', '7打磨', '8喷涂',
            '发货', '收货', '回退-修改生产', '回退-重新生产'],
        productionProcessValue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }
    canScan: boolean;
    isLoggedIn: boolean;
    isShowLogin: boolean;

    onShow() {
        console.log('getCurrentPages', getCurrentPages());
        // 初始化页面数据
        this.api.Auth.IsLoggedIn().then(iSuccess => {
            this.canScan = true;
            this.isShowLogin = false;
            this.$apply(() => { });
        }).catch()
    }

    methods = {
        toLogin: ($evt?: event) => {
            this.$route('navigateTo', '/pages/auth/login');
        },
        toScan: () => {
            // this.$route('navigateTo', `/pages/scan-management/scan?process=${this.data.productionProcessValue[this.data.currentProcessIndex]}`)
            this.$redirect(`/pages/scan-management/scan`, { process: '1' });
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
            console.log('productionProcessValue', this.Value);
        },
    }
}
