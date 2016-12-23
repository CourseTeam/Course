/**
 * Created by wangbin on 2016/12/22.
 */

$(function ($) {
    PaymentData();
    MaxMoney();
    $("#withdraw_add").click(Withdraw_ADD);
    $("#allwithdraw").click(AllWithdraw);
});

var PayID = 0;
var maxMoney = 0;

function PaymentData() {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {UserID: UserInfo.UserID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Payment/Payment_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        if (result.Data.length) {
            var bankListHtml = "";
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                    bankListHtml += '<div class="bank_num" onclick="Default_Payment('+ row.PayID +', ' + row.PayNo + ')">';
                    bankListHtml += '    <div class="col-xs-3">银行卡号:</div>';
                    bankListHtml += '    <div class="col-xs-9">' + row.PayNo + '</div>';
                    bankListHtml += '</div>';
                if (row.IsDefault == 1) {
                    PayID = row.PayID;
                    strHtml += '<div class="col-xs-3" style="color: #ffffff;font-size: 16px">银行卡号:</div>';
                    strHtml += '<div class="col-xs-7" style="color: #ffffff;font-size: 16px" id="payno">' + row.PayNo + '</div>';
                    strHtml += '<div class="col-xs-2 text-right" style="color: #fff;">';
                    strHtml += '    <img class="more" src="../../Images/payment/more.png"/>';
                    strHtml += '</div>';
                    $("#checked_bank").click(Payment_List);
                }
            }
            bankListHtml += '<div class="manage">管理银行卡</div>';
            $("#bank_list").html(bankListHtml);
        } else {
            strHtml += '<div class="col-xs-2">';
            strHtml += '    <img class="addBank" src="../../Images/payment/addBank.png"/>';
            strHtml += '</div>';
            strHtml += '    <div class="col-xs-8" style="color: #fff;font-size: 16px">';
            strHtml += '    新增银行卡';
            strHtml += '</div>';
            strHtml += '    <div class="col-xs-2 text-right" style="color: #fff;">';
            strHtml += '    <img class="more" src="../../Images/payment/more.png"/>';
            strHtml += '</div>';
            $("#checked_bank").click();
        }
        $("#checked_bank").html(strHtml);
    }
}

// 最高可提现
function MaxMoney() {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    console.log(UserInfo);
    var result = $Course.GetAjaxJson({}, ApiUrl + "SysConfig/SysConfig_Default");
    console.log(result);
    for (var i = 0;i < result.Data.length; i++) {
        var config = result.Data[i];
        if (config.IsEnabled) {
            maxMoney = UserInfo.Integral / config.IntegralAndMoneyScale;
        }
    }
    $("#maxmoney").html("最高可提现￥" + maxMoney);
}

// 全部提现
function AllWithdraw() {
    $("#money").val(maxMoney);
}

// 选择银行卡
function Default_Payment(Pay_ID, Pay_No) {
    PayID = Pay_ID;
    $("#payno").html(Pay_No);
    $("#bank_list").hide();
    $("#payment").show();
}

// 银行卡列表
function Payment_List() {
    $("#bank_list").show();
    $("#payment").hide();
}

// 提现操作
function Withdraw_ADD() {
    var money = $("#money").val();
    if (money == null) {
        layer.open({content: "请填写提现金额"});
        return;
    }
    if (money < 1000) {
        layer.open({content: "每次提现不得少于1000元!"});
        return;
    }
    if (money > maxMoney) {
        $("#overrun").show();
        $("#not_overrun").hide();
        return;
    }

    console.log(money);
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {UserID: UserInfo.UserID, PayID: PayID, Money: money};
    var result = $Course.PostAjaxJson(param, ApiUrl + "Withdraw/Withdraw_ADD");
    console.log(result);
    if (result.Msg == "OK") {
        $("#payment").hide();
        $("#succeed").show();
    } else {
        layer.open({content: result.Msg, time: 2});
    }

}