/**
 * 修改密码
 * Created by wangbin on 2016/10/3.
 */

var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
var UserID = UserInfo.UserID;
var Pwd = UserInfo.Pwd

$(function ($) {
    $("#changePwd").on("click", function () {
        var oldPwd = $("#oldPwd").val();
        var newPwd = $("#newPwd").val();
        if (oldPwd && newPwd) {
            oldPwd = $Course.MD5(oldPwd);
            newPwd = $Course.MD5(newPwd);
            ChangePwd(oldPwd, newPwd);
        } else {
            layer.open({
                content: '请输入原密码和新密码',
                style: 'background-color:#F24C4C; color:#fff; border:none;',
                time: 2
            });
            return;
        }
    })
});

//修改密码
function ChangePwd(oldPwd, newPwd) {
    var param = {UserID: UserID, OldPwd: oldPwd, Pwd: newPwd}
    var result = $Course.PostAjaxJson(param, ApiUrl + "Account/UserInfo_ChangePwd");
    if (result.Msg == "OK") {
        $.cookie("UserInfo", null, {expires: 30, path: '/'});
        layer.open({
            content: '修改成功',
            // style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2,
            end: function () {
                window.location.href = 'Login.html';
            }
        });
    } else {
        layer.open({
            content: result.Msg,
            time: 2
        });
    }
}