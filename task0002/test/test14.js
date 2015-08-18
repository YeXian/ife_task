// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var version = window.navigator.userAgent.indexOf('Trident');
    if (version != -1) {
        var versionEnd = window.navigator.userAgent.indexOf(';', version);
        version = window.navigator.userAgent.substring(version, versionEnd);
    }
    return version;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue);
    if (expiredays instanceof Date) {
        cookieText += '; expires=' + expiredays.toGMTString();
    }
    document.cookie = cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    var name = encodeURIComponent(cookieName) + '=';
    var cookieStart = document.cookie.indexOf(name);
    var cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';' ,cookieStart);
        //当cookie值在cookie最后一项时，末尾是没有';'号的，这是为了防止这种情况下返回值出错。
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + name.length, cookieEnd));
    }
    return cookieValue;
}
