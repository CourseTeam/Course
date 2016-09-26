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
    var Ticket = eval($.cookie("Ticket")) || false;
    if (Ticket) {
        //window.location.href = "http://www.baidu.com";
        return;
    }
    var UserName = $("#UserName").val();
    var Pwd = $("#Pwd").val();

    if (!UserName) {
        layer.open({
            content: '请输入用户名或手机号',
            style: 'background-color:#00b38a; color:#fff; border:none;',
            time: 2
        });
        return;
    }
    if (!Pwd) {
        layer.open({
            content: '请输入密码',
            style: 'background-color:#00b38a; color:#fff; border:none;',
            time: 2
        });
        return;
    }

    var result = $Course.GetAjaxJsonGet({UserName: UserName, Pwd: Pwd}, ApiUrl + "Account/Login");
    console.log(result);
    if (result.IsSuccess) {
        layer.open({
            content: '登录成功!',
            style: 'background-color:#00b38a; color:#fff; border:none;',
            time: 2
        });
        $.cookie("Ticket", "");
    } else {
        layer.open({
            content: '用户名或密码错误！请重新输入！',
            style: 'background-color:#00b38a; color:#fff; border:none;',
            time: 2
        });
    }
}