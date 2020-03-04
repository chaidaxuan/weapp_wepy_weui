import wepy from "wepy";
import event from "wepy/event";
import base from "../../mixins/base";
import { API } from "../../api.service";
import 'wepy-async-function';
import { IFailure } from "../../api/api";

export default class pageRegister extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "注册",
    }
    mixins = [base]
    data = {
        phone: '',
        password: '',
        company: '埃根',
        loading: false,
        timer: null,
    };
    isPhone: any;
    phone: string;
    time: number;
    $alert: any;
    // that = this;

    computed = {
        btnText() {
            return this.time > 0 ? `${this.time}后可再发` : '发送验证码'
        }
    }
    company: string;
    name: string;
    verifyCode: string;
    password: string;



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
    register() {
        if (this.company && this.name && this.phone && this.verifyCode && this.password) {
            this.api.Auth.Register(this.phone, this.name, this.password, this.company, this.verifyCode).
                then(iSuccess => {
                    this.$alert('注册成功', '即将跳转到项目页面');
                })
                .catch((iFailure: IFailure) => {
                    this.$alert('注册失败', `原因:${iFailure.Reason}`);
                }
                )
        } else {
            this.$alert('温馨提示', '所需信息填写不全');
        }
    }

    methods = {
        formSubmit(evt?: event) {
            const e = evt as any;
            console.log(e);
            this.api.Auth.Register(e.detail.phone, e.detail.name, e.detail.password, e.detail.company, e.detail.verifyCode).then(iSuccess => {
                console.log('iSuccess')
            }).catch(() => {
                console.log('iFailure')
                // this.$alert('温馨提示', '请填写正确的手机号码');
            })
        },
        typing: ((type: string, evt?: any) => {
            this[type] = evt.detail.value
        }) as any,

    }

}