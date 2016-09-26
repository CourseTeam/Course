/**
 * 约课系统公用类
 * Created by xuwei on 2016/9/25 0025.
 */

//启用浏览器跨域
jQuery.support.cors = true;
//测试服务器地址
var ApiUrl = "http://localhost:60182/";

//正式服务器地址
//var ApiUrl = "http://120.26.218.68:1217/";

//用户票据
var Ticket = eval($.cookie("Ticket")) || "";

//重写jquery请求数据方法
(function ($) {
    //1.得到$.ajax的对象
    var _ajax = $.ajax;
    $.ajax = function (options) {
        //2.每次调用发送ajax请求的时候定义默认的error处理方法
        var fn = {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                toastr.error(XMLHttpRequest.responseText, '错误消息', {
                    closeButton: true,
                    timeOut: 0,
                    positionClass: 'toast-top-full-width'
                });
            },
            success: function (data, textStatus) {
            },
            beforeSend: function (XHR) {
            },
            complete: function (XHR, TS) {
            }
        }
        //3.扩展原生的$.ajax方法，返回最新的参数
        var _options = $.extend({}, {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success: function (data, textStatus) {
                fn.success(data, textStatus);
            },
            beforeSend: function (XHR) {
                XHR.setRequestHeader('Authorization', 'BasicAuth ' + Ticket);
                fn.beforeSend(XHR);
            },
            complete: function (XHR, TS) {
                fn.complete(XHR, TS);
            }
        }, options);
        //4.将最新的参数传回ajax对象
        _ajax(_options);
    };
})(jQuery);

//==============================以下为公用脚本==============================

var $Course = {};

//Post请求 返回json
$Course.PostAjaxJson = function (params, url) {
    var json;
    $.ajax({
        url: url, data: params, type: 'post', cache: false, async: false,
        success: function (data) {
            json = data;
        }
    });
    return json;
};

//Get请求 返回json
$Course.GetAjaxJsonGet = function (params, url) {
    var json;
    $.ajax({
        url: url, data: params, type: 'get', cache: false, async: false,
        success: function (data) {
            json = data;
        }
    });
    return json;
};

//讲秒数转换为时分秒格式  02:03:04
$Course.FormatSeconds = function (value) {
    var second = parseInt(value); // 秒
    var minute = 0; // 分
    var hour = 0; // 小时
    if (second >= 60) {
        minute = parseInt(second / 60);
        second = parseInt(second % 60);
        if (minute >= 60) {
            hour = parseInt(minute / 60);
            minute = parseInt(minute % 60);
        }
    }
    var sec = "";
    var result = "";
    if (second == 0) {
        sec = "00";
        result += sec;
    } else {
        if (second >= 10) {
            result += second;
        } else {
            result = result + "0" + second;
        }
    }
    if (minute >= 0) {
        if (minute >= 10) {
            result = "" + parseInt(minute) + ":" + result;
        } else {
            result = "0" + parseInt(minute) + ":" + result;
        }
    }
    if (hour >= 0) {
        if (hour >= 10) {
            result = "" + parseInt(hour) + ":" + result;
        } else {
            result = "0" + parseInt(hour) + ":" + result;
        }
    }
    return result;
};
//时分秒转换成秒
$Course.GetSecond = function (value) {
    var strvalue = "时间格式错误";
    if (value.indexOf(":") > -1) {
        var vrrstr = value.split(':');
        if (vrrstr.length == 3) {
            strvalue = parseInt(vrrstr[0]) * 3600 + parseInt(vrrstr[1]) * 60 + parseInt(vrrstr[2]);
        }
    }
    return strvalue;
}

// 获取url参数
$Course.RequestUrlParams = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return decodeURIComponent(r[2]);
    return null;
}

//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//去除html标签
$Course.DelHtmlTag = function (s) {
    s = s.replace(/<style[^>]*?>[\s\S]*?<\/style>/g, "");    //删除style标签及内容
    s = s.replace(/<style[^>]*?>[\s\S]*?<\/style>/g, "");    //删除script标签及内容
    s = s.replace(/<[^>]+>/g, "");   //删除html标签
    s = s.replace(/&nbsp;/g, "");    //删除&nbsp;
    return s;
}

//条件过滤，返回新的数组
Array.prototype.FilterItem = function (odds) {
    if (odds == -1) {   //-1返回全部
        return this;
    }
    return $.grep(this, function (item, i) {
        var b = 0;
        var c = 0;

        for (var m in odds) {
            b++;  //计算属性的个数
            if (item[m] == odds[m] || odds[m] == -1) {
                c++; //计算符合条件的个数
            }
            //var a = m.split("_");
            //if (a.length > 1) {
            //    if (item[a[0]].indexOf(odds[m]) > -1) {
            //        c++;  //计算符合条件的个数
            //    }
            //} else {
            //    if (item[m] == odds[m] || odds[m] == -1) {
            //        c++; //计算符合条件的个数
            //    }
            //}

        }
        return b == c;  //条件全部满足返回true
    });
}
