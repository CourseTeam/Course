/**
 * 摩英达人
 * Created by wangbin on 2016/11/17.
 */

$(function ($) {
    Is_Consume();
});
function Is_Consume() {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    UserID = UserInfo.UserID;
    var param = {UserID: UserID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/Is_Consume");
    if (result.Msg == "OK") {
        if (result.Data) {
            $("#unStandard").html("");
            if (UserInfo.IsAble == 1) {
                $("#apply").attr("disabled", "disabled");
                $("#apply").removeClass("apply_button");
                $("#apply").addClass("apply_buttondis");
            }
        } else {
            $("#unStandard").html("未达到申请条件");
        }
    }
}

function Able_Apply() {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    UserID = UserInfo.UserID;
    var param = {UserID: UserID};
    var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserInfo_IsAble_Upd");
    if (result.Msg == "OK") {
        var param = {UserID: UserID};
        var result = $Course.GetAjaxJson(param, ApiUrl + "User/GetUserInfoByUserID");
        result.Data.Ticket = UserInfo.Ticket;
        //将用户信息存入Cookie
        $.cookie("UserInfo", $Course.stringify(result.Data), {path: '/'});
        $("#talent").hide();
        $("#becomeTalent").show();
        setTimeout(function () {
            window.location.href = "../PersonalCenter/PersonalCenter.html";
        }, 3000);
    }
}