import wepy from "wepy"
import base from "../mixins/base"
import { API } from "../api.service"
import 'wepy-async-function'
export default class RegisterComponent extends wepy.component {
    api = API;

    mixins = [base]
    data = {
        phone: '',
        password: '',
        company: '埃根',
        loading: false,
        timer: null,
        time: 0,
    };

    computed = {
        btnText() {
            return +this.time > 0 ? `${this.time}s后重新获取` : '获取验证码'
        }
    }

    methods = {
        formSubmit(e) {

        },
        getVerifyCode() {
        },
        typing(type, e) {
            if (this.isDefined(this[type])) {
                this[type] = e.detail.value
            }
            console.log(this.phone)
        },
        verify() {
            console.log('verify')
            console.log(this.data.phone)
            if (!this.isPhone(this.phone)) {
                return this.$alert('温馨提示', '请填写正确的手机号码')
            }
            this.timing(10)
            this.api.Auth.GetVerifyCode(this.data.phone).then(iSuccess => {
                console.log('iSuccess')
            }).catch(() => {
                console.log('iFailure')
            }
            )
        },


    }

    timing(time: number) {
        console.log('timing')
        this.time = this.getNumber(time)
        this.$apply()
        this.timer = setTimeout(() => {
            if (time > 0) {
                this.timing(time - 1)
            }
        }, 1000)
    }
}