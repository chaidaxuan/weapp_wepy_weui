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
            // wepy.navigateTo({ url: '/pages/register' });
            // this.$navigate('/pages/register');
            this.$route('navigateTo', '/pages/login');
            console.log('login1')
        }
    }
}
