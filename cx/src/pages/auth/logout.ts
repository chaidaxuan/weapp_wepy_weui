import wepy from "wepy"; import { API } from "../../api.service";
;
export default class pageLogout extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "注销页面",
    }
    components = {

    }

    data = {}

    methods = {

    }
    onShow(options) {
        this.api.Profile.Logout().finally(() => this.$route('navigateTo', '/pages/index'));
    }
}
