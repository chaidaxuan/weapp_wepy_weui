import wepy from 'wepy'
import 'wepy-async-function'

export default class extends wepy.app {
    constructor() {
        super();
        this.use('promisify');
    }
    config = {
        pages: [
            'pages/index',
            'pages/homePage',

            'pages/auth/modifyInfo',
            'pages/auth/resetPassword',
            'pages/auth/logout',
            'pages/auth/login',

            'pages/project-management/projectList',

            'pages/auth/user'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            color: '#AEADAD',
            selectedColor: '#049BFF',
            backgroundColor: '#fff',
            borderStyle: 'black',
            "list": [{
                "pagePath": "pages/index",
                "iconPath": "image/homepage.png",
                "selectedIconPath": "image/icon_component_HL.png",
                "text": "首页"
            }, {
                "pagePath": "pages/project-management/projectList",
                "iconPath": "image/project.png",
                "selectedIconPath": "image/icon_component_HL.png",
                "text": "项目"
            }, {
                "pagePath": "pages/project-management/projectList",
                "iconPath": "image/user.png",
                "selectedIconPath": "image/icon_component_HL.png",
                "text": "用户"
            },
            {
                "pagePath": "pages/auth/user",
                "iconPath": "image/self.png",
                "selectedIconPath": "image/icon_component_HL.png",
                "text": "我的"
            }]
        },
    };
    onLaunch() {
        console.log('on launch')
    }
}