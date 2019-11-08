import wepy from 'wepy'

export default class baseMixin extends wepy.mixin {
    isObject(item) {
        return typeof item === 'object' && !this.isArray(item);
    }
    isString(item) {
        return typeof item === 'string';
    }
    $alert(item = '标题', item2) {
        const param = this.isObject(item) ? Object.assign({
            // 首参数为obj
            title: 'title',
            content: 'content'
        }, item) : this.isString(item) ? this.isString(item2) ? {
            // 俩参数均为字符串
            title: item,
            content: item2
        } : {
            // 只有首参为字符串
            title: '',
            content: item
        } : {
            // 尝试转换字符串
            title: item.toString ? item.toString() : '参数异常'
        }
        wx.showModal(Object.assign({
            showCancel: false
        }, param))
    }
}