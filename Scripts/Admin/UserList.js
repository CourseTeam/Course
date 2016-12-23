/**
 * Created by waylen on 2016/10/5.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    var UserID = $Course.RequestUrlParams("UserID");

    $("#btnSearch").on("click", function () {
        User_list();
    });
    User_list();
});
var PageIndex = 1;
//学员列表
function User_list() {
    var SearchKey = $("#SearchKey").val();
    var param = {SearchKey: SearchKey, PageIndex: PageIndex, PageSize: 10};
    console.log(param);
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/UserInfo_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row ">';
        strHtml += '        <div class="col-xs-1">学生名字</div>';
        strHtml += '       <div  class="col-lg-1">性别</div>'
        strHtml += '        <div class="col-xs-2">学校</div>';
        strHtml += '        <div class="col-xs-1">年级</div>';
        strHtml += '        <div class="col-xs-1">班级</div>';
        strHtml += '        <div class="col-xs-1">手机号码</div>';
        strHtml += '        <div class="col-xs-2">家庭住址</div>';
        strHtml += '        <div class="col-xs-1">用户权限</div>';
        strHtml += '        <div class="col-xs-2">操作</div>';
        strHtml += '    </div>';
        strHtml += '</li>';

        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                var role = "无";
                if (row.Role == 1) {
                    role = "管理员";
                }
                if (row.Role == 2) {
                    role = "学员";
                }
                if (row.Role == 3) {
                    role = "提现";
                }
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row ">';
                strHtml += '        <div class="col-xs-1">' + row.NickName + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.Sex + '</div>';
                strHtml += '        <div class="col-xs-2">' + row.School + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.Grade + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.ClassName + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.Phone + '</div>';
                strHtml += '        <div class="col-xs-2">' + row.Address + '</div>';
                strHtml += '        <div class="col-xs-1">' + role + '</div>';
                strHtml += '        <div class="col-xs-2">';
                strHtml += '            <button class="autobutton" onclick="Edit(' + row.UserID + ')" >编 辑</button>';
                strHtml += '            <button class="autobutton" onclick="UserRole_Set(' + row.UserID + ')">权限</button>';
                strHtml += '            <button class="autobutton" onclick="UserInfo_Del(' + row.UserID + ')">删 除</button>';
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }

            laypage({
                cont: $("#Page"), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: Math.ceil(result.Data[0].RowsCount / 10), //通过后台拿到的总页数
                curr: PageIndex || 1, //当前页,
                skip: true, //是否开启跳页
                skin: '#AF0000',
                groups: 3, //连续显示分页数
                jump: function (obj, first) { //触发分页后的回调
                    //alert(obj.curr)
                    if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                        PageIndex = obj.curr;
                        User_list();
                    }
                }
            });
        }
        $("#course_list").html(strHtml);
    }
}

function Edit(id) {
    window.location.href = "UserEdit.html?UserID=" + id;
}

function UserRole_Set(UserID) {
    layer.open({
        type: 1,
        skin: "layui-layer-molv",
        title: "编辑用户权限",
        content: '<div style="padding: 10px 30px;"><select id="role"><option value="1">管理员</option><option value="3">提现权限</option></select></div>',
        btn: ["确定", "取消"],
        area: ["250px", "160px"],
        yes: function (index) {
            var param = {UserID: UserID, Role: $("#role").val()};
            console.log(param);
            var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserRole_Set");
            if (result.Msg == "OK") {
                layer.msg("修改成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                    User_list();
                });
            }
        }
    });
}

function UserInfo_Del(id) {
    layer.confirm("确定要删除吗？", function () {
        var param = {UserID: id};
        var result = $Course.GetAjaxJson(param, ApiUrl + "User/UserInfo_Del");
        if (result.Msg == "OK") {
            if (result.Data) {
                layer.msg("删除成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                    User_list();
                });
            } else {
                layer.msg("删除失败，请联系管理员！", {icon: 2, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        }
    });
}
