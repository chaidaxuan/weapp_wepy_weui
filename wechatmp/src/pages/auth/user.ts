import wepy from "wepy";
import event from "wepy/event";


export default class pageUser extends wepy.page {

    config = {
        navigationBarTitleText: "我的",
    }
    components = {

    }

    data = {
        userInfo: {
            nickName: '加载中...',
            // 头像占位图
            avatarUrl: '/image/icon/icon-avatar@2x.png',
        }
    }
    onLoad() {
        // wepy.getUserInfo({ withCredentials: true, lang: 'en', timeout: 5000 }).then(
        //     (iSuccess) => {
        //     }
        // ).catch()
    }

    methods = {}
}
