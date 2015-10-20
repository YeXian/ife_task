// 学习正则表达式
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var pattern = /^\w+[\w|\.|\-]{3,}@[A-Za-z0-9]{2,}(\.[A-Za-z0-9]{2,3}){1,3}$/;
    return pattern.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^0?(13\d|15[012356789]|18[0-9]|17[678]|14[57])\d{8}$/;
    return pattern.test(phone);
}
var phone = '15875632451';
console.log(isMobilePhone(phone));
var mail = 'yesdazsad@qq.com';
console.log(isEmail(mail));