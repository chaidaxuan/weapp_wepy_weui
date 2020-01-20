import wepy from "wepy";
import event from "wepy/event";


export default class pageIndex extends wepy.page {

    config = {
        navigationBarTitleText: "首页",
    }
    components = {

    }

    data = {}

    methods = {
        toLogin: ($evt?: event) => {
            this.$route('navigateTo', '/pages/auth/resetPassword');
        }
    }
}
