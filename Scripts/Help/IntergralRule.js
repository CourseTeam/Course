/**
 * 获取积分规则
 * Created by wangbin on 2017/1/10.
 */

$(function ($) {
    SysConfig_Default();
});

function SysConfig_Default() {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var result = $Course.GetAjaxJson({}, ApiUrl + "SysConfig/SysConfig_Default");
    // console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        var data = result.Data[0];
        var reg = GetIntegral(data.RegIntegral);
        var zero = GetIntegral(data.ZeroPhaseIntegral);
        var one = GetIntegral(data.OnePhaseIntegral);
        var two = GetIntegral(data.TwoPhaseIntegral);
        var three = GetIntegral(data.ThreePhaseIntegral);
        var four = GetIntegral(data.FourPhaseIntegral);
        strHtml += '<li class="list-group-item">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-4">积分类型</div>';
        strHtml += '        <div class="col-xs-4">被推荐人</div>';
        strHtml += '        <div class="col-xs-4">推荐人</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        strHtml += '<li class="list-group-item">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-4">推荐积分</div>';
        strHtml += '        <div class="col-xs-4">' + reg.m + '</div>';
        strHtml += '        <div class="col-xs-4">' + reg.y + '</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        strHtml += '<li class="list-group-item">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-4">单一课程</div>';
        strHtml += '        <div class="col-xs-4">' + zero.m + '</div>';
        strHtml += '        <div class="col-xs-4">' + zero.y + '</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        strHtml += '<li class="list-group-item">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-4">一阶课程</div>';
        strHtml += '        <div class="col-xs-4">' + one.m + '</div>';
        strHtml += '        <div class="col-xs-4">' + one.y + '</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        strHtml += '<li class="list-group-item">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-4">二阶课程</div>';
        strHtml += '        <div class="col-xs-4">' + two.m + '</div>';
        strHtml += '        <div class="col-xs-4">' + two.y + '</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        strHtml += '<li class="list-group-item">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-4">三阶课程</div>';
        strHtml += '        <div class="col-xs-4">' + three.m + '</div>';
        strHtml += '        <div class="col-xs-4">' + three.y + '</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        strHtml += '<li class="list-group-item">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-4">四阶课程</div>';
        strHtml += '        <div class="col-xs-4">' + four.m + '</div>';
        strHtml += '        <div class="col-xs-4">' + four.y + '</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        $("#integralList").html(strHtml);
    }
}

// 将组合的数据进行分组处理
function GetIntegral(str) {
    var arr = str.split(",");
    var flag = {};
    for (var i = 0; i < arr.length; i++) {
        flag[arr[i].split("*")[0]] = arr[i].split("*")[1];
    }
    return flag;
}
