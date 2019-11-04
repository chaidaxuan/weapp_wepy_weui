import wepy from "wepy";
import event from "wepy/event";

import { API } from "../api.service";
import 'wepy-async-function';

export default class Register extends wepy.component {
    api = API;

    config = {
        navigationBarTitleText: "注册页面",
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
            console.log(this.phone)
        }) as any,
        verify(evt?: event) {
            console.log('verify')
            console.log(this.data.phone)
            // if (!this.isPhone(this.phone)) {
            //     return this.$alert('温馨提示', '请填写正确的手机号码')
            // }
            this.timing(10);
            this.api.Auth.GetVerifyCode(this.data.phone).then(iSuccess => {
                console.log('iSuccess')
            }).catch(() => {
                console.log('iFailure')
            });
        },


    }

    timing(time: number) {
        console.log('timing')
        this.time = time;
        this.timer = setTimeout(() => {
            if (time > 0) {
                this.timing(time - 1)
            }
        }, 1000)
    }
}