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

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ['hello', 'hi'],
        b2: 'JavaScript',
        b3: {name: 'object'}
    },
    c: ['1', 'abc']
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);
//改变原始对象的属性
srcObj.a = 2;
srcObj.b.b1[0] = 'Hello';
srcObj.b.b3.name = '';
//在控制台打印原始对象和它的属性
console.log(abObj.a);
console.log(abObj.b.b1[0]);
console.log(abObj);
//在控制台打印复制的对象和它的属性，可以看到复制的对象和更改属性前的原始对象一样。
console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
console.log(tarObj);
