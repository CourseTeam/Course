/**
 * Created by xuwei on 2016/9/29 0029.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    $("#btnSearch").on("click", function () {
        Course_list(1, 100);
    });
    Course_list(1, 100);
});

//课程列表
function Course_list(PageIndex, PageSize) {
    var SearchKey = $("#SearchKey").val();
    var param = {SearchKey: SearchKey, PageIndex: PageIndex, PageSize: PageSize};
    console.log(param);
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row ">';
        strHtml += '        <div class="col-xs-3">课程名称</div>';
        strHtml += '        <div class="col-xs-3">课程类型</div>';
        // strHtml += '        <div class="col-xs-3">课程简介</div>';
        strHtml += '        <div class="col-xs-2">价格</div>';
        strHtml += '        <div class="col-xs-4">操作</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row ">';
                strHtml += '        <div class="col-xs-3">' + row.CourseName + '</div>';
                strHtml += '        <div class="col-xs-3">' + row.CourseType + '</div>';
                // strHtml += '        <div class="col-xs-3" style="height: 20px;overflow: hidden;" title="' + $Course.DelHtmlTag(row.Intro) + '">点击编辑查看简介</div>';
                // strHtml += '        <div class="col-xs-3" style="height: 20px;overflow: hidden;" title="' + $Course.DelHtmlTag(row.Intro) + '">' + row.Intro + '</div>';
                strHtml += '        <div class="col-xs-2">' + row.Tuition + '</div>';
                strHtml += '        <div class="col-xs-4">';
                strHtml += '            <button class="autobutton" onclick="CourseRegistration_List(' + row.CourseID + ',this)" cname = "' + row.CourseName + '">报名表</button>';
                strHtml += '            <button class="autobutton" onclick="Phase_Edit(' + row.CourseID + ')">阶段管理</button>';
                strHtml += '            <button class="autobutton" onclick="Edit(' + row.CourseID + ')">编 辑</button>';
                strHtml += '            <button class="autobutton" onclick="CourseInfo_Del(' + row.CourseID + ')">删 除</button>';
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }
        }
        $("#course_list").html(strHtml);
    }
}
function CourseInfo_Del(id) {
    layer.confirm("确定要删除吗？", function () {
        var param = {CourseID: id};
        var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_Del");
        if (result.Msg == "OK") {
            if (result.Data) {
                layer.msg("删除成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                    Course_list(1, 100);
                });
            } else {
                layer.msg("删除失败，请联系管理员！", {icon: 2, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        }
    });
}

function Edit(id) {
    window.location.href = "CourseEdit.html?CourseID=" + id;
}

//阶段列表
function Phase_Edit(id) {
    window.location.href = "../Phase/PhaseList.html?CourseID=" + id;
}

function CourseRegistration_List(CourseID, obj) {
    window.location.href = "CourseRegistrationList.html?CourseID=" + CourseID + "&" + "CourseName=" + $(obj).attr("cname");
}

function PhaseRegistration_List(PhaseID, obj) {
    window.location.href="../Order/PhaseOrder.html?PhaseID=" + PhaseID + "&" + "CoursePhaseName=" + $(obj).attr("cname");
}