import wepy from "wepy";
import event from "wepy/event";

import { API, TUserStatus, IFailure } from "../../api.service";
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
    methods = {
        login(evt?: event) {
            console.log('111111')
            // const e = evt as any;
            // console.log(e);
            // this.api.Auth.Login(e.detail.value.phone, e.detail.value.password).then(iSuccess => {

            //     console.log('iSuccess')
            //     this.$route('navigateTo', '/pages/auth/user');
            //     // let toDoUrl = 'pages/project-management/projectList';
            //     // wepy.switchTab({ url: toDoUrl })
            // }).catch(() => {
            //     console.log('iFailure')
            //     this.$alert('温馨提示', '请填写正确的手机号码');
            // })
        },

        typing: ((type: string, evt?: any) => {
            this[type] = evt.detail.value
        }) as any,

        toRegister() {
            this.$route('navigateTo', '/pages/register');
        },
        toResetPassword() {
            this.$route('navigateTo', '/pages/forgetPassword', { phone: 18521519605 });
        }
    }

}