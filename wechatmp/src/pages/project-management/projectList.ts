import wepy from "wepy";
import event from "wepy/event";
import { API } from "../../api.service";
import { TProjectStatus } from "../../api/constants"

export default class pageProjectList extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "项目",
    }
    components = {

    }

    data = {
        tabs: ["选项一", "选项二", "选项三"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        sliderWidth: 1,
        projects: [],
    }
    projects: {
        Pid: number; PName: string; CreatorName: string;
        CreatorPhone: string; ProjectAccountName: string;
        ProjectAccountPhone: string; ProjectAccountUid: number;
        ClientCode: string; ClientName: string; Description: string;
        Comment: string; Status: TProjectStatus; LastModified: number;
    }[];

    onLoad() {
        // https://github.com/Tencent/wepy/wiki/wepy%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8Promise
        // 在1.4.1以下版本，wepy生成的项目默认都会加入promise polyfill,在1.4.1以后的版本，需要用户手动加入，
        this.initData();
        // console.log('this.data.projects11', this.data.projects);
    }
    onShow() {
        this.initData();
    }
    initData() {
        this.api.Admin.GetProjects().then(project => {
            this.projects = project.Result.Projects;
            //  异步操作加this.$apply()
            this.$apply(() => { });
        }).catch(failure => {
            console.log('failure', failure)
        })
    }

    methods = {

    }
    tabClick(evt?: event) {

    }
}
