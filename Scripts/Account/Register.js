/**
 * Created by xuwei on 2016/9/29 0029.
 */

$(function ($) {
    //发送验证码
    $("#btnSendSMS").on("click", function () {
        GetSMSCode();
    });

    //注册
    $("#btnReg").on("click",function () {
        Register();
    })
});

var VerificationCode = 0;
//获取验证码
function GetSMSCode() {
    var PhoneNum = $("#Phone").val();
    if (!PhoneNum) {
        layer.open({
            content: '请输入手机号',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time:2
        });
        return;
    }
    if (PhoneNum.length < 11) {
        layer.open({
            content: '请输入正确的手机号',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time:2
        });
        return;
    }

    var param = {Phone: PhoneNum, Type: 1};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Account/GetSMSCode");
    if (result.Msg == "OK") {
        VerificationCode = result.Data;
    }
}
//注册
function Register() {
    var PhoneNum = $("#Phone").val();
    if (!PhoneNum) {
        layer.open({
            content: '请输入手机号',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time:2
        });
        return;
    }
    if (PhoneNum.length < 11) {
        layer.open({
            content: '请输入正确的手机号',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time:2
        });
        return;
    }
    var _VerificationCode = $("#VerificationCode").val();
    if (VerificationCode != _VerificationCode) {
        layer.open({
            content: '验证码错误!',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time:2
        });
        return;
    }
    var Pwd = $("#Pwd").val();
    if (!Pwd) {
        layer.open({
            content: '请输入密码！',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time:2
        });
        return;
    }
    Pwd = $Course.MD5(Pwd);
    var param = {Phone: PhoneNum, Pwd: Pwd};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Account/Register");
    if (result.Msg == "OK") {
        window.location.href = "Login.html";
    }
}