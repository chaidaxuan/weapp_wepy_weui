import wepy from "wepy";
import event from "wepy/event";

import { API } from "../api.service";
import 'wepy-async-function';

export default class pageRegister extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "注册",
    }

    data = {
        phone: '',
        password: '',
        company: '埃根',
        loading: false,
        timer: null,
        time: 0,
    };
    // that = this;

    computed = {
        btnText() {
            return +this.time > 0 ? `${this.time}s后重新获取` : '获取验证码'
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
        getVerifyCode(evt?: event) {
        },
        typing: ((type: string, evt?: any) => {
            this[type] = evt.detail.value
        }) as any,
        verify(evt?: event) {
            console.log('verify')
            console.log(this.data.phone)
            // if (!this.isPhone(this.phone)) {
            //     return this.$alert('温馨提示', '请填写正确的手机号码')
            // }
            this.timing(60)
            // this.time = 3
            let timer = setInterval(() => {
                if (this.time > 0) {
                    this.time--
                    console.log(this.time)
                } else {
                    clearInterval(timer)
                }

            }, 1000)

            this.api.Auth.GetVerifyCode(this.data.phone).then(iSuccess => {
                console.log('iSuccess')
            }).catch(() => {
                console.log('iFailure')
            });
        },
    }

}