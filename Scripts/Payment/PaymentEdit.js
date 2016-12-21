/**
 * Created by xuwei on 2016/12/21.
 */

$(function ($) {
    $(".isDefault").on("click", function () {
        if ($(this).attr("switch") == "off") {
            $(this).attr("switch", "on");
            $(this).attr("src", "../../Images/icon_on.png");
        } else {
            $(this).attr("switch", "off");
            $(this).attr("src", "../../Images/icon_off.png");
        }
    });

    $("#btnSave").on("click", function () {
        Payment_Edit();
    });
});
//新增或编辑我的银行卡
function Payment_Edit() {
    var PayID = $Course.RequestUrlParams("PayID") || 0;
    var PayNo = $("input[name=PayNo]").val();
    var PayName = $("input[name=PayName]").val();
    var BankType = $("input[name=BankType]").val();
    var IsDefault = $(".isDefault").attr("switch") == "on" ? 1 : 0;
    var param = {
        PayID: PayID,
        PayNo: PayNo,
        PayName: PayName,
        BankType: BankType,
        IsDefault: IsDefault
    };
    var result = $Course.PostAjaxJson(param, AppUrl + "Payment/Payment_Edit");
    if (result.Msg == "OK") {
        layer.open({
            content: "保存成功！", time: 2, end: function () {
                var ReturnUrl = $Course.RequestUrlParams("ReturnUrl");
                if (ReturnUrl != null) {
                    window.location.href = ReturnUrl;
                } else {
                    window.location.href = "PaymentList.html";
                }
            }
        })
    }
}