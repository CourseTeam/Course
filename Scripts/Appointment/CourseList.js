/**
 * 课程介绍
 * Created by wangbin on 2016/10/6.
 */

$(function ($) {
    $("#studentButton").on("click",function () {
        // CourseList();
    });
    $("#parentsButton").on("click",function () {
        // CourseList();
    });
});

function CourseList() {
    UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {UserID: UserInfo.UserID, CourseTypeID: 1};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/Course_List_Type");
    if (result.Msg == "OK") {
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row ">';
        strHtml += '      <div class="col-lg-2">阶段课程名称</div>';
        strHtml += '      <div class="col-lg-1">课程类型</div>';
        strHtml += '      <div class="col-lg-1">开始时间</div>';
        strHtml += '      <div class="col-lg-1">结束时间</div>';
        strHtml += '      <div class="col-lg-2">举办地址</div>';
        strHtml += '      <div class="col-lg-1">食宿费</div>';
        strHtml += '      <div class="col-lg-1">招生名额</div>';
        strHtml += '      <div class="col-lg-3">操作</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
    }


}