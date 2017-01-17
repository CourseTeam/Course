/**
 * 录入学生信息
 * Created by wangbin on 2016/10/8.
 */

var UserID = 0;
var PhaseID = 0;
var CourseID = 0;
var PhaseType = 0;
var Entry = 0 // 作为判断这个学生是否报名过这个课程的依据,默认为0,0代表没有报名过,1代表报名过

$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
    PhaseID = $Course.RequestUrlParams("PhaseID") || 0 ;
    UserID = $Course.RequestUrlParams("UserID") || 0;
    $("#StudentName").val(UserID > 0 ? $Course.RequestUrlParams("NickName") : "");
    $("input[name=CourseName_PhaseName]").val(PhaseID > 0 ? $Course.RequestUrlParams("CoursePhaseName") : "");
    $("#btnSave").on("click", function () {
        Course_Entry();
    });
    $("#choose_student").on("click", function () {
        StudentList_Show();
    });
    $("#choose_course").on("click", function () {
        CourseList_Show();
    });

    $("#isExperience").on("change", function () {
        if ($(this).is(':checked')) {
            $("#service").hide();
            $("#TuitionFeesPaid").val("");
            $("#Tuition").hide();
        } else {
            $("#service").show();
            $("#Tuition").show();

        }
    });
    StudentList();
    CourseList();
});

function Course_Entry() {
    var TuitionFeesPaid = $("#TuitionFeesPaid").val();
    var Note = $("#Note").val();
    var Money = $("#Money").val();
    var ValueAddedServices = $("input[name=optionsRadios]:checked").val();
    var IsExperience = 0;
    if ($("#isExperience").is(":checked")) {
        IsExperience = 1;
    }
    var param = {UserID:UserID, CourseID: CourseID, TuitionFeesPaid:TuitionFeesPaid,IsExperience:IsExperience, Note:Note, Money:Money, ValueAddedServices:ValueAddedServices};
    var result = $Course.PostAjaxJson(param, ApiUrl + "CourseRegistration/CourseReg_Add");
    if (result.Msg == "OK"){
        Phase_Entry();
    }
}

function Phase_Entry() {
    var AccommodationFeesPaid = $("#AccommodationFeesPaid").val();
    var ParentsCount = $("#ParentsCount").val() || 0;
    var ValueAddedServices = $("input[name=optionsRadios]:checked").val();
    console.log($("input[name=optionsRadios]:checked").val());
    var param = {PhaseID:PhaseID, UserID:UserID, CourseID:CourseID, AccommodationFeesPaid:AccommodationFeesPaid, ParentsCount:ParentsCount,PhaseType:PhaseType, ValueAddedServices:ValueAddedServices};
    var result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseReg_Add");
    if (result.Msg == "OK") {
        if (result.Data == 2) {
            layer.msg("请不要重复录入",{icon:2,time:2000},function () {
                // window.location.href = window.location.href;
            });
        } else {
            layer.msg("录入成功",{icon:1,time:2000},function () {
                window.location.href = window.location.href;
            });
        }
    }
}

function StudentList() {
    var SearchKey = $("#SearchKey").val() || "";
    var param = {SearchKey: SearchKey, PageIndex: 1, PageSize: 7};
    console.log(param);
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/UserInfo_List");
    console.log(result);
    var strHtml = "";
    if (result.Msg == "OK") {
        strHtml += '<div class="col-xs-12 text-right">';
        strHtml += '    <input type="text" style="width: 40%;height: 35px;" id="SearchKey" placeholder="请输入搜索关键字" value="' + SearchKey + '" />';
        strHtml += '    <button id="btnSearch" onclick="StudentList()">搜 索</button>';
        strHtml += '</div>';
        strHtml += '<div class="col-xs-12">';
        strHtml += '    <ul class="list-group" id="course_list">';
        strHtml += '        <li class="list-group-item header">';
        strHtml += '            <div class="row">';
        strHtml += '                <div class="col-xs-1"></div>';
        strHtml += '                <div class="col-xs-3">学生名字</div>';
        strHtml += '                <div  class="col-xs-2">性别</div>';
        strHtml += '                <div class="col-xs-3">手机号码</div>';
        strHtml += '                <div class="col-xs-3">家庭住址</div>';
        strHtml += '            </div>';
        strHtml += '        </li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '        <li class="list-group-item">';
                strHtml += '            <div class="row radio" type="radio" value="option1">';
                strHtml += '                <div class="col-xs-1"><input style="width: 20px; height: 20px;padding:0px;margin-left: 10px;" type="radio" name="choose_student" value="' + row.UserID + '" uname="' + row.NickName + '" ></div>';
                strHtml += '                <div class="col-xs-3">' + row.NickName + '</div>';
                strHtml += '                <div class="col-xs-2">' + row.Sex + '</div>';
                strHtml += '                <div class="col-xs-3">' + row.Phone + '</div>';
                strHtml += '                <div class="col-xs-3">' + row.Address + '</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
            }
        }
        strHtml += '    </ul>';
        strHtml += '</div>';
        $("#studentlist").html(strHtml);
    }
}

