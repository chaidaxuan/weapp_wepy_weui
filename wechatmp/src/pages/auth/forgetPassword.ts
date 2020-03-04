import wepy from "wepy";
import event from "wepy/event";
import base from "../../mixins/base";
export default class pageForget extends wepy.page {

    config = {
        navigationBarTitleText: "重置密码",
    }
    mixins = [base]
    computed = {
        btnText() {
            return this.time > 0 ? `${this.time}后可再发` : '发送验证码'
        }
    }
    components = {

    }

    data = {
        phone: null,
    }
    isPhone: any;
    phone: string;
    time: number;
    $alert: any;

    api: any;
    verify(evt?: event) {
        if (!this.isPhone(this.phone)) {
            this.$alert('温馨提示', '请填写正确的手机号码')
        } else {
            this.time = 60;
            let timer = setInterval(() => {
                if (this.time > 0) {
                    this.time--;
                    this.$apply(() => { });
                } else {
                    clearInterval(timer);
                }
            }, 1000)

            this.api.Auth.GetVerifyCode(this.phone).then(iSuccess => {
                console.log('iSuccess');
            }).catch(() => {
                console.log('iFailure');
            });
        }
    }

    methods = {
        typing: ((type: string, evt?: any) => {
            this[type] = evt.detail.value
        }) as any,
    }
    onShow(options) {

    }
}
