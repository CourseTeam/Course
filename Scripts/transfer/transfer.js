
var phase_result;
var phaseID;
var selCourseID;
var selCourseName;

$(function ($) {

    var sureButton = document.getElementById("sureButton");
    sureButton.onclick = function () {
        go_transfer();
    }
    $("#my-course").html($Course.RequestUrlParams("coursename"));
    $("#course-list").html("请选择转期课程");
    $("#course-list").on("click", function () {
        showlist();
    });
    get_data($Course.RequestUrlParams("phaseID"));
});

//访问转期接口
function go_transfer() {
    if (!selCourseID) {
        layer.open({content: "请选择转期课程", time: 2});
        return;
    }
    var PhaseReservationID = $Course.RequestUrlParams("PhaseReservationID");
    var param = {"PhaseID": phaseID, "NewPhaseID": selCourseID, PhaseReservationID: PhaseReservationID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_Change");
    if (result.Msg == "OK" && result.Data != false) {
        //转期成功
        window.location.href = "../book/booksuccess.html?type=0";
    }
}

function get_data(pid) {
    phaseID = pid;
    var param = {"PhaseID": pid};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_ChangePhase");
    if (result.Msg = "OK") {
        phase_result = result.Data;
        if (result.Data.length == 0) {
            $("#course-list").html("暂无可转期课程");
            $("#course-list").off("click");
        }
    }
}

function getvalue(name, coursename) {
    var str = window.location.search;   //location.search是从当前URL的?号开始的字符串
    if (str.indexOf(name) != -1) {
        var pos_start = str.indexOf(name) + name.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        var pid = str.substring(pos_start, pos_end);

    }
    if (str.indexOf(coursename) != -1) {
        var pos_start = str.indexOf(coursename) + coursename.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        var btn = document.getElementById("course-list");
        if (pos_end == -1) {

        }
    }
}

// var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_ChangePhase");

function showlist() {
    var strHtml = "";
    for (var i = 0; i < phase_result.length; i++) {
        var row = phase_result[i];
        var StartTime = row.StartTime ? row.StartTime.split(' ')[0] : "待定";
        var EndTime = row.EndTime ? row.EndTime.split(' ')[0] : "待定";
        strHtml += '<div class="radio">' +
            '<label>' +
            '<input type="radio" value="' + row.CoursePhaseName + "," + row.PhaseID + '"' + 'name="course">' + row.CoursePhaseName +
            '<br /><span>开始时间：' + StartTime + "     " + "结束时间：" + EndTime + '</span>' +
            '</label>' +
            '</div>';
    }

    layer.open({
        content: strHtml,
        btn: ["确定", "取消"],
        yes: function (index) {
            var id = $("input[name=course]:checked").val();
            selCourseID = id.split(",")[1];
            selCourseName = id.split(",")[0];
            $("#course-list").html(selCourseName);
            layer.close(index);
        }, no: function (index) {

        }
    });
}
