/**
 * 课程介绍
 * Created by wangbin on 2016/10/6.
 */

$(function ($) {
    $("#studentButton").on("click",function () {
        StudentList_Show();
    });
    $("#parentsButton").on("click",function () {
        ParentsList_Show();
    });
    // 获取用户ID
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    console.log(UserInfo);
    CourseList(UserInfo.UserID,1);
    CourseList(UserInfo.UserID,2);
    StudentList_Show();
});

function CourseList(UserID, CourseTypeID) {
    var param = {UserID: UserID, CourseTypeID: CourseTypeID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/Course_List_Type");
    console.log(result);
    if (result.Msg == "OK" && result.Data.length > 0) {
        for (var i = 0 ; i < result.Data.length; i++) {
            var row = result.Data[i];
            var people = row.ReservationCount + '/' + row.PeopleCount;
            var full = row.ReservationCount >= row.PeopleCount? true : false;
            var progress = "";
            if (full) {
                progress = row.ReservationCount / row.PeopleCount * 100;
                progress = progress >= 100 ? 100 : progress;
            }
            var strHtml = "";
            strHtml += '   <div class="row" style="padding-bottom: 15px;border-bottom: 1px solid #eee; padding-top: 10px">';
            strHtml += '       <div class="col-xs-12" style="padding-right: 8px">';
            strHtml += '           <div class="courseLine_leftImg" style="background: url(' + row.CourseImgUrl + ') no-repeat;background-size: cover;">';
            if (full) {
                strHtml += '               <img style="width: 100%; height: 100%;" src="https://striker.teambition.net/storage/110l414ba2cefe3a7f028f48ee230f52afba?download=Float%402x.png&Signature=eyJhbGciOiJIUzI1NiJ9.eyJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMGw0MTRiYTJjZWZlM2E3ZjAyOGY0OGVlMjMwZjUyYWZiYSIsImV4cCI6MTQ3NTg4NDgwMH0.MSol2uflMOqktzTnc9PH-6MQTRpwxqtceCiRixSIgw4">';
            }
            strHtml += '           </div>';
            strHtml += '       <div style="float: right;width: 74%;height: 80px;">';
            strHtml += '           <ul style="margin: 0px;padding: 0px;">';
            strHtml += '               <li class="list-unstyled" style="height: 35px;">';
            strHtml += '                   <button class="text-left courseTitle" style="height: 20px">' + row.CourseName + '</button>';
            if (full) {
                strHtml += '                   <button class="registrationButton" onclick="CourseDetials(' + row.CourseID + ')">立即候补</button>';
            } else  {
                strHtml += '                   <button class="registrationButton  onclick="CourseDetials(' + row.CourseID + ')">立即预约</button>';
            }
            strHtml += '               </li>';
            strHtml += '               <li class="list-unstyled info">'+ row.Intro +'</li>';
            strHtml += '               <li class="list-unstyled">';
            strHtml += '                   <span style="font-size: 12px;">已报名额</span>';
            strHtml += '                   <span style="font-size: 12px;float: right">' + row.ReservationCount + '/' + row.PeopleCount + '</span>';
            strHtml += '                   <div class="progress" style="height: 3px;">';
            strHtml += '                       <div class="progress-bar-info" role="progressbar" aria-valuenow="'+ row.ReservationCount +'" aria-valuemin="0" aria-valuemax="' + row.PeopleCount + '" style="width: '+ progress +'%;height: 3px;">';
            strHtml += '                       </div>';
            strHtml += '                   </div>';
            strHtml += '               </li>';
            strHtml += '           </ul>';
            strHtml += '       </div>';
            strHtml += '       </div>';
            strHtml += '   </div>';
        }
        if (CourseTypeID == 1) {
            $("#StudentList").html(strHtml);
        } else {
            $("#ParentsList").html(strHtml);
        }
    }
}

function CourseDetials(CourseID) {
    window.location.href = "CourseDetials.html?CourseID=" + CourseID;
}

function StudentList_Show() {
    $("#ParentsList").hide();
    $("#StudentList").show();
    $("#parentsButton").removeClass("active");
    $("#studentButton").addClass("active");
}

function ParentsList_Show() {
    $("#StudentList").hide();
    $("#ParentsList").show();
    $("#studentButton").removeClass("active");
    $("#parentsButton").addClass("active");
}