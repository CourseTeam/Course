/**
 * Created by xuwei on 2016/10/2 0002.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
    $("#btnAdd").on("click", function () {
        Phase_Add();
    });
    Phase_List();
});

var CourseID = $Course.RequestUrlParams("CourseID");

function Phase_Add() {
    window.location.href = "PhaseEdit.html?CourseID=" + CourseID;
}

function Phase_List() {
    var param = {CourseID: CourseID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List");
    console.log(result);
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
        for (var i = 0; i < result.Data.length; i++) {
            var row = result.Data[i];
            var startDate = row.StartTime?row.StartTime.split(' ')[0]:"待定";
            var endDate = row.EndTime? row.EndTime.split(' ')[0]:"待定";
            var Place = row.Place || "待定";
            strHtml += '<li class="list-group-item">';
            strHtml += '    <div class="row ">';
            strHtml += '      <div class="col-lg-2">' + row.CoursePhaseName + '</div>';
            strHtml += '      <div class="col-lg-1">' + row.CourseTypeName + '</div>';
            strHtml += '      <div class="col-lg-1">' + startDate + '</div>';
            strHtml += '      <div class="col-lg-1">' + endDate + '</div>';
            strHtml += '      <div class="col-lg-2">' + Place + '</div>';
            strHtml += '      <div class="col-lg-1">' + row.AccommodationCost + '</div>';
            strHtml += '      <div class="col-lg-1">' + row.ReservationCount + "/" + row.PeopleCount + '</div>';
            strHtml += '      <div class="col-lg-3">';
            strHtml += '        <button class="autobutton" onclick="Phase_Edit('+ CourseID +"," + row.PhaseID+')">编辑</button>';
            strHtml += '        <button class="autobutton" onclick="Phase_Del('+row.PhaseID+')">删除</button>';
            strHtml += '        <button class="autobutton" onclick="PhaseRegistration_List(' + row.PhaseID + ', this)"  cname = "'+row.CoursePhaseName+'">预约列表</button>';
            strHtml += '      </div>';
            strHtml += '    </div>';
            strHtml += '</li>';
        }
    }
    $("#phase_list").html(strHtml);
}

//课程阶段删除
function Phase_Del(id) {
    layer.confirm("确定要删除吗？", function () {
        var param = {PhaseID: id};
        var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_Del");
        if (result.Msg == "OK") {
            if (result.Data) {
                layer.msg("删除成功！", {icon: 1, time: 2000}, function () {
                    Phase_List();
                    layer.closeAll();
                });
            } else {
                layer.msg("删除失败，请联系管理员！", {icon: 2, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        }
    });
}

//编辑
function Phase_Edit(CourseID, PhaseID) {
    window.location.href="PhaseEdit.html?CourseID=" + CourseID + "&" + "PhaseID=" + PhaseID;
}

function PhaseRegistration_List(PhaseID, obj) {
    window.location.href="../Order/PhaseOrder.html?PhaseID=" + PhaseID + "&" + "CoursePhaseName=" + $(obj).attr("cname");;
}