function CourseList() {
    var param = {};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_All");
    console.log(result);
    var strHtml = "";
    if (result.Msg == "OK") {
        // strHtml += '<div class="col-xs-12 text-right">';
        // strHtml += '    <input type="text" style="width: 40%;height: 35px;" id="SearchKey" placeholder="请输入搜索关键字" value="' + SearchKey + '" />';
        // strHtml += '    <button id="btnSearch" onclick="StudentList()">搜 索</button>';
        // strHtml += '</div>';
        strHtml += '<div class="col-xs-12">';
        strHtml += '    <ul class="list-group" id="course_list">';
        strHtml += '        <li class="list-group-item header">';
        strHtml += '            <div class="row">';
        strHtml += '                <div class="col-xs-1"></div>';
        strHtml += '                <div class="col-xs-4">课程名称</div>';
        strHtml += '                <div class="col-xs-2">期数</div>';
        strHtml += '                <div class="col-xs-2">阶段</div>';
        strHtml += '                <div class="col-xs-3">开始时间</div>';
        strHtml += '            </div>';
        strHtml += '        </li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '        <li class="list-group-item">';
                strHtml += '            <div class="row radio" type="radio" value="option1">';
                var type = row.PhaseType == 0 ? "" : row.PhaseType + "阶课程";
                strHtml += '                <div class="col-xs-1"><input style="width: 20px; height: 20px;padding:0px;margin-left: 10px;" type="radio" name="choose_course" value="' + row.PhaseID + '" uname="' + row.CoursePhaseName + " 第" + row.Periods + "期 " + type + '"></div>';
                strHtml += '                <div class="col-xs-4">' + row.CoursePhaseName + '</div>';
                strHtml += '                <div class="col-xs-2">' + row.Periods + '</div>';
                strHtml += '                <div class="col-xs-2">' + type + '</div>';
                strHtml += '                <div class="col-xs-3">' + row.StartTime.split(" ")[0] + '</div>';
                strHtml += '            </div>';
                strHtml += '        </li>';
            }
        }
        strHtml += '    </ul>';
        strHtml += '</div>';
        $("#courselist").html(strHtml);
    }

}

function Student_Get() {
    Div_Show();
    $("#StudentName").val($("input[name=choose_student]:checked").attr("uname"));
    UserID = $("input[name=choose_student]:checked").val();
    console.log($("#StudentName").val());
    console.log(UserID);

    var param = {UserID: UserID,PhaseID: PhaseID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_Get_UserID");
    console.log(result);
    if (result.Msg == "OK") {
        var data = result.Data;
        PhaseType = data.PhaseType;
        CourseID = data.CourseID;
        if (PhaseType >= 2) {
            $("#service_five").hide();
        }
        if (data.CourseRegistrationID > 0) { // 判断是否报名过课程,如果课程预约的ID为0就代表未报名过该课程
            Entry = 1;
            $("#experience").hide(); // 如果已经报过名那么就隐藏体验课程选项
            if (data.ValueAddedServices == 1 || data.PhaseType >= 3) { // 判断是否有增值服务,如果一阶有选择增值服务5或者课程阶段在3阶及其之后隐藏增值服务选项
                $("#service").hide();
            } else {
                $("#service_five").hide();
            }
            $("#TuitionFeesPaid").val(data.TuitionFeesPaid);
            $("#Note").val(data.Note);
            $("#Money").val(data.Money);
            if (data.PhaseType >= 3) {
                $("#Parents").show();
            }
        }
    }
}

function Course_Get() {
    Div_Show();
    $("#CourseName").val($("input[name=choose_course]:checked").attr("uname"));
    PhaseID = $("input[name=choose_course]:checked").val();
    console.log($("#CourseName").val());
    console.log(PhaseID);

    if (UserID) {
        var param = {UserID: UserID,PhaseID: PhaseID};
        var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_Get_UserID");
        console.log(result);
        if (result.Msg == "OK") {
            var data = result.Data;
            PhaseType = data.PhaseType;
            CourseID = data.CourseID;
            if (PhaseType >= 2) {
                $("#service_five").hide();
            }
            if (data.CourseRegistrationID > 0) { // 判断是否报名过课程,如果课程预约的ID为0就代表未报名过该课程
                Entry = 1;
                $("#experience").hide(); // 如果已经报过名那么就隐藏体验课程选项
                if (data.ValueAddedServices == 1 || data.PhaseType >= 3) { // 判断是否有增值服务,如果一阶有选择增值服务5或者课程阶段在3阶及其之后隐藏增值服务选项
                    $("#service").hide();
                } else {
                    $("#service_five").hide();
                }
                $("#TuitionFeesPaid").val(data.TuitionFeesPaid);
                $("#Note").val(data.Note);
                $("#Money").val(data.Money);
                if (data.PhaseType >= 3) {
                    $("#Parents").show();
                }
            }
        }
    }
}

function Div_Show() {
    document.getElementsByName('optionsRadios')[0].checked=true;
    document.getElementById('isExperience').checked = false;
    $("#Tuition").show();
    $("#experience").show();
    $("#service").show();
    $("#service_five").show();
    $("#Parents").hide();
    $("#ParentsCount").val("");
    $("#TuitionFeesPaid").val("");
    $("#Note").val("");
    $("#Money").val("");
    Entry = 0;
    PhaseType = 0;
    CourseID = 0;
}

function StudentList_Show(strHtml) {
    layer.open({
        type: 1,
        title: '选择学生',
        area: ["800px", "600px"],
        content: $("#studentlist"),
        btn: ["确定","取消"],
        yes: function (index) {
            Student_Get();
            layer.close(index);
        },
        no: function () {

        }
    });
}

function CourseList_Show() {
    layer.open({
        type: 1,
        title: '选择课程',
        area: ["800px", "600px"],
        content: $("#courselist"),
        btn: ["确定","取消"],
        yes: function (index) {
            Course_Get();
            layer.close(index);
        },
        no: function () {

        }
    });
}