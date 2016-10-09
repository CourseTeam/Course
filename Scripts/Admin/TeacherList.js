/**
 * 教师列表
 * Created by wangbin on 2016/10/4.
 */

$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
    Teacher_List();
});

// 教师列表
function Teacher_List() {
    var param = {};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Teacher/TeacherInfo_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row ">';
        strHtml += '        <div class="col-xs-4">教师名称</div>';
        strHtml += '        <div class="col-xs-4">简介</div>';
        strHtml += '        <div class="col-xs-4">操作</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row ">';
                strHtml += '        <div class="col-xs-4">' + row.TeacherName + '</div>';
                strHtml += '        <div class="col-xs-4 test" style="height:20px;overflow:hidden; text-overflow: ellipsis;" title="' + $Course.DelHtmlTag(row.Intro) + '">' + row.Intro + '</div>';
                strHtml += '        <div class="col-xs-4">';
                strHtml += '            <button onclick="Edit(' + row.TeacherID + ')">编 辑</button>';
                strHtml += '            <button onclick="TeacherInfo_Del(' + row.TeacherID + ')">删 除</button>';
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }
        }
        $("#teacher_list").html(strHtml);
    }
}

function Edit(TeacherID) {
    window.location.href = "TeacherEdit.html?TeacherID=" + TeacherID;
}

function TeacherInfo_Del(TeacherID) {
    layer.confirm("确定要删除吗？", function () {
        var param = {TeacherID: TeacherID};
        var result = $Course.GetAjaxJson(param, ApiUrl + "Teacher/TeacherInfo_Del");
        if (result.Msg == "OK") {
            if (result.Data) {
                layer.msg("删除成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                    Teacher_List();
                });
            } else {
                layer.msg("删除失败，请联系管理员！", {icon: 2, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        }
    });
}

