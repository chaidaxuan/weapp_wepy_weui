import wepy from "wepy"; import event from "wepy/event";
;
export default class pageProjectList extends wepy.page {

    config = {
        navigationBarTitleText: "项目",
    }
    components = {

    }

    data = {
        tabs: ["选项一", "选项二", "选项三"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        sliderWidth: 1,
    }
    onLoad() {
        var that = this
        var sliderWidth = 125
        // https://github.com/Tencent/wepy/wiki/wepy%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8Promise
        // 在1.4.1以下版本，wepy生成的项目默认都会加入promise polyfill,在1.4.1以后的版本，需要用户手动加入，

        wepy.getSystemInfo().then(
            (iSuccess) => {
                this.sliderWidth = iSuccess.screenWidth / 3
                this.sliderLeft = (iSuccess.windowWidth / this.data.tabs.length - this.data.sliderWidth) / 2
                this.sliderOffset = (iSuccess.windowWidth / this.data.tabs.length * this.data.activeIndex)
                console.log(this.data)
            }
        ).catch()

    }

    methods = {

    }
    tabClick(evt?: event) {
        const e = evt as any;
        this.sliderOffset = e.currentTarget.offsetLeft
        this.activeIndex = e.currentTarget.id
        console.log(this.data)
        // this.$apply()
    }
}
