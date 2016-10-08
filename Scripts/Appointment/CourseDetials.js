/**
 * 课程详情页面
 * Created by wangbin on 2016/10/6.
 */

$ (function ($) {
    CourseInfo_Details();
});

function CourseInfo_Details() {
    var CourseID = $Course.RequestUrlParams("CourseID");
    var param = {CourseID:CourseID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_Details");
    console.log(result);
    if (result.Msg == "OK") {
        var CourseDetials = result.Data.courselist[0];
        var PhaseDetials = result.Data.phaselist[0];
        var Teachers = result.Data.teacherlist;
        var residue = PhaseDetials.PeopleCount - PhaseDetials.ReservationCount;
        var residueCount = residue < 0 ? 0 : residue;
        var strHtml_Detials = "";
        strHtml_Detials += '<ul class="list-unstyled" style="margin: 0px;padding: 10px;overflow: auto">';
        strHtml_Detials += '    <li style="font-size: 10px;">';
        strHtml_Detials += '        <img class="CourseDetials_leftImg" style="float: left;padding-right: 10px;padding-bottom: 5px;" src="' + CourseDetials.CourseImgUrl + '" alt="...">';
        strHtml_Detials += '        <h4 class="media-heading">' + CourseDetials.CourseName + '</h4>';
        strHtml_Detials += '        ' + CourseDetials.Intro + '';
        strHtml_Detials += '    </li>';
        strHtml_Detials += '    <li class="col-xs-12 pure" style="padding-top: 12px;">';
        strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">一阶开营时间：' + PhaseDetials.StartTime.split(" ")[0] + '</div>';
        strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">地点：' + PhaseDetials.Place + '</div>';
        strHtml_Detials += '    </li>';
        strHtml_Detials += '    <li class="col-xs-12 pure" style="padding-top: 8px;">';
        strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">剩余名额：' + residueCount + '</div>';
        strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">预约截止时间：' + PhaseDetials.StartTime.split(" ")[0] + '</div>';
        strHtml_Detials += '    </li>';
        for (var i = 0; i < 3; i++) {
            var type = "二";
            strHtml_Detials += '    <li class="col-xs-12 pure" style="padding-top: 12px;">';
            if (i == 0) {
                type = "二";
            } else if (i == 1) {
                type = "三";
            } else if (i == 2) {
                type = "四";
            }
            strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">' + type + '阶开营时间：待定</div>';
            strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">地点：待定</div>';
            strHtml_Detials += '    </li>';
            strHtml_Detials += '    <li class="col-xs-12 pure" style="padding-top: 8px;">';
            strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">剩余名额：待定</div>';
            strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">预约截止时间：待定</div>';
            strHtml_Detials += '    </li>';
        }
        strHtml_Detials += '</ul>';

        var width = window.screen.width;
        var imgWidth = (width - 50) / 4;
        var strHtml_Teachers = "";
        strHtml_Teachers += '<div class="pure divide"></div>';
        strHtml_Teachers += '   <div class="pure" style="width: 100%;height: 30px;overflow: auto">';
        strHtml_Teachers += '       <div class="pure" style="width: 2px;height: 20px;background-color: #F24D4D;margin-top: 5px;float: left;"></div>';
        strHtml_Teachers += '       <span style="font-size: 18px;float: left;padding-top: 2px;padding-left: 5px;">主讲教师</span>';
        strHtml_Teachers += '   </div>';
        strHtml_Teachers += '   <div class="col-xs-12 pure">';
        for (var i = 0; i < Teachers.length; i++) {
            var teacher = Teachers[i];
            strHtml_Teachers += '       <div class="col-xs-3 pure" style="text-align: center;padding-top: 10px;">';
            strHtml_Teachers += '           <img class="pure" src="' + teacher.TeacherImg + '" style="width: ' + imgWidth + 'px;height: ' + imgWidth + 'px">';
            strHtml_Teachers += '           <p>' + teacher.TeacherName + '</p>';
            strHtml_Teachers += '       </div>';
        }
        strHtml_Teachers += '   </div>';
        strHtml_Teachers += '</div>';

        var strHtml_Serve = "";
        strHtml_Serve += '   <div class="pure divide"></div>';
        strHtml_Serve += '   <div class="pure" style="width: 100%;height: 30px;overflow: auto">';
        strHtml_Serve += '      <div class="pure" style="width: 2px;height: 20px;background-color: #F24D4D;margin-top: 5px;float: left;"></div>';
        strHtml_Serve += '      <span style="font-size: 18px;float: left;padding-top: 2px;padding-left: 5px;">增值服务</span>';
        strHtml_Serve += '   </div>';
        strHtml_Serve += '   <ul class="list-unstyled" style="padding-left: 10px;padding-right: 10px;padding-top: 5px;font-size: 12px;">';
        strHtml_Serve += '      <li>统一版摩英回忆视频300元(单阶7天)</li>';
        strHtml_Serve += '      <li>VIP摩英大电影1980元(单阶7天)</li>';
        strHtml_Serve += '      <li>VIP蜕变水晶相册1280元(单阶7天)</li>';
        strHtml_Serve += '      <li>VIP摩英大电影+VIP蜕变水晶相册2680元 单阶7天性价比极高(单阶7天)</li>';
        strHtml_Serve += '      <li>VIP摩英大电影+VIP蜕变水晶相册3980元 两阶14天性价比极高(单阶7天)</li>';
        strHtml_Serve += '      <li><button class="registrationButton" onclick="CourseRegistration_Add(' + CourseDetials.CourseID + ')">立即预约</button></li>';
        strHtml_Serve += '   </ul>';

        $("#Detials").html(strHtml_Detials);
        $("#Teachers").html(strHtml_Teachers);
        $("#Serve").html(strHtml_Serve);
    }
}

function CourseRegistration_Add(CourseID) {
    window.location.href = "../book/sign.html?CourseID=" + CourseID;
}