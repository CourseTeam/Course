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
    var PayID = $Course.RequestUrlParams("PayID") || 0;
    if (PayID > 0) {
        Payment_Get();
        $(".del").show();
    }

    $("#btnSave").on("click", function () {
        Payment_Edit();
    });

    $(".del").on("click", function () {
        Payment_Del();
    });
});
//新增或编辑我的银行卡
function Payment_Edit() {
    var PayID = $Course.RequestUrlParams("PayID") || 0;
    var PayNo = $("input[name=PayNo]").val();
    var PayName = $("input[name=PayName]").val();
    var BankType = $("input[name=BankType]").val();
    var IsDefault = $(".isDefault").attr("switch") == "on" ? 1 : 0;
    if (!PayNo) {
        layer.open({content: "请输入银行卡号！"});
        return;
    }
    if (!PayName) {
        layer.open({content: "请输入户主名！"});
        return;
    }
    if (!BankType) {
        layer.open({content: "请输入开户银行！"});
        return;
    }
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {
        UserID: UserInfo.UserID,
        PayID: PayID,
        PayNo: PayNo,
        PayType: 1,
        PayName: PayName,
        BankType: BankType,
        IsDefault: IsDefault
    };

    var result = $Course.PostAjaxJson(param, ApiUrl + "Payment/Payment_Edit");
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

//获取详细信息
function Payment_Get() {
    var PayID = $Course.RequestUrlParams("PayID");
    var param = {PayID: PayID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Payment/Payment_Get");
    if (result.Msg == "OK") {
        $("input[name=PayNo]").val(result.Data.PayNo);
        $("input[name=PayName]").val(result.Data.PayName);
        $("input[name=BankType]").val(result.Data.BankType);
        $(".isDefault").attr("switch", (result.Data.IsDefault == 1 ? "on" : "off"));
        if ($(".isDefault").attr("switch") == "off") {
            $(".isDefault").attr("src", "../../Images/icon_off.png");
        } else {
            $(".isDefault").attr("src", "../../Images/icon_on.png");
        }
    }
}
// 删除我的支付方式
function Payment_Del() {
    layer.open({
        content: "确定要删除吗？", btn: ["确定", "取消"], yes: function () {
            var PayID = $Course.RequestUrlParams("PayID");
            var param = {PayID: PayID};
            var result = $Course.PostAjaxJson(param, ApiUrl + "Payment/Payment_Del");
            if (result.Msg == "OK") {
                layer.open({
                    content: "删除成功！", time: 2, end: function () {
                        window.location.href = "PaymentList.html";
                    }
                });
            }
        }
    });
}