/**
 * 课程介绍
 * Created by wangbin on 2016/10/6.
 */

var PhaseType1OR2 = 0;
var PhaseType3 = 0;

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

    Course_Join(UserInfo.UserID);
    StudentList_Show();
});

function Course_Join(UserID) {
    var param = {UserID:UserID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/Is_JoinCourse");
    if (result.Msg == "OK") {
        console.log(result);
        PhaseType1OR2 = result.Data.PhaseType1OR2;
        PhaseType3 = result.Data.PhaseType3;
        CourseList(UserID,1);
        CourseList(UserID,2);
    }
}

function CourseList(UserID, CourseTypeID) {
    var param = {UserID: UserID, CourseTypeID: CourseTypeID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/Course_List_Type");
    console.log(result);
    var strHtml = "";
    if (result.Msg == "OK" && result.Data.length > 0) {
        for (var i = 0 ; i < result.Data.length; i++) {
            var row = result.Data[i];
            row.ReservationCount = row.ReservationCount >= row.PeopleCount ? row.PeopleCount : row.ReservationCount;
            row.ReservationCount = row.ReservationCount <= 0 ? 0 : row.ReservationCount;
            var people = row.ReservationCount + '/' + row.PeopleCount;
            var full = row.ReservationCount >= row.PeopleCount? true : false;
            var progress = 0;
            progress = row.ReservationCount / row.PeopleCount * 100;
            progress = row.ReservationCount / row.PeopleCount * 100;
            if (full) {
                progress = progress >= 100 ? 100 : progress;
            }
            // if ((CourseTypeID == 2 && PhaseType3 == 0) || (CourseTypeID == 1 && PhaseType1OR2 == 0)) {
            //     if (row.MaxPhaseType <= 1 || row.CourseStatus == 0) {
            //         strHtml += '   <div class="row" style="padding-bottom: 15px;border-bottom: 1px solid #eee; padding-top: 10px" onclick="CourseDetials(' + row.CourseID + ', 1)">';
            //     } else {
            //         strHtml += '   <div class="row" style="padding-bottom: 15px;border-bottom: 1px solid #eee; padding-top: 10px" onclick="CourseDetials(' + row.CourseID + ', -1)">';
            //     }
            // } else {
            strHtml += '   <div class="row" style="padding-bottom: 15px;border-bottom: 1px solid #eee; padding-top: 10px" onclick="CourseDetials(' + row.CourseID + ', ' + row.CourseStatus + ')">';
            // }
            strHtml += '       <div class="col-xs-12" style="padding-right: 8px">';
            strHtml += '           <div class="courseLine_leftImg" style="background: url(' + row.CourseImgUrl + ') center no-repeat;background-size: cover;">';
            if (full) {
                strHtml += '               <img style="width: 75px; height: 75px;" src="../../Images/full.png">';
            }
            strHtml += '           </div>';
            strHtml += '       <div style="float: right;width: 74%;height: 80px;">';
            strHtml += '           <ul style="margin: 0px;padding: 0px;">';
            strHtml += '               <li class="list-unstyled" style="height: 35px;">';
            strHtml += '                   <button class="text-left courseTitle">' + row.CourseName + '</button>';
            // if ((CourseTypeID == 2 && PhaseType3 == 0) || (CourseTypeID == 1 && PhaseType1OR2 == 0)) {
            //     if (row.CourseStatus == 0) {
            //         strHtml += '                   <button class="registrationButton">已预约</button>';
            //     } else if(full) {
            //         if (row.MaxPhaseType > 1) {
            //             strHtml += '                   <button class="registrationButton">立即候补</button>';
            //         } else {
            //             strHtml += '                   <button class="registrationButton" style="background-color: #999999;">立即候补</button>';
            //         }
            //     } else {
            //         if (row.MaxPhaseType > 1) {
            //             strHtml += '                   <button class="registrationButton">立即预约</button>';
            //         } else {
            //             strHtml += '                   <button class="registrationButton" style="background-color: #999999;">立即预约</button>';
            //         }
            //     }
            // } else {
            if (row.CourseStatus == 1) {
                strHtml += '                   <button class="registrationButton" style="background-color: #999999;">已退费</button>';
            } else if(row.CourseStatus == 0) {
                strHtml += '                   <button class="registrationButton">已预约</button>';
            } else if(full) {
                strHtml += '                   <button class="registrationButton">立即候补</button>';
            } else {
                strHtml += '                   <button class="registrationButton">立即预约</button>';
            }
            // }
            strHtml += '               </li>';
            strHtml += '               </br>';
            if (row.MaxPhaseType < 1) {
                strHtml += '               <li class="list-unstyled">';
                strHtml += '                   <span style="font-size: 12px;">已报名额</span>';
                strHtml += '                   <span style="font-size: 12px;float: right">' + row.ReservationCount + '/' + row.PeopleCount + '</span>';
                strHtml += '                   <div class="progress" style="height: 3px;">';
                strHtml += '                       <div class="progress-bar-info" role="progressbar" aria-valuenow="'+ row.ReservationCount +'" aria-valuemin="0" aria-valuemax="' + row.PeopleCount + '" style="width: '+ progress +'%;height: 3px;">';
                strHtml += '                       </div>';
                strHtml += '                   </div>';
                strHtml += '               </li>';
            } else {
                strHtml += '                <li class="list-unstyled" style="color: red;"><strong>火爆抢订中</strong></li>';
            }
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

function CourseDetials(CourseID,CourseStatus) {
    window.location.href = "CourseDetials.html?CourseID=" + CourseID + '&Status=' + CourseStatus;
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