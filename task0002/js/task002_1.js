function handler (event) {
    var str = $('#text').value;
    //用一段正则分割字符串
    str = str.split(/[\s|，|,|、|;|；]/);
    //去除空字符串
    var i = 0;
    while (i < str.length) {
        if (str[i] === '') {
            str.splice(i, 1);
            continue;
        }
        i = i + 1;
    }
    uniqArray(str);
    console.log(str);
    $('p').textContent = '您的爱好有：' + str;
}
$.on('button', 'click', handler);