import wepy from 'wepy'
import 'wepy-async-function'

export default class extends wepy.app {
    config = {
        pages: [
            'pages/index',
            'pages/register',
            'pages/login'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        },
    };
    onLaunch() {
        console.log('on launch')
    }
}