/**
 * 后台管理系统登录页面
 * Created by wangbin on 2016/10/12.
 */
$(document).ready(function () {
    $("#Login").on("click", function () {
       Login();
    });
});

function Login() {
    var ManagerAccout = $("#ManagerAccout").val();
    var ManagerPwd = $("#ManagerPwd").val();

    if (!ManagerAccout) {
        layer.open({
            content: '请输入管理员账号',
            style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2000
        });
        return;
    }
    if (!ManagerPwd) {
        layer.open({
            content: '请输入密码',
            style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2000
        });
        return;
    }

    var param = {Tel: ManagerAccout, Pwd: $Course.MD5(ManagerPwd)};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Account/Login");
    console.log(result);
    if (result.IsSuccess) {
        // $.cookie("UserInfo", null, {expires: 30, path: '/'});
        $.cookie("UserInfo", $Course.stringify(result.Data), {expires: 30, path: '/'});
        window.location.href = "../Course/CourseList.html";
    } else {
        layer.open({
            content: '用户名或密码错误！请重新输入！',
            style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2000
        });
    }
}