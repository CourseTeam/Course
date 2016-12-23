/**
 * 登录页
 * Created by xuwei on 2016/9/25 0025.
 */

$(function ($) {
    $("#btnLogin").on("click", function () {
        Login();
    });
});

function Login() {
    // var Ticket = eval($.cookie("Ticket")) || false;
    // if (Ticket) {
    //     //window.location.href = "http://www.baidu.com";
    //     return;
    // }
    $.cookie("UserInfo", null, {path: '/'});
    var UserName = $("#UserName").val();
    var Pwd = $("#Pwd").val();

    if (!UserName) {
        layer.open({
            content: '请输入用户名或手机号',
            style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2
        });
        return;
    }
    if (!Pwd) {
        layer.open({
            content: '请输入密码',
            style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2
        });
        return;
    }

    var param = {Tel: UserName, Pwd: $Course.MD5(Pwd)};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Account/Login");
    console.log(result);
    if (result.Msg == "OK") {
        //将用户信息存入Cookie
        $.cookie("UserInfo", $Course.stringify(result.Data), {expires: 7, path: '/'});
        $.cookie("Ticket", result.Data.Ticket, {expires: 7, path: '/'});
        window.location.href = "../Course/CourseList.html";
    } else {
        layer.open({
            content: '用户名或密码错误！请重新输入！',
            style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2
        });
    }
}
