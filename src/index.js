/**
 * @file some commonly tools
 * @author Daniellee <17532348@qq.com>
 */

; (function (win, doc) {
    // 检测对象是否存在
    if (window.Tools || window._) {
        console.warn('existed tools, ready cover~')
    }
    /** 
     * @function
     * @param {string} selector 选择器字符串
     * @param {object} context 元素的上下文
     * @return {object} Tools.fn.init方法实例
     */
    var Tools = function (selector, context) {
        if (isUndefined(selector)) {
            throw new Error('selector is must');
        } else {
            return new Tools.fn.init(selector, context);
        }
    }
    Tools.fn = Tools.prototype = {
        constructor: Tools,
        version: 1,
        init: function (selector, context) {
            // 设置元素长度
            this.length = 0;
            // 默认获取元素的上下文document
            context = context || document;
            if (selector.indexOf('#') > -1 && selector.indexOf('#') === selector.lastIndexOf('#')) { // 判断是否id选择符
                this[0] = doc.getElementById(selector)
            } else if (selector.indexOf('.') > -1 && selector.indexOf('.') === selector.lastIndexOf('.')) { // 判断是否class选择器
                var classNodes = doc.getElementsByClassName(selector.substring(1));
                if (classNodes.length) {
                    this.length = classNodes.length
                    for (var index = 0; index < classNodes.length; index++) {
                        this[index] = classNodes[index]
                    }
                }
            } else {
                // 选择符格式无命中
                console.error('selector\'s format is mistaken!')
            }
            this.context = context;
            this.selector = selector;
            return this
        }
    }
    /**
     * 方法拓展
     * @param {object} extend 需要添加在原型或方法中的拓展
     * @param {boolean} type 是否添加在原型中（默认为添加在方法中）
     * @returns void
     */
    Tools.extend = Tools.fn.extend = function (extend, type) {
        if (isUndefined(extend) || Object.prototype.toString.call(extend) !== '[object Object]') {
            return;
        }
        var target = isUndefined(type) ? this : this.fn, propName;
        // 将参数对象合并到target
        for (propName in extend) {
            target[propName] = extend[propName];
        }
    }
    // 挂载小工具
    Tools.extend({
        debounce: function (fn, wait) {
            let timer = null
            return function () {
                var arg = arguments
                if (timer) clearTimeout(timer)
                timer = setTimeout(function () {
                    fn.apply(fn, arg)
                }, wait)
            }
        },
        throttle: function (fn, wait) {
            var prevTime = 0
            return function () {
                var nowDate = Date.now()
                if (nowDate - prevTime > wait) {
                    fn.apply(this, arguments)
                    prevTime = nowDate
                }
            }
        }
    })

    /** @global */
    function isUndefined(target) {
        return target === undefined
    }

    Tools.fn.init.prototype = Tools.fn;
    win._ = win.Tools = Tools;
})(window, document);
