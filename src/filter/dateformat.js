import Vue from 'vue'
Vue.filter('dateformat', function (date) {
    var ago = new Date(date)
    var now = new Date()

    var timediff = now - ago
    if (timediff < 0) {
        return "超前了"
    }
    var minute = 1000 * 60;      //把分，时，天，周，月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;

    var days = parseInt(timediff / day)
    if (days >= 1) {
        var y = ago.getFullYear();
        // es6字符串的新方法.padStart(maxlength,'filling')
        var m = (ago.getMonth() + 1).toString().padStart(2, '0');//最大长度为两位，前面补0
        var d = ago.getDate().toString().padStart(2, '0');
        return `${y}-${m}-${d}`
    }
    var hours = parseInt(timediff / hour)
    if (hours >= 1)
        return `${hours}小时前`

    var minutes = parseInt(timediff / minute)
    if (minutes >= 1)
        return `1小时前`

    return "1小时前"
    

})