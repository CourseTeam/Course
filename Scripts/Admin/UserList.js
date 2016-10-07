/**
 * Created by waylen on 2016/10/5.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    var UserID = $Course.RequestUrlParams("UserID");

    $("#btnSearch").on("click",function(){
        User_list(1, 10);
    });
    User_list(1, 10);
});
//学员列表
function User_list(PageIndex, PageSize) {
    var SearchKey = $("#SearchKey").val();
    var param = {SearchKey: SearchKey, PageIndex: PageIndex, PageSize: PageSize};
    console.log(param);
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/UserInfo_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row ">';
        strHtml += '        <div class="col-xs-1">学生名字</div>';
        strHtml += '       <div  class="col-lg-1">性别</div>'
        strHtml += '        <div class="col-xs-1">学校</div>';
        strHtml += '        <div class="col-xs-1">年级</div>';
        strHtml += '        <div class="col-xs-1">班级</div>';
        strHtml += '        <div class="col-xs-2">手机号码</div>';
        strHtml += '        <div class="col-xs-2">家庭住址</div>';
        strHtml += '        <div class="col-xs-3">操作</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row ">';
                strHtml += '        <div class="col-xs-1">' + row.NickName + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.Sex + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.School + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.Grade+ '</div>';
                strHtml += '        <div class="col-xs-1">' + row.ClassName + '</div>';
                strHtml += '        <div class="col-xs-2">' + row.Phone + '</div>';
                strHtml += '        <div class="col-xs-2">' + row.Address + '</div>';
                strHtml += '        <div class="col-xs-3">';
                strHtml += '            <button onclick="Edit(' + row.UserID + ')" >编 辑</button>';
                strHtml += '            <button onclick="UserInfo_Del(' + row.UserID + ')">删 除</button>';
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }
        }
        $("#course_list").html(strHtml);
    }
}

function Edit(id) {
    window.location.href = "UserEdit.html?UserID=" + id;
}

function UserInfo_Del(id) {
    layer.confirm("确定要删除吗？", function () {
        var param = {UserID: id};
        var result = $Course.GetAjaxJson(param, ApiUrl + "User/UserInfo_Del");
        if (result.Msg == "OK") {
            if (result.Data) {
                layer.msg("删除成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                    User_list(1, 10);
                });
            } else {
                layer.msg("删除失败，请联系管理员！", {icon: 2, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        }
    });
}
