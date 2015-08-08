//兼容低版本浏览器的事件添加函数。
function addEvent(node, event, handler){
    if (!!node.addEventListener) {
        node.addEventListener(event, handler, !1);
    }
    else {
        node.attachEvent('on'+event, handler);
    }
}
//日期填充函数：输入要填充的选择器和日期数，填充列表。
function fillSelect(select, date) {
    // for (var i = select.length - 1; i > 0; i--) {
    //  select.remove(i);
    // }
    select.length = 1; 
    for (var i = 1; i <= date; i++) {
        var option = new Option(i, i);
        select.add(option);
    }
}
//天数判断函数，根据传入的年和月，返回对应天数。
function getDate(year, month) {
    switch (month) {
        case 2: {
            //这几步用于判断是否为闰年
            if (year%400 == 0) {
                return 29;
            }
            if (year%100 == 0) {
                return 28;
            }
            if (year%4 == 0) {
                return 29;
            }
            else return 28;
        }
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
    }
}
var dateForm = document.forms.dateForm;
//这个函数可以根据年份和月来填充日期。
var setDate = function(event) {
    if (dateForm.year.value == 0) {
            dateForm.month.value = 0;
        }
    // var yearValue = parseInt(dateForm.year.value);
    // var monthValue = parseInt(dateForm.month.value);
    var yearValue = +dateForm.year.value;
    var monthValue = +dateForm.month.value;
    var dateNumber = getDate(yearValue, monthValue);
    fillSelect(dateForm.date, dateNumber);
}

//监听年的change事件。一旦变化则重新填充日期列表
addEvent(dateForm.year, 'change', setDate);
//监听月的change事件。同上
addEvent(dateForm.month, 'change', setDate);