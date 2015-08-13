function each(arr, fn) {
    var array = [];
    array.forEach.call(arr, fn);
}
// 实现一个简单的Query，传入参数为字符串，应用在最下方
function $(selector) {
    //caller变量指向函数的调用者，全局下调用则caller指向document
    var caller = (this === window)? document : this ;
    //传入多个参数的情况下，按空格分割并保存在数组中
    selector = selector.split(' ');
    for (var i = 0; i < selector.length; i++) {
        var result = getElement.call(caller, selector[i]);
        //多参数下如果前面的参数不符合，直接跳出
        if (result == null) {
            break;
        }
        //返回元素变成调用者，继续下一步查找
        caller = result;
    }
    return result;
    //用于获取对应元素的方法
    function getElement(name) {
        //检查传入字符串的首字符，以此判断选择器类型
        switch (name[0]) {
            //id选择器
            case '#':
                return document.getElementById(name.slice(1));
            //类选择器
            case '.':
                return this.getElementsByClassName(name.slice(1))[0];
            //属性选择器
            case '[': {
                //如果同时传入了属性值，则会被保存在value，否则value值为undefined
                var value = name.slice(1, -1).split('=')[1];
                //去掉中括号(以及属性值)后的属性名
                name = name.slice(1, -1).split('=')[0];
                //获得元素下的所有子元素
                var elements = this.getElementsByTagName('*');
                //遍历元素下的所有子元素，匹配与传入属性attribute相符(且值正确)的元素
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].attributes[name]) {
                        //如果没有传入要匹配的属性值，则直接返回该元素
                        if (!value) {
                            return elements[i];
                        }
                        //如果存在要匹配的值，匹配上才返回该元素
                        if(value === elements[i].attributes[name].nodeValue) {
                            return elements[i];
                        }
                    }
                }
                return;
            };
            //当以上均不符合条件时，当成标签选择器
            default: 
                return this.getElementsByTagName(name)[0];
        }
    }
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (!!element.addEventListener) {
        element.addEventListener(event, listener, !1);
    }
    else {
        element.attachEvent('on' + event, listener);
    }
}
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (!!element.removeEventListener) {
        element.removeEventListener(event, listener, !1);
    }
    else {
        element.detachEvent('on' + evenet, listener);
    }
}

$.on = function (selector, event, listener) {
    addEvent($(selector), event, listener);
}
$.un = function (selector, event, listener) {
    removeEvent($(selector), event, listener);
}
// 实现对click事件的绑定
$.click = function (selector, listener) {
    $.on(selector, 'click', listener);
}
// 实现对于按Enter键时的事件绑定
// 可以在事件函数listener 外再包一层判断keyup值的函数。
$.enter = function (selector, listener) {
    $.on(selector, 'keyup', outerListener);
    function outerListener (event) {
        if (event.keyCode == '13') {
            return listener(event);
        }
    }
}
// 事件代理：$.delegate($('#list'), 'li', 'click', clickListener);
$.delegateEvent = function (element, tag, eventName, listener) {
    $.on(element, eventName, innerListener);
    function innerListener (event) {
        if (event.target.nodeName.toLowerCase() == tag) {
            return listener(event);
        }
    }
}

//事件函数
function handler(event) {
    alert('123');
}

$.delegateEvent('#list', 'a', 'click', handler);

