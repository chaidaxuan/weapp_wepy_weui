import wepy from 'wepy'
import 'wepy-async-function'

export default class extends wepy.app {
    config = {
        pages: [
            'pages/index',
            'pages/register',
            'pages/login',
            'pages/forgetPassword',
            'pages/homePage',

            'pages/project-management/projectList'
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
                "pagePath": "pages/login",
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