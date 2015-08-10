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

//应用
var element = document.getElementsByClassName('abc')[0];
var element2 = document.getElementById('li1');
var element3 = document.getElementById('li2');
addClass(element, 'one two three');
removeClass(element, 'abc two');
console.log(isSiblingNode(element2, element3));
console.log(getPosition(element2));