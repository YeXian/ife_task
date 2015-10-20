// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return arr instanceof Array;
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn == 'function';
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var type = Object.prototype.toString.call(src).slice(8, -1).toLowerCase();
    var result;
    switch (type) {
        case 'number':
            result = new Number();
            break;
        case 'string':
            result = new String();
            break;
        case 'boolean':
            result = new Boolean();
            break;
        case 'date':
            result = new Date();
            break;
        case 'array':
            result = [];
            break;
        case 'object':
            result = {};
            break;
        default:
            return;
    }
    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            //如果属性是标准类型，直接拷贝
            if (src[key] == null || typeof src[key] != 'object' ) {
                result[key] = src[key];
                continue;
            }
            //如果属性为引用类型，则递归，进入下一层拷贝。
            result[key] = arguments.callee(src[key]);
        }
    }
    return result;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(array) {
    //拷贝一个arr副本
    // var array = arr.concat();
    for (var i = 0; i < array.length; i++) {
        var index = i + 1;
        while (index != -1) {
            index = array.indexOf(array[i], index);
            if (index != -1) {
                array.splice(index, 1);
            }
        }
    }
    return array;
}
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
    var array = [];
    array.forEach.call(arr, fn);
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    return Object.keys(obj).length;
}
// 通过正则，判断是否为邮箱地址
function isEmail(emailStr) {
    var pattern = /^\w+[\w|\.|\-]{3,}@[A-Za-z0-9]{2,}(\.[A-Za-z0-9]{2,3}){1,3}$/;
    return pattern.test(emailStr);
}
// 正则：判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^0?(13\d|15[012356789]|18[0-9]|17[678]|14[57])\d{8}$/;
    return pattern.test(phone);
}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var className = element.getAttribute('class');
    className += ' ' + newClassName;
    element.setAttribute('class', className);
}
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var className = element.getAttribute('class');
    oldClassName = oldClassName.split(' ');
    for (var i = 0; i < oldClassName.length; i++) {
        className = className.replace(oldClassName[i], '');
    }
    //这里需注意正则表达式的优先级，先匹配字符串头和尾，再中间
    className = className.replace(/^\s*|\s*$|\s*(?=\s)/g, '');
    element.setAttribute('class', className);
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return (element.parentNode == siblingNode.parentNode);
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var coordinate = {};
    coordinate.x = element.getBoundingClientRect().left;
    coordinate.y = element.getBoundingClientRect().top;
    return coordinate;
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
// 添加事件绑定
$.on = function (selector, event, listener) {
    addEvent($(selector), event, listener);
}
// 移除事件绑定
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