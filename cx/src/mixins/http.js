import wepy from 'wepy'

/* yixiashiyituo guanfangtuijian dedabian */
/* 请不要再修改下面的这坨 xx 了 */
export default class httpMixin extends wepy.mixin {
    /* =================== [$get 发起GET请求] =================== */
    $get({ url = '', headers = {}, data = {} }, { success = () => {}, fail = () => {}, complete = () => {} }) {
        const methods = 'GET'
        this.$ajax({ url, headers, methods, data }, { success, fail, complete })
    }

    /* =================== [$post 发起POST请求] =================== */
    $post({ url = '', headers = {}, data = {} }, { success = () => {}, fail = () => {}, complete = () => {} }) {
        const methods = 'POST'
        this.$ajax({ url, headers, methods, data }, { success, fail, complete })
    }

    /**
     * [ajax 统一请求方法]
     * @param  {[type]}  item [description]
     * @return {Boolean}      [description]
     */
    $ajax({ url = '', headers = {}, methods = 'GET', data = {} }, { success = () => {}, fail = () => {}, complete = () => {} }) {
        // 增强体验：加载中
        wx.showNavigationBarLoading()

        // 构造请求体
        const request = {
            url,
            method: ['GET', 'POST'].indexOf(methods) > -1 ? methods : 'GET',
            header: Object.assign({
                // set something global
            }, headers),
            data: Object.assign({
                // set something global
            }, data)
        }

        // 控制台调试日志
        console.table(request)

        // 发起请求
        wepy.request(Object.assign(request, {
            success: ({ statusCode, data }) => {
                // 控制台调试日志
                console.log('[SUCCESS]', statusCode, typeof data === 'object' ? data : data.toString().substring(0, 100));
                // 成功回调
                success && success({ statusCode, ...data });
            },
            fail: ({ statusCode, data }) => {
                // 控制台调试日志
                console.log('[FAIL]', statusCode, data);
                // 失败回调
                fail && fail({ statusCode, ...data });
            },
            complete: (res) => {
                // 控制台调试日志
                console.log('[COMPLETE]', res);
                // 隐藏加载提示
                wx.hideNavigationBarLoading();
                // 停止下拉状态
                wx.stopPullDownRefresh();
            }
        }))
    }
}