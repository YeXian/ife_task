// 实现一个简单的Query，传入参数为字符串，应用在最下方
function $(selector) {
    //caller变量指向函数的调用者
    var caller = this;
    //如果在全局下调用则caller指向document
    if (this === window) {
        caller = document;
    }
    //传入的参数
    selector = selector.split(' ');
    for (var i = 0; i < selector.length; i++) {
        var result = getElement.call(caller, selector[i]);
        if (result == null) {
            break;
        }
        caller = result;
    }
    return result;
    //用于获取对应元素的方法
    function getElement(name) {
        //检查传入字符串的首字符，判断选择器类型
        switch (name[0]) {
            //id选择器
            case '#':
                return document.getElementById(name.slice(1));
            //类选择器
            case '.':
                return this.getElementsByClassName(name.slice(1))[0];
            //属性选择器
            case '[': {
                //如果传入的属性有值，则会被保存在value，否则value值为undefined
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
//应用
// 可以通过id获取DOM对象，通过#标示，例如
var element1 = $('#id1'); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
var element2 = $('a'); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
var element3 = $('.class1'); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
var element4 = $('[data-log]'); // 返回第一个包含属性data-log的对象
var element5 = $('[data-time=2015]'); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
var element6 = $('#id1 .efg'); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

//还可以在指定的element下查询元素，例如
var element7 = $.call(element1, '.efg');

for (var i = 1; i < 8; i++) {
    console.log(window['element' + i]);
}