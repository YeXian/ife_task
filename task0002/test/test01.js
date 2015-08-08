// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    if (arr instanceof Array) {
        return true;
    }
    return false;
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    if (typeof fn == 'function') {
        return true;
    }
    return false;
}
var arr = function() {};
console.log(isArray(arr));
console.log(isFunction(arr));
