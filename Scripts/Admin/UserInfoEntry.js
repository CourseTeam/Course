/**
 * 录入学生信息
 * Created by wangbin on 2016/10/8.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
    $("#btnSave").on("click", function () {
        Edit();
    });
    $("#choose").on("click", function () {
        StudentList_Show();
    });
    // $("#")
    StudentList();

});

var UserID = 0;
var PhaseID = 0;
var CourseID = 0;

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
                strHtml += '                <div class="col-xs-1"><input style="width: 20px; height: 20px;padding:0px;margin-left: 10px;" type="radio" name="choose" value="' + row.UserID + '" uname="' + row.NickName + '" ></div>';
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

function Student_Get() {
    Div_Show();
    $("#StudentName").val($("input[name=choose]:checked").attr("uname"));
    UserID = $("input[name=choose]:checked").val();
    console.log($("#StudentName").val());
    console.log(UserID);

    var param = {UserID: UserID,PhaseID: 18};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_Get_UserID");
    console.log(result);
    if (result.Msg == "OK") {
        var data = result.Data;
        if (data.CourseRegistrationID > 0) { // 判断是否报名过课程,如果课程预约的ID为0就代表未报名过该课程
            $("#experience").hide(); // 如果已经报过名那么就隐藏体验课程选项
            if (data.ValueAddedServices == 1 || data.PhaseType >= 3) { // 判断是否有增值服务,如果一阶有选择增值服务5或者课程阶段在3阶及其之后隐藏增值服务选项
                $("#service").hide();
            } else {
                $("#service_five").hide();
            }
            $("#TuitionFeesPaid").val(data.TuitionFeesPaid);
            $("#Note").val(data.Note);
            $("#Money").val(data.Money);
        } else {
            // if ()
        }
    }
}

function Div_Show() {
    $("#experience").show();
    $("#service").show();
    $("#service_five").show();
    $("#TuitionFeesPaid").val("");
    $("#Note").val("");
    $("#Money").val("");
    $("input[type=radio][name=optionsRadios][value=0]").attr("checked",'checked');
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