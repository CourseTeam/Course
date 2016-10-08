/**
 * Created by xuwei on 2016/10/3 0003.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
    CourseType_List();
    $("#btnSave").on("click", function () {
        Phase_Edit();
    });
    var PhaseID = $Course.RequestUrlParams("PhaseID");
    // console.log(PhaseID);
    if (PhaseID != null) {
        Phase_Get(PhaseID);
    }
    laydate.skin("molv");
    laydate(start);
    laydate(end);
});

var CourseID = $Course.RequestUrlParams("CourseID");
var PhaseID = $Course.RequestUrlParams("PhaseID") || 0;
var teacherids = [];

function CourseType_List() {
    var param = {};
    var result = $Course.GetAjaxJson(param, ApiUrl + "CourseType/CourseType_List");
    $("#CourseType").html("");
    var strHtml = "";
    if (result.Msg == "OK") {
        for (var i = 0; i < result.Data.length; i++) {
            var row = result.Data[i];
            strHtml += '<option value="' + row.CourseTypeID + '">' + row.CourseTypeName + '</option>';
        }
        $("#CourseType").html(strHtml);
    }
}

var TeacherList = {};
//教师列表
function TeacherInfo_List() {
    var param = {};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Teacher/TeacherInfo_List");
    console.log(result);
    if (result.Msg == "OK") {
        TeacherList = result.Data;
        var strHtml = "";
        for (var i = 0; i < result.Data.length; i++) {
            var row = result.Data[i];
            strHtml += '<div class="row">';
            strHtml += '    <div class="col-xs-1"><input style="width: 15px;height: 15px" name="teacher" type="checkbox" value="' + row.TeacherID + '" /></div>';
            strHtml += '    <div class="col-xs-10">' + row.TeacherName + '</div>';
            strHtml += '</div>';
        }

        $("#TeacherList").html(strHtml);
    }
}

TeacherInfo_List();


function TeacherBox() {
    layer.open({
        type: 1,
        title: '选择教师',
        area: ["320px", "300px"],
        content: $("#TeacherBox"),
        success: function () {

        }
    });
    //teacherids = [1];
    //$('input:checkbox[name=teacher]').attr("checked", false);
    $('input:checkbox[name=teacher]').each(function (i) {
        for (var i = 0; i < teacherids.length; i++) {
            if (teacherids[i] == $(this).val()) {
                $(this).attr("checked", true);
            }
        }
        console.log(teacherids);
    });
}
// TeacherBox();
//添加教师
function AddTeacher() {
    $("#teachered").html("");
    teacherids = [];
    $('input:checkbox[name=teacher]:checked').each(function (i) {
        teacherids.push($(this).val());
    });

    console.log(teacherids);

    Teacher_AddHtml();

    layer.closeAll();
}

function Teacher_AddHtml() {
    var strHtml = "";
    for (var i = 0; i < teacherids.length; i++) {
        for (var j = 0; j < TeacherList.length; j++) {
            var bg = "background: url('" + TeacherList[j].TeacherImg + "');";
            if (teacherids[i] == TeacherList[j].TeacherID) {
                strHtml += ' <div class="pull-left imgheader" id="tid_' + teacherids[i] + '">';
                //strHtml += '    <div onclick="DelTeacher(' + teacherids[i] + ')">X</div>';
                strHtml += '    <button style="' + bg + ';background-size: 100%;"></button>';
                strHtml += '</div>';
            }
        }
    }
    strHtml += ' <div class="pull-left imgheader">';
    strHtml += '    <button onclick="TeacherBox()">+</button>';
    strHtml += '</div>';
    $("#teachered").html(strHtml);
}

function DelTeacher(id) {
    $("#tid_" + id).remove();
    for (var i = 0; i < teacherids.length; i++) {
        if (teacherids[i] == id) {
            teacherids.splice(i, 1);
            i--;
        }
    }
    console.log(teacherids)
}

function Phase_Edit() {
    var CourseTypeID = $("#CourseType").val();
    var PhaseType = $("#PhaseType").val();
    var StartTime = $("#StartTime").val();
    var EndTime = $("#EndTime").val();
    var Periods = $("#Periods").val();
    var Teachers = ""
    for (var i = 0; i < teacherids.length; i++) {
        Teachers += teacherids[i] + ',';
    }
    var Place = $("#Place").val();
    var AccommodationCost = $("#AccommodationCost").val();
    var PeopleCount = $("#PeopleCount").val();
    var param = {
        PhaseID: PhaseID,
        PhaseType:PhaseType,
        CourseTypeID: CourseTypeID,
        CourseID: CourseID,
        StartTime: StartTime,
        EndTime: EndTime,
        Periods: Periods,
        Teachers: Teachers,
        Place: Place,
        AccommodationCost: AccommodationCost,
        PeopleCount: PeopleCount
    }
    console.log(param);
    var result = $Course.PostAjaxJson(param, ApiUrl + "Phase/Phase_Edit");
    if (result.Msg == "OK") {
        layer.msg("保存成功！", {icon: 1, time: 2000}, function () {
            window.location.href = "PhaseList.html?CourseID=" + CourseID;
        });
    }
}

function Phase_Get(PhaseID) {
    var param = {PhaseID: PhaseID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_Get");
    console.log(result);
    // $("#year").val(values.split("-")[0]);
    $("#CourseType").val(result.Data.CourseTypeID);
    $("#PhaseType").val(result.Data.PhaseType);
    $("#StartTime").val(result.Data.StartTime.split(" ")[0]);
    $("#EndTime").val(result.Data.EndTime.split(" ")[0]);
    $("#Periods").val(result.Data.Periods);
    $("#Place").val(result.Data.Place);
    $("#AccommodationCost").val(result.Data.AccommodationCost);
    $("#PeopleCount").val(result.Data.PeopleCount);
    teacherids = result.Data.Teachers.split(",")
    Teacher_AddHtml();
}

var start = {
    elem: '#StartTime',
    format: 'YYYY-MM-DD',
    min: laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16 23:59:59', //最大日期
    istime: true,
    istoday: false,
    choose: function (datas) {
        end.min = datas; //开始日选好后，重置结束日的最小日期
        end.start = datas //将结束日的初始值设定为开始日
    }
};
var end = {
    elem: '#EndTime',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: '2099-06-16 23:59:59',
    istime: true,
    istoday: false,
    choose: function (datas) {
        start.max = datas; //结束日选好后，重置开始日的最大日期
    }
};

function GetDate() {

    return 123;
}
