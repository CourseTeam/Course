/**
 * 摩英达人
 * Created by wangbin on 2016/11/17.
 */

$ (function ($) {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    UserID = UserInfo.UserID;
    if (UserID != null) {
        Is_Consume(UserID);
    }
    // Is_Consume(1)
});

var UserID = 0;

function Is_Consume(UserID) {
    var param = {UserID: UserID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/Is_Consume");
    console.log(result);
    if (result.Msg == "OK") {
        if (result.Data) {
            $("#unStandard").html("");
        } else {
            $("#unStandard").html("未达到申请条件");
        }
    }
}

function Able_Apply() {
    var param = {UserID: UserID};
    var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserInfo_IsAble_Upd");
    console.log(result);
    if (result.Msg == "OK") {
        var param = {UserID: UserID};
        var result = $Course.GetAjaxJson(param, ApiUrl + "User/GetUserInfoByUserID");
        //$.cookie("UserInfo", 1);
        result.Data.Ticket = UserInfo.Ticket;
        //将用户信息存入Cookie
        $.cookie("UserInfo", $Course.stringify(result.Data), {path: '/'});
        $("#talent").hide();
        $("#becomeTalent").show();
    }
}