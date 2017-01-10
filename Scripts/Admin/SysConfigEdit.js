/**
 * 新增/编辑系统配置
 * Created by wangbin on 2016/11/25.
 */

$(function ($) {
    $("#header").load("../Commen/header.html");
    $("#btnSave").on("click", function () {
        SysConfig_Edit();
    });
    SysID = $Course.RequestUrlParams("SysID");
    if (SysID != null) {
        SysConfigDetails_Get(SysID);
    }
    //IntegralAndWithdrawScale
    // SysConfigDetails_Get(1)
});

var SysID = 1;

function SysConfigDetails_Get(SysID) {
    var param = {SysID: SysID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "SysConfig/SysConfig_Details");
    console.log(result);
    if (result.Msg == "OK") {
        var row = result.Data;
        var reg = GetIntegral(row.RegIntegral);
        var zero = GetIntegral(row.ZeroPhaseIntegral);
        var one = GetIntegral(row.OnePhaseIntegral);
        var two = GetIntegral(row.TwoPhaseIntegral);
        var three = GetIntegral(row.ThreePhaseIntegral);
        var four = GetIntegral(row.FourPhaseIntegral);
        var IsEnabled = result.Data.IsEnabled;
        if (IsEnabled) {
            $("#IsEnabled").attr("checked", 'true');
        }
        $("#IntegralAndMoneyScale").val(row.IntegralAndMoneyScale);
        $("#RegIntegral_m").val(reg.m);
        $("#RegIntegral_y").val(reg.y);
        $("#RegIntegral_t").val(reg.t);
        $("#ZeroPhaseIntegral_m").val(zero.m);
        $("#ZeroPhaseIntegral_y").val(zero.y);
        $("#ZeroPhaseIntegral_t").val(zero.t);
        $("#OnePhaseIntegral_m").val(one.m);
        $("#OnePhaseIntegral_y").val(one.y);
        $("#OnePhaseIntegral_t").val(one.t);
        $("#TwoPhaseIntegral_m").val(two.m);
        $("#TwoPhaseIntegral_y").val(two.y);
        $("#TwoPhaseIntegral_t").val(two.t);
        $("#ThreePhaseIntegral_m").val(three.m);
        $("#ThreePhaseIntegral_y").val(three.y);
        $("#ThreePhaseIntegral_t").val(three.t);
        $("#FourPhaseIntegral_m").val(four.m);
        $("#FourPhaseIntegral_y").val(four.y);
        $("#FourPhaseIntegral_t").val(four.t);
        $("#IntegralAndWithdrawScale").val(row.IntegralAndWithdrawScale);
    }
}

function SysConfig_Edit() {
    var IntegralAndMoneyScale = $("#IntegralAndMoneyScale").val();
    var IntegralAndWithdrawScale = $("#IntegralAndWithdrawScale").val();
    var RegIntegral = 'm*' + $("#RegIntegral_m").val() + ',' + 'y*' + $("#RegIntegral_y").val() + ',' + 't*' + $("#RegIntegral_t").val();
    var ZeroPhaseIntegral = 'm*' + $("#ZeroPhaseIntegral_m").val() + ',' + 'y*' + $("#ZeroPhaseIntegral_y").val() + ',' + 't*' + $("#ZeroPhaseIntegral_t").val();
    var OnePhaseIntegral = 'm*' + $("#OnePhaseIntegral_m").val() + ',' + 'y*' + $("#OnePhaseIntegral_y").val() + ',' + 't*' + $("#OnePhaseIntegral_t").val();
    var TwoPhaseIntegral = 'm*' + $("#TwoPhaseIntegral_m").val() + ',' + 'y*' + $("#TwoPhaseIntegral_y").val() + ',' + 't*' + $("#TwoPhaseIntegral_t").val();
    var ThreePhaseIntegral = 'm*' + $("#ThreePhaseIntegral_m").val() + ',' + 'y*' + $("#ThreePhaseIntegral_y").val() + ',' + 't*' + $("#ThreePhaseIntegral_t").val();
    var FourPhaseIntegral = 'm*' + $("#FourPhaseIntegral_m").val() + ',' + 'y*' + $("#FourPhaseIntegral_y").val() + ',' + 't*' + $("#FourPhaseIntegral_t").val();

    var IsEnabled = $("#IsEnabled").is(":checked") ? 1 : 0;

    $("input[type=text]").each(function () {
        if ($(this).val() == "") {
            layer.msg("请将所有数据填写完整！", {icon: 2, time: 2000});
            return;
        }
    });

    var param = {
        SysID: SysID,
        IsEnabled: IsEnabled,
        IntegralAndMoneyScale: IntegralAndMoneyScale,
        IntegralAndWithdrawScale: IntegralAndWithdrawScale,
        RegIntegral: RegIntegral,
        ZeroPhaseIntegral: ZeroPhaseIntegral,
        OnePhaseIntegral: OnePhaseIntegral,
        TwoPhaseIntegral: TwoPhaseIntegral,
        ThreePhaseIntegral: ThreePhaseIntegral,
        FourPhaseIntegral: FourPhaseIntegral
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "SysConfig/SysConfig_Edit");
    console.log(result);
    console.log(SysID);
    if (result.Msg == "OK") {
        // SysConfigDetails_Get(SysID);
        window.location.href = "SysConfigList.html";
    }
}

function GetIntegral(str) {
    var arr = str.split(",");
    var flag = {};
    for (var i = 0; i < arr.length; i++) {
        flag[arr[i].split("*")[0]] = arr[i].split("*")[1];
    }
    return flag;
}