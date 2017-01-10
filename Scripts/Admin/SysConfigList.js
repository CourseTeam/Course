/**
 * 系统配置
 * Created by wangbin on 2016/11/25.
 */

$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    SysConfig_List();
});

var PageIndex = 1;
var OrderID = 0;

function SysConfig_List() {
    var param = {};
    var result = $Course.GetAjaxJson(param, ApiUrl + "SysConfig/SysConfig_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                var reg = GetIntegral(row.RegIntegral);
                var zero = GetIntegral(row.ZeroPhaseIntegral);
                var one = GetIntegral(row.OnePhaseIntegral);
                var two = GetIntegral(row.TwoPhaseIntegral);
                var three = GetIntegral(row.ThreePhaseIntegral);
                var four = GetIntegral(row.FourPhaseIntegral);
                strHtml += '<div class="col-sm-6">';
                if (row.IsEnabled) {
                    strHtml += '    <ul class="list-group text-center" id="' + row.SysID + '" style="border: 3px solid #00b38a">';
                } else {
                    strHtml += '    <ul class="list-group text-center" id="' + row.SysID + '" style="border: 3px solid #c0c0c0">';
                }
                strHtml += '        <li class="list-group-item header">';
                strHtml += '            <div class="row">';
                strHtml += '                <div class="col-xs-3">积分类别</div>';
                strHtml += '                <div class="col-xs-3">被推荐人</div>';
                strHtml += '                <div class="col-xs-3">一级推荐人</div>';
                strHtml += '                <div class="col-xs-3">二级推荐人</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
                strHtml += '        <li class="list-group-item">';
                strHtml += '            <div class="row">';
                strHtml += '                <div class="col-xs-3">推荐积分</div>';
                strHtml += '                <div class="col-xs-3">' + reg.m + '</div>';
                strHtml += '                <div class="col-xs-3">' + reg.y + '</div>';
                strHtml += '                <div class="col-xs-3">' + reg.t + '</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
                strHtml += '        <li class="list-group-item">';
                strHtml += '            <div class="row">';
                strHtml += '                <div class="col-xs-3">单一课程</div>';
                strHtml += '                <div class="col-xs-3">' + zero.m + '</div>';
                strHtml += '                <div class="col-xs-3">' + zero.y + '</div>';
                strHtml += '                <div class="col-xs-3">' + zero.t + '</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
                strHtml += '        <li class="list-group-item">';
                strHtml += '            <div class="row">';
                strHtml += '                <div class="col-xs-3">一阶课程</div>';
                strHtml += '                <div class="col-xs-3">' + one.m + '</div>';
                strHtml += '                <div class="col-xs-3">' + one.y + '</div>';
                strHtml += '                <div class="col-xs-3">' + one.t + '</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
                strHtml += '        <li class="list-group-item">';
                strHtml += '            <div class="row">';
                strHtml += '                <div class="col-xs-3">二阶课程</div>';
                strHtml += '                <div class="col-xs-3">' + two.m + '</div>';
                strHtml += '                <div class="col-xs-3">' + two.y + '</div>';
                strHtml += '                <div class="col-xs-3">' + two.t + '</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
                strHtml += '        <li class="list-group-item">';
                strHtml += '            <div class="row">';
                strHtml += '                <div class="col-xs-3">三阶课程</div>';
                strHtml += '                <div class="col-xs-3">' + three.m + '</div>';
                strHtml += '                <div class="col-xs-3">' + three.y + '</div>';
                strHtml += '                <div class="col-xs-3">' + three.t + '</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
                strHtml += '        <li class="list-group-item">';
                strHtml += '            <div class="row">';
                strHtml += '                <div class="col-xs-3">四阶课程</div>';
                strHtml += '                <div class="col-xs-3">' + four.m + '</div>';
                strHtml += '                <div class="col-xs-3">' + four.y + '</div>';
                strHtml += '                <div class="col-xs-3">' + four.t + '</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
                strHtml += '        <li class="list-group-item" style="border-top: 4px solid #c0c0c0">';
                strHtml += '            <div class="row">';
                strHtml += '                <div class="col-xs-4"><strong>积分提现比例</strong></div>';
                strHtml += '                <div class="col-xs-2">' + row.IntegralAndWithdrawScale + '：1</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
                strHtml += '        <li class="list-group-item" style="border-top: 4px solid #c0c0c0">';
                strHtml += '            <div class="row">';
                strHtml += '                <div class="col-xs-4"><strong>积分兑换课程比例</strong></div>';
                strHtml += '                <div class="col-xs-2"><strong>' + row.IntegralAndMoneyScale + '：1</strong></div>';
                strHtml += '                <div class="col-xs-6 text-right">';
                strHtml += '                    <button class="autobutton" onclick="SysConfig_Edit(' + row.SysID + ')">编辑</button>';
                strHtml += '                    <button class="autobutton" onclick="SysConfig_Del(' + row.SysID + ')">删除</button>';
                if (!row.IsEnabled) {
                    strHtml += '                    <button class="autobutton" onclick="SysConfig_Default(' + row.SysID + ')">设为默认</button>';
                }
                strHtml += '                </div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
                strHtml += '    </ul>';
                strHtml += '</div>';
            }
        }
        $("#sysConfig_list").html(strHtml);
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

// 编辑系统配置
function SysConfig_Edit(SysID) {
    window.location.href = "SysConfigEdit.html?SysID=" + SysID + "";
}

// 设置默认的系统配置
function SysConfig_Default(SysID) {
    var param = {
        SysID: SysID
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "SysConfig/SysConfig_Default_Set");
    if (result.Msg == "OK") {
        SysConfig_List();
    }
}

// 删除系统配置
function SysConfig_Del(SysID) {
    layer.open({
        content: "确定要删除吗？",
        btn: ["确 定", "取 消"],
        yes: function () {
            var url = ApiUrl + "SysConfig/SysConfig_Del";
            var param = {SysID: SysID};
            var result = $Course.PostAjaxJson(param, url);
            if (result.Msg == "OK" && result.Data) {
                SysConfig_List();
            }
            layer.closeAll();
        },
        no: function () {

        }
    });
}