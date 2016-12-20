/**
 * Created by wangbin on 2016/12/20.
 */

$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    $("#btnSearch").on("click", function () {
        Withdraw_List(1, 100);
    });
    Withdraw_List(1, 100);
});

//课程列表
function Withdraw_List(PageIndex, PageSize) {
    var SearchKey = $("#SearchKey").val();
    var Status = $("#Select").val();
    var param = {SearchKey: SearchKey, Status:Status, PageIndex: PageIndex, PageSize: PageSize};
    console.log(param);
    var result = $Course.GetAjaxJson(param, ApiUrl + "Withdraw/Withdraw_List");
    console.log(result);
    if (result.Msg == "O") {
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
                strHtml += '            <button class="autobutton" onclick="Edit(' + row.CourseID + ')">编 辑</button>';
                strHtml += '            <button class="autobutton" onclick="CourseInfo_Del(' + row.CourseID + ')">删 除</button>';
                strHtml += '            <button class="autobutton" onclick="Phase_Edit(' + row.CourseID + ')">阶段管理</button>';
                strHtml += '            <button class="autobutton" onclick="CourseRegistration_List(' + row.CourseID + ',this)" cname = "' + row.CourseName + '">报名表</button>';
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }
        }
        $("#course_list").html(strHtml);
    }
}