/**
 * 课程预约列表
 * Created by wangbin on 2016/10/5.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    var CourseName = decodeURIComponent($Course.RequestUrlParams("CourseName"));
    $("#CourseName").html('课程预约列表 — ' + CourseName);

    $("#btnSearch").on("click", function () {
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
                var Birthday = row.BirthDay ? row.BirthDay.split(' ')[0] : "未设置";
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row ">';
<<<<<<< HEAD
                strHtml += '        <div class="col-xs-2"> <a href="../User/UserEdit.html?type=1&UserID=' + row.UserID + '" target="_blank">' + row.NickName + '</a></div>';
=======
                strHtml += '        <div class="col-xs-2">';
                strHtml += '        <a href="../User/UserEdit.html?type=1&UserID='+ row.UserID+'" target="_blank">' + row.NickName + '</a>';
                if (row.IsExperience == 1) {
                    strHtml += '        <img title="体验名额" style="width: 20px; height: 20px;" src="../../../Images/experience.png">';
                }
                strHtml += '        </div>';
>>>>>>> 56c6f18abcd857df3391ce8ab83d16df9bcf1936
                strHtml += '        <div class="col-xs-1">' + row.Phone + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.Sex + '</div>';
                strHtml += '        <div class="col-xs-1">' + Birthday + '</div>';
                strHtml += '        <div class="col-xs-1" style="text-align: right;"><a href="#" onclick="TuitionFeesPaid_Eidt(' + row.TuitionFeesPaid + ',' + row.CourseRegistrationID + ')">' + row.TuitionFeesPaid + '</a>元</div>';
                strHtml += '        <div class="col-xs-1"><a href="#" onclick="ValueAddedServicesShow(this)" va="' + row.ValueAddedServices + '">查看</a></div>';
                strHtml += '        <div class="col-xs-2">' + CreateTime + '</div>';
                strHtml += '        <div class="col-xs-2">';
<<<<<<< HEAD
                strHtml += '            <button onclick="CourseRegistration_Refund(' + row.UserID + ')">退费</button>';
                strHtml += '            <button onclick="CourseRegistration_NoteAndMoney_Upd(' + row.CourseRegistrationID + ')">备注</button>';
                row.CourseRegistrationID
=======
                if (row.CourseStatus == 1) {
                    strHtml += '            <button style="background-color: #9B9B9B;" disabled>已退费</button>';
                } else {
                    strHtml += '            <button onclick="CourseRegistration_Refund(' + row.CourseRegistrationID + ')">退费</button>';
                }
                strHtml += '            <button onclick="NoteEdit(' + row.CourseRegistrationID + ')">备注</button>';
>>>>>>> 56c6f18abcd857df3391ce8ab83d16df9bcf1936
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }
        }
        $("#CourseReservation_List").html(strHtml);


    }
}

//查看增值服务
function ValueAddedServicesShow(obj) {
    var str = "";
    // 0.不需要此服务
    // 1.统一版摩英回忆视频300元(单阶7天)
    // 2.VIP摩英大电影1980元(单阶7天)
    // 3.VIP蜕变水晶相册1280元(单阶7天)
    // 4.VIP摩英大电影+VIP蜕变水晶相册2680元 单阶7天性价比极高(单阶7天)
    // 5.VIP摩英大电影+VIP蜕变水晶相册3980元 两阶14天性价比极高(单阶7天)

    var arr = $(obj).attr("va").split(",");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == "") {
            break;
        }
        // debugger
        str += "用户选择第" + arr[i].split("wbxw")[0] + "阶段的增值服务是:";
        console.log(arr[i].split("wbxw")[1]);
        switch(parseInt(arr[i].split("wbxw")[1])) {
            case 0:
                str += "无\n";
                break;
            case 1:
                str += "统一版摩英回忆视频300元(单阶7天)\n";
                break;
            case 2:
                str += "VIP摩英大电影1980元(单阶7天)\n";
                break;
            case 3:
                str += "VIP摩英大电影1980元(单阶7天)\n";
                break;
            case 4:
                str += "VIP摩英大电影+VIP蜕变水晶相册2680元 单阶7天性价比极高(单阶7天)\n";
                break;
            case 5:
                str += "VIP摩英大电影+VIP蜕变水晶相册3980元 两阶14天性价比极高(单阶7天)\n";
                break;
            default:
                break;
        }
    }

    layer.open({
        title: "已选增值服务",
        skin: "layui-layer-molv",
        area: ["300px", "200px"],
        content: str
    });
}

<<<<<<< HEAD
function CourseRegistration_NoteAndMoney_Upd(CourseRegistrationID) {
=======
function NoteEdit(CourseRegistrationID) {
>>>>>>> 56c6f18abcd857df3391ce8ab83d16df9bcf1936
    layer.open({
        type: 2,
        skin: "layui-layer-molv",
        title: '修改备注',
        area: ["500px", "380px"],
        content: "../Commen/Note.html?CourseRegistrationID=" + CourseRegistrationID
    });
<<<<<<< HEAD
=======
}

function TuitionFeesPaid_Eidt(TuitionFeesPaid,CourseRegistrationID) {
    layer.open({
        type: 1,
        title: "已交学费",
        skin: "layui-layer-molv",
        area: ["340px", "220px"],
        content: $("#Tuition"),
        btn: ["确 定", '取 消'],
        yes: function (index) {
            var param = {CourseRegistrationID: CourseRegistrationID, TuitionFeesPaid: $("#TuitionFeesPaid").val()};
            var result = $Course.PostAjaxJson(param, ApiUrl + "CourseRegistration/CourseReg_TuitionFeesPaid_Upd");
            if (result.Msg == "OK") {
                layer.msg("修改成功！", {icon: 1, time: 2000}, function () {
                    window.location.href = window.location.href;
                });
                layer.close(index);
            }
        },
        success: function () {
            $("#TuitionFeesPaid").val(TuitionFeesPaid);
        }
    });
}

function CourseRegistration_Refund(CourseRegistrationID) {
    layer.confirm("确定要退费吗？",function () {
        var param = {CourseRegistrationID:CourseRegistrationID};
        var result = $Course.PostAjaxJson(param, ApiUrl + "CourseRegistration/CourseReg_Status_Upd");
        if (result.Msg == "OK") {
            layer.msg("退费成功",{icon:1, time:2000},function () {
                window.location.href = window.location.href;
            });
        }
    });
>>>>>>> 56c6f18abcd857df3391ce8ab83d16df9bcf1936

}