import wepy from 'wepy'

/* yixiashiyituo guanfangtuijian dedabian */
/* 请不要再修改下面的这坨 xx 了 */
export default class httpMixin extends wepy.mixin {
    /* =================== [$get 发起GET请求] =================== */
    $get({ url = '', headers = {}, data = {} }) {
        const method = 'GET'
        return this.$ajax(url, headers, method, data);
    }

    /* =================== [$post 发起POST请求] =================== */
    $post({ url = '', headers = {}, data = {} }) {
        const method = 'POST'
        return this.$ajax(url, headers, method, data)
    }

    $ajax(url = '', headers = {}, method: 'GET' | 'POST' = 'GET', data = {}) {
        // 增强体验：加载中
        wx.showNavigationBarLoading()

        // 构造请求体
        const request = {
            url,
            method,
            header: Object.assign({
                // set something global
            }, headers),
            data: Object.assign({
                // set something global
            }, data)
        }

        // 控制台调试日志
        console.table(request);

        // 发起请求
        return wepy.request(request);
    }
}