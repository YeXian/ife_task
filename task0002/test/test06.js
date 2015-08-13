// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    var array = [];
    array.forEach.call(arr, fn);
}

// 其中fn函数可以接受两个参数：item和index
// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index, array) {
    console.log(index + ': ' + item);
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html