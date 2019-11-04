import wepy from "wepy";
import Register from "./register";
import event from "wepy/event";

export default class pageIndex extends wepy.page {

    config = {
        navigationBarTitleText: "登录页面",
    }
    components = {
        Register,
    }

    data = {}

    methods = {
        toLogin: ($evt?: event) => {
            console.log('toLogin')
        }
    }
}
