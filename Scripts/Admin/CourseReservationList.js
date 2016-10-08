/**
 * 课程预约列表
 * Created by wangbin on 2016/10/5.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    var CourseName=decodeURIComponent($Course.RequestUrlParams("CourseName"));
    $("#CourseName").html('课程预约列表 — ' +  CourseName);

    $("#btnSearch").on("click",function(){
        CourseRegistration_List(1, 100);
    });
    CourseRegistration_List(1, 100);
});

function CourseRegistration_List(PageIndex, PageSize) {
    var SearchKey = $("#SearchKey").val();
    var CourseID = $Course.RequestUrlParams("CourseID");
    var param = {CourseID: CourseID, SearchKey: SearchKey, PageIndex: PageIndex, PageSize: PageSize};
    console.log(param);
    var result = $Course.GetAjaxJson(param, ApiUrl + "CourseRegistration/CourseRegistration_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row ">';
        strHtml += '        <div class="col-xs-2">学员姓名</div>';
        strHtml += '        <div class="col-xs-1">电话</div>';
        strHtml += '        <div class="col-xs-1">性别</div>';
        strHtml += '        <div class="col-xs-1">生日</div>';
        strHtml += '        <div class="col-xs-1">已交学费</div>';
        strHtml += '        <div class="col-xs-1">增值服务</div>';
        strHtml += '        <div class="col-xs-2">课程预约时间</div>';
        strHtml += '        <div class="col-xs-2">操作</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                var CreateTime = row.CreateTime.split(' ')[0];
                var Birthday = row.BirthDay?row.BirthDay.split(' ')[0]:"未设置";
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row ">';
                strHtml += '        <div class="col-xs-2"> <a href="../User/UserEdit.html?type=1&UserID='+ row.UserID+'" target="_blank">' + row.NickName + '</a></div>';
                strHtml += '        <div class="col-xs-1">' + row.Phone + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.Sex + '</div>';
                strHtml += '        <div class="col-xs-1">' + Birthday + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.TuitionFeesPaid + '</div>';
                strHtml += '        <div class="col-xs-1"><a href="">查看</a></div>';
                strHtml += '        <div class="col-xs-2">' + CreateTime + '</div>';
                strHtml += '        <div class="col-xs-2">';
                strHtml += '            <button onclick="CourseRegistration_Refund(' + row.UserID + ')">退费</button>';
                strHtml += '            <button onclick="CourseRegistration_NoteAndMoney_Upd(' + row.CourseRegistrationID + ')">备注</button>';
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }
        }
        $("#CourseReservation_List").html(strHtml);
    }
}

function CourseRegistration_Refund(UserID) {

}

function CourseRegistration_NoteAndMoney_Upd(CourseRegistrationID) {

}