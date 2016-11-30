/**
 * 新增/编辑收货地址界面
 * Created by wangbin on 2016/11/22.
 */

$ (function ($) {
    var DeliveryID = $Course.RequestUrlParams("DeliveryID");
    if (DeliveryID != null) {
        Address_Detials(DeliveryID);
    } else {
        $("#delAddress").hide();
    }
    // Address_Detials(1);
});

function Address_Detials(DeliveryID) {
    var param = {DeliveryID: DeliveryID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "DeliveryAddress/DeliveryAddress_Detail");
    console.log(result);
    $("#userName").val(result.Data.UserName);
    $("#phone").val(result.Data.Phone);
    $("#address").val(result.Data.Address);
    if (result.Data.IsDefault == 1) {
        $("#addressCheckbox").attr("checked", 'true');
    }
}

function Address_Save() {
    var UserID = $Course.parseJSON($.cookie("UserInfo")).UserID;
    var DeliveryID = $Course.RequestUrlParams("DeliveryID") || 0;
    var UserName = $("#userName").val();
    var Phone = $("#phone").val();
    var Address = $("#address").val();
    var IsDefault = $("#addressCheckbox").is(":checked") ? 1 : 0;

    if (!UserName) {
        layer.msg("请填写收货人姓名！", {icon: 2, time: 2000});
        return;
    }
    if (!Phone) {
        layer.msg("请填写联系电话！", {icon: 2, time: 2000});
        return;
    }
    if (!Address) {
        layer.msg("请填写收货地址！", {icon: 2, time: 2000});
        return;
    }

    var param = {
        UserID: UserID,
        DeliveryID: DeliveryID,
        UserName: UserName,
        Phone: Phone,
        Address: Address,
        IsDefault: IsDefault
    };
    console.log(param);
    var result = $Course.PostAjaxJson(param, ApiUrl + "DeliveryAddress/DeliveryAddress_Edit");
    console.log(result);
    if (result.Msg == "OK") {
        window.location.href = "javascript:history.go(-1);location.reload()";
    }
}

//删除收货地址
function DeliveryAddress_Del() {
    var DeliveryID = $Course.RequestUrlParams("DeliveryID");
    layer.open({
        content: "确定要删除吗？",
        btn: ["确 定", "取 消"],
        yes: function () {
            var url = ApiUrl + "DeliveryAddress/DeliveryAddress_Del";
            var param = {DeliveryID: DeliveryID};
            var result = $Course.PostAjaxJson(param, url);
            if (result.Msg == "OK" && result.Data) {
                // 跳转
            }
            layer.closeAll();
        },
        no: function () {

        }
    });
}