import wepy from "wepy";

export default class RegisterComponent extends wepy.component {
    company: '埃根'
    public data = {
        Phone: 18521519605,
        Password: 123456,
        company: '埃根'
    };

    methods = {
        formSubmit(e) {
            console.log(e)
        },
        getVerifyCode() {
            console.log('111')
            this.data.Phone = 12345
            // wepy.showToat({
            //     title: '请输入有效的手机号',
            //     icon: 'none'
            // })
            console.log(this.data.Phone)
        },
        inputeidt(e) {
            console.log('222')
        }
    }



}