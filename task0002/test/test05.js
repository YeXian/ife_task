// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}
// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'