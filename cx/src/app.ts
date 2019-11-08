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
            'pages/register',
            'pages/login',
            'pages/forgetPassword',

            'pages/auth/modifyInfo',
            'pages/auth/resetPassword',
            'pages/auth/logout',

            'pages/homePage',

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
                "iconPath": "image/icon_component.png",
                "selectedIconPath": "image/icon_component_HL.png",
                "text": "首页"
            }, {
                "pagePath": "pages/project-management/projectList",
                "iconPath": "image/icon_component.png",
                "selectedIconPath": "image/icon_component_HL.png",
                "text": "项目"
            }, {
                "pagePath": "pages/forgetPassword",
                "iconPath": "image/icon_component.png",
                "selectedIconPath": "image/icon_component_HL.png",
                "text": "用户"
            },
            {
                "pagePath": "pages/auth/user",
                "iconPath": "image/icon_component.png",
                "selectedIconPath": "image/icon_component_HL.png",
                "text": "我的"
            }]
        },
    };
    onLaunch() {
        console.log('on launch')
    }
}