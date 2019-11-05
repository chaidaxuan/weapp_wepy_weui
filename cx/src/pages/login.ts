import wepy from "wepy";
import event from "wepy/event";

import { API } from "../api.service";
import 'wepy-async-function';

export default class pageRegister extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "登录",
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
        login(evt?: event) {
            const e = evt as any;
            console.log(e);
            this.api.Auth.Login(e.detail.phone, e.detail.password).then(iSuccess => {
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