// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    //拷贝一个arr副本
    var array = arr.concat();
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
// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(a);
console.log(b); // [1, 3, 5, 7]
