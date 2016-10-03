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
<<<<<<< HEAD
    var param = {Tel: UserName, Pwd: $Course.MD5(Pwd)};
=======
    var param = {Tel: UserName, Pwd: Pwd};
>>>>>>> develop
    var result = $Course.GetAjaxJson(param, ApiUrl + "Account/Login");
    console.log(result);
    if (result.IsSuccess) {
        // layer.open({
        //     content: '登录成功!',
        //     style: 'background-color:#F24C4C; color:#fff; border:none;',
        //     time: 2
        // });
        //将用户信息存入Cookie
        $.cookie("UserInfo", $Course.stringify(result.Data), {expires: 30, path: '/'});
        window.location.href = "../Appointment/CourseList.html";
    } else {
        layer.open({
            content: '用户名或密码错误！请重新输入！',
            style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2
        });
    }
}
//
// layer.open({
//     title:"nihao",
//     content: '<input type="text" id="MM" >',
//     style: 'background-color:#fff; border:1px solid #000;',
//     time: 10,
//     btn:["确定","取消"],
//     yes:function (index) {
//         alert($("#MM").val())
//         layer.close(index);
//     },
//     no:function () {
//         alert("取消了")
//     }
// });
function CourseType_Edit() {
    var result = $Course.PostAjaxJson({CourseTypeID: 0, CourseTypeName: 11111, Type: 1},ApiUrl + "CourseType/CourseType_Edit");
    console.log(result);
}
// CourseType_Edit();
