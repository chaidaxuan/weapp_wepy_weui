import wepy from "wepy";
import RegisterComponent from "../pages/register";
export default class Index extends wepy.page {

    config = {
        navigationBarTitleText: "登录页面",
    }
    components = {
        register: RegisterComponent,
    }

    data = {}

    onload() { }
    // public output() {
    //     console.log('111')
    // }
    methods = {
        output() {
            console.log('11')
        }
    }
}
