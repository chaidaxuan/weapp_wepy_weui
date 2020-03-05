import wepy from "wepy";
import event from "wepy/event";
import base from '../../mixins/base'
import http from '../../mixins/http'
import { API, TUserStatus, IFailure } from "../../api.service";
import 'wepy-async-function';

export default class pageRegister extends wepy.page {
    api = API;
    mixins = [base, http]

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
    phone: string;
    password: string;

    onShow() {
        this.api.Auth.IsLoggedIn().then(iSuccess => {
            if (iSuccess.Result.Status === TUserStatus.STATUS_NORMAL) {
                //   this.router.navigate(['index']);
                // this.$route('navigateTo', '/pages/homePage');
            }
        }).catch((iFailure: IFailure) => {
            this.api.log('login/ngOnInit', iFailure);
        });
    }
    login(evt?: event) {
        const e = evt as any;
        this.api.Auth.Login(this.phone, this.password).then(() => {
            wepy.switchTab({ url: '/pages/project-management/projectList' });
        }).catch(() => {
        })
    }
    methods = {
        // this.$get({
        //     url: 'https://paula.eigenvr.com/api/auth/login',
        //     headers: 'application/json',
        //     data: { Phone: '18521519605', Password: '123456' }
        // }, {
        //     success: ({ code, data }) => {
        //         wepy.switchTab({ url: '/pages/project-management/projectList' });
        //         console.log(data);
        //     },
        //     fail: ({ code, data }) => {
        //         console.log(data);
        //     }
        // }
        // )

        switchTabToProjectList() {
            wepy.switchTab({ url: '/pages/project-management/projectList' });
        },

        typing: ((type: string, evt?: any) => {
            this[type] = evt.detail.value
        }) as any,

        toRegister() {
            this.$route('navigateTo', '/pages/register');
        },
        toResetPassword() {
            this.$route('navigateTo', '/pages/forgetPassword');
        }
    }

}