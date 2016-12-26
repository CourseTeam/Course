/**
 * Created by wangbin on 2016/12/20.
 */

$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    $("#btnSearch").on("click", function () {
        Withdraw_List();
    });
    $("#Select").on("change", function () {
        Withdraw_List();
    });
    $("#btnImport").on("click", function () {
        window.location.href = ApiUrl + "File/WithdrawList_Excel";
    });
    Withdraw_List();
});

var PageIndex = 1;
var PageSize = 10;

//课程列表
function Withdraw_List() {
    var SearchKey = $("#SearchKey").val();
    var Status = $("#Select").val();
    var param = {SearchKey: SearchKey, Status: Status, PageIndex: PageIndex, PageSize: PageSize};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Withdraw/Withdraw_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row ">';
        strHtml += '        <div class="col-lg-2">提现人</div>';
        strHtml += '        <div class="col-lg-2">支付银行</div>';
        strHtml += '        <div class="col-lg-2">卡号</div>';
        strHtml += '        <div class="col-lg-1">提现数额</div>';
        strHtml += '        <div class="col-lg-2">提现人手机</div>';
        strHtml += '        <div class="col-lg-1">状态</div>';
        strHtml += '        <div class="col-lg-2">操作</div>';
        strHtml += '    </div> ';
        strHtml += '</li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row">';
                strHtml += '        <div class="col-lg-2">' + row.PayName + '</div>';
                strHtml += '        <div class="col-lg-2">' + row.BankType + '</div>';
                strHtml += '        <div class="col-lg-2">' + row.PayNo + '</div>';
                strHtml += '        <div class="col-lg-1">' + row.Money + '</div>';
                strHtml += '        <div class="col-lg-2">' + row.Account + '</div>';
                strHtml += '        <div class="col-lg-1">' + Withdraw_Status(row.Status) + '</div>';
                strHtml += '        <div class="col-lg-2">';
                strHtml += '            <button class="autobutton" onclick="Withdraw_Finish(' + row.WithID + ')">编辑状态</button>';

                // if (row.Status == 1) {
                //     strHtml += '            <button class="autobutton" onclick="Withdraw_Finish(' + row.WithID + ')">编辑状态</button>';
                // } else {
                //     strHtml += '            <button class="autobutton" style="background-color: gainsboro">已提现</button>';
                // }
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }
            laypage({
                cont: $("#Page"), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: Math.ceil(result.Data[0].RowsCount / 10), //通过后台拿到的总页数
                curr: PageIndex || 1, //当前页,
                skip: true, //是否开启跳页
                skin: '#AF0000',
                groups: 3, //连续显示分页数
                jump: function (obj, first) { //触发分页后的回调
                    //alert(obj.curr)
                    if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                        PageIndex = obj.curr;
                        Withdraw_List();
                    }
                }
            });
        }
        $("#course_list").html(strHtml);
    }
}

function Withdraw_Status(status) {
    switch (status) {
        case 1:
            return "审核中";
            break;
        case 2:
            return "审核成功";
            break;
        case 3:
            return "已汇款";
            break;
        case 4:
            return "失败";
            break;
    }
}

function Withdraw_Finish(WithID) {
    layer.open({
        type: 1,
        skin: "layui-layer-molv",
        title: "编辑状态",
        content: '<div style="padding: 10px 30px;"><select id="role"><option value="2">审核成功</option><option value="3">已汇款</option><option value="4">失败</option></select></div>',
        btn: ["确定", "取消"],
        area: ["250px", "160px"],
        yes: function (index) {
            var param = {WithID: WithID, Status: $("#role").val()};
            console.log(param);
            var result = $Course.PostAjaxJson(param, ApiUrl + "Withdraw/Withdraw_Status_Upd");
            if (result.Msg == "OK") {
                layer.msg("修改成功", {icon: 1, time: 2000}, function () {
                    Withdraw_List();
                    layer.closeAll();
                })
            }
        }
    });
}