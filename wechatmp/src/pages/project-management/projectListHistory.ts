import wepy from "wepy";
import event from "wepy/event";
import { API } from "../../api.service";
import { TProjectStatus } from "../../api/constants"
import { translateTimestamp } from "../../mixins/helper";
const app = getApp();

export type projects = {
    Pid: number; PName: string; CreatorName: string;
    CreatorPhone: string; ProjectAccountName: string;
    ProjectAccountPhone: string; ProjectAccountUid: number;
    ClientCode: string; ClientName: string; Description: string;
    Comment: string; Status: TProjectStatus; LastModified: number; date: string;
}[];

export default class pageProjectListHistory extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "项目",
        navigationStyle: 'custom'
    }
    mixins = []
    components = {

    }

    data = {

        projects: [],
        animationData: null,
        animation: null,
        showModalStatus: false,
        list: null,
        navH: 0,
        searchTerm: ''
    }

    computed = {
        projects() {
            if (this.searchTerm) {
                console.log('this.searchTerm', this.searchTerm);
                return (this.rawProjects as projects).filter(item =>
                    JSON.stringify(item).match(this.searchTerm)
                );
            } else {
                return this.rawProjects;
            }
        }
    }

    showModalStatus: boolean;
    // animationData: null;
    animation: null;
    projects: projects;
    animationData: Record<string, any>[];
    activeIndex: number;
    navH: number;
    rawProjects: projects;
    $parent: any;
    historyPid: number;

    onLoad() {
        let currentPages = getCurrentPages()[0];
        console.log('getCurrentPages()', getCurrentPages());
        this.historyPid = parseInt(currentPages.options.historyPid);

        this.navH = this.$parent.globalData.navHeight;
    }
    onShow() {
        this.initData();
    }
    initData() {
        this.api.EndPoint.GetProjectHistory(this.historyPid).then(project => {
            this.projects = project.Result.Projects.map(x => ({ ...x, date: translateTimestamp(x.LastModified) }));
            this.rawProjects = project.Result.Projects.map(x => ({ ...x, date: translateTimestamp(x.LastModified) }));
            console.log('timestamp', this.projects);
            //  异步操作加this.$apply()
            this.$apply(() => { });
        }).catch(failure => {
            console.log('failure', failure);
        })
        let animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        })
        this.data.animation = animation;
    }
    util(currentStatus) {
    }
    methods = {
        typing: ((type: string, evt?: any) => {
            this[type] = evt.detail.value;
            console.log('search', evt.detail.value);
        }) as any,

    }
}
