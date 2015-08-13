// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return arr instanceof Array;
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn == 'function';
}
var arr = function() {};
console.log(isArray(arr));
console.log(isFunction(arr));
