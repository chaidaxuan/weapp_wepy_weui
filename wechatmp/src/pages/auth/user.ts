import wepy from "wepy";
import event from "wepy/event";
import { API } from "../../api.service";


export default class pageUser extends wepy.page {
    api = API;
    config = {
        navigationBarTitleText: "我的",
    }
    components = {

    }

    data = {
        userInfo: {
            nickName: '加载中...',
            role: '暂无',
            // 头像占位图
            avatarUrl: '/image/icon/icon-avatar@2x.png',
        }
    }

    onLoad() {
        const roleMap: { [key: number]: string } = {
            0: '未登录用户',
            100: '普通用户',
            500: '信息录入专员',
            1000: '管理员',
        };
        this.api.Auth.IsLoggedIn().then(
            iSuccess => {
                this.data.userInfo.nickName = iSuccess.Addition.Name;
                this.data.userInfo.role = roleMap[iSuccess.Result.Role];
            }
        ).catch(

        )
        wepy.getUserInfo({ withCredentials: true, lang: 'en', timeout: 5000 }).then(
            (iSuccess) => {
                console.log('iSuccess.userInfo', iSuccess.userInfo);
            }
        ).catch()
    }

    methods = {}
}
