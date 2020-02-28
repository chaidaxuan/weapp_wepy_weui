import wepy from "wepy";
import { API } from "../../api.service";
import { TProjectStatus } from "../../api/constants"

export type projects = {
    Pid: number; PName: string; CreatorName: string;
    CreatorPhone: string; ProjectAccountName: string;
    ProjectAccountPhone: string; ProjectAccountUid: number;
    ClientCode: string; ClientName: string; Description: string;
    Comment: string; Status: TProjectStatus; LastModified: number;
}[];

export default class pageProjectList extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "项目",
        navigationStyle: 'custom'
    }
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
                    item.PName.match(this.searchTerm) || item.ProjectAccountName === this.searchTerm
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

    onLoad() {
        this.activeIndex = 444444;
        this.navH = this.$parent.globalData.navHeight;
        console.log(' this.navH', this.navH);
        // https://github.com/Tencent/wepy/wiki/wepy%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8Promise
        // 在1.4.1以下版本，wepy生成的项目默认都会加入promise polyfill,在1.4.1以后的版本，需要用户手动加入，
        this.initData();
        // this.tabClick1();
        // console.log('this.data.projects11', this.data.projects);s
    }
    onShow() {
        this.initData();

    }

    initData() {
        this.api.Admin.GetProjects().then(project => {
            this.projects = project.Result.Projects;
            this.rawProjects = project.Result.Projects;
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
    ModificationHistory(e) {
        let historyPid: number = e.currentTarget.dataset.item.Pid;
        this.$redirect('/pages/project-management/projectListHistory', { historyPid: historyPid });
    }
    util(currentStatus) {
    }
    methods = {
        onMore(e) {
            this.showModalStatus = true;
            this.list = e.currentTarget.dataset.item;
            console.log('e', e);
        },
        onDetail(e) {
            let pid: number = e.currentTarget.dataset.item.Pid;
            this.$redirect('/pages/project-management/project-detail/projectDetail', { Pid: pid });
            console.log('onDetail');
        },
        hideModalStatus() {
            this.showModalStatus = false;
        },
        typing: ((type: string, evt?: any) => {
            this[type] = evt.detail.value;
            console.log('search', evt.detail.value);
        }) as any,

    }
}
