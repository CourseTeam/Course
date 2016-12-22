/**
 * Created by xuwei on 2016/12/21.
 */

$(function ($) {
    Payment_List();
    $("#btnAdd").on("click", function () {
        window.location.href = "PaymentEdit.html";
    });
});

function Payment_List() {
    var result = $Course.GetAjaxJson({UserID: $Course.parseJSON($.cookie("UserInfo")).UserID}, ApiUrl + "Payment/Payment_List");
    if (result.Msg == "OK") {
        if (result.Data.length > 0) {
            var strHtml = "";
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                var top = i == 0 ? 10 : 20;
                var defaultimg = row.IsDefault == 1 ? "../../Images/icon_selected.png" : '../../Images/icon_unselected.png';
                strHtml += '<div class="row itembg btr" style="margin-top: ' + top + 'px;">';
                strHtml += '    <div class="col-xs-3 pdr0">银行卡号:</div>';
                strHtml += '    <div class="col-xs-9">' + row.PayNo + '</div>';
                strHtml += '</div>';
                strHtml += '<div class="row itembg" style="margin-top: 1px;">';
                strHtml += '    <div class="col-xs-3 pdr0">开户行:</div>';
                strHtml += '    <div class="col-xs-9">' + row.BankType + '</div>';
                strHtml += '</div>';
                strHtml += '<div class="row itembg" style="margin-top: 1px;">';
                strHtml += '    <div class="col-xs-3 pdr0">姓名:</div>';
                strHtml += '    <div class="col-xs-9">' + row.PayName + '</div>';
                strHtml += '</div>';
                strHtml += '<div class="row itembg bbr" style="margin-top: 1px;height: 40px;line-height: 40px;">';
                strHtml += '    <div class="col-xs-4 pdr0">';
                strHtml += '         <img src="' + defaultimg + '" onclick="Payment_Default_Set(' + row.PayID + ')" height="18" width="18"/> <span style=" vertical-align: middle;"> 设为默认</span>';
                strHtml += '    </div>';
                strHtml += '    <div class="col-xs-8 text-right F24C4C">';
                strHtml += '       <span onclick="Payment_Edit(' + row.PayID + ')">编辑</span><span onclick="Payment_Del(' + row.PayID + ')">删除</span>';
                strHtml += '    </div>';
                strHtml += '</div>';
            }
            $("#payList").html(strHtml);
        }
    }
}

function Payment_Edit(PayID) {
    window.location.href = "PaymentEdit.html?PayID=" + PayID;
}

function Payment_Del(PayID) {
    layer.open({
        content: "确定要删除吗？", btn: ["确定", "取消"], yes: function () {
            var result = $Course.PostAjaxJson({PayID: PayID}, ApiUrl + "Payment/Payment_Del");
            if (result.Msg == "OK") {
                layer.closeAll();
                Payment_List();
            }
        }
    });
}

function Payment_Default_Set(PayID) {
    var result = $Course.PostAjaxJson({PayID: PayID}, ApiUrl + "Payment/Payment_Default_Set");
    if (result.Msg == "OK") {
        layer.closeAll();
        Payment_List();
    }
}