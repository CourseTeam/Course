/**
 * Created by xuwei on 2016/10/5 0005.
 */

var PStatus = 0;
var PageIndex = 1;
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
    $("#btnAdd").on("click", function () {
        UserInfoEntry();
    });
    $("#btnImport").on("click", function () {
        window.location.href = ApiUrl + "File/PhaseReg_Excel?PhaseID=" + $Course.RequestUrlParams("PhaseID");
    });
    layer.skin = "layui-layer-molv";
    PhaseRegistration_List();
    var CoursePhaseName = decodeURIComponent($Course.RequestUrlParams("CoursePhaseName"));
    $("#paseName").html("阶段预约列表 — " + CoursePhaseName);
    $("#Select").on("change", function () {
        PStatus = $("#Select").val();
        console.log(PStatus);
        PageIndex = 1;
        PhaseRegistration_List();
    });
    $("#btnSearch").on("click", function () {
        PageIndex = 1;
        PhaseRegistration_List();
    });
});

function UserInfoEntry() {
    var PhaseID = $Course.RequestUrlParams("PhaseID");
    var CoursePhaseName = decodeURIComponent($Course.RequestUrlParams("CoursePhaseName"));
    window.location.href = "../User/UserInfoEntry.html?PhaseID=" + PhaseID + '&CoursePhaseName=' + CoursePhaseName;
}
var PhaseRegistration_Items = [];
//阶段预约列表
function PhaseRegistration_List() {
    var PhaseID = $Course.RequestUrlParams("PhaseID");
    var SearchKey = $("#SearchKey").val();
    var param = {SearchKey: SearchKey, PhaseID: PhaseID, PhaseStatus: PStatus, PageIndex: PageIndex, PageSize: 10};
    var result = $Course.GetAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseRegistration_List");
    if (result.Msg == "OK") {
        $("#orderList").html("");
        $("#Page").html("");
        PhaseRegistration_Items = result.Data;
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row ">';
        strHtml += '      <div class="col-xs-1">姓名</div>';
        strHtml += '      <div class="col-xs-1">性别</div>';
        strHtml += '      <div class="col-xs-1">生日</div>';
        strHtml += '      <div class="col-xs-1">手机</div>';
        strHtml += '      <div class="col-xs-1">食宿费</div>';
        strHtml += '      <div class="col-xs-1">班级</div>';
        strHtml += '      <div class="col-xs-1">状态</div>';
        strHtml += '      <div class="col-xs-1">预约日期</div>';
        strHtml += '      <div class="col-xs-1">增值服务</div>';
        strHtml += '      <div class="col-xs-3">操作</div>';
        strHtml += '    </div>';
        strHtml += '    </li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                var birthday = row.Birthday ? row.Birthday.split(" ")[0].replace(/-/g, "/") : "";
                var PhaseStatus = "";
                //1预约中, 2.候补中, 3.预约成功, 4.已参加, 5.已退费
                switch (row.PhaseStatus) {
                    case 1:
                        PhaseStatus = "预约中";
                        break;
                    case 2:
                        PhaseStatus = "候补中";
                        break;
                    case 3:
                        PhaseStatus = "预约成功";
                        break;
                    case 4:
                        PhaseStatus = "已参加";
                        break;
                    case 5:
                        PhaseStatus = "已退费";
                        break;
                    default:
                        break;
                }
                var ValueAddedServices = "";
                switch (row.ValueAddedServices) {
                    case 0:
                        ValueAddedServices = "无";
                        break;
                    case 1:
                        ValueAddedServices = "300套餐";
                        break;
                    case 2:
                        ValueAddedServices = "1980套餐";
                        break;
                    case 3:
                        ValueAddedServices = "1980套餐";
                        break;
                    case 4:
                        ValueAddedServices = "2680套餐";
                        break;
                    case 5:
                        ValueAddedServices = "3980套餐";
                        break;
                    default:
                        break;
                }
                var ClassName = row.ClassName ? row.ClassName : '指定班级';
                var AddTime = row.AddTime ? row.AddTime.split(" ")[0].replace(/-/g, "/") : "";
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row ">';
                strHtml += '      <div class="col-xs-1" title="点击查看用户详细信息"><a href="../User/UserEdit.html?type=1&UserID=' + row.UserID + '" target="_blank">' + row.NickName + '</a></div>';
                strHtml += '      <div class="col-xs-1">' + row.Sex + '</div>';
                strHtml += '      <div class="col-xs-1">' + birthday + '</div>';
                strHtml += '      <div class="col-xs-1">' + row.Phone + '</div>';
                strHtml += '      <div class="col-xs-1"><a href="#" onclick="AccommodationFeesPaid_Add(' + row.PhaseReservationID + ',' + row.AccommodationFeesPaid + ')">' + row.AccommodationFeesPaid + '</a>元</div>';
                strHtml += '      <div class="col-xs-1"><a href="#" onclick="Phase_ClassName_Add(' + row.PhaseReservationID + ',this)" cname="' + ClassName + '">' + ClassName + '</a></div>';
                strHtml += '      <div class="col-xs-1">' + PhaseStatus + '</div>';
                strHtml += '      <div class="col-xs-1">' + AddTime + '</div>';
                strHtml += '      <div class="col-xs-1">' + ValueAddedServices + '<!--<a href="#" onclick="ValueAddedServicesShow(' + row.UserID + ')">查看</a>--></div>';
                strHtml += '      <div class="col-xs-3">';
                strHtml += '        <button class="autobutton" onclick="PhaseStatus_Edit(' + row.PhaseReservationID + ',' + row.PhaseStatus + ',' + row.UserID + ')" >修改状态</button>';
                strHtml += '        <button class="autobutton" onclick="NoteEdit(' + row.CourseRegistrationID + ')">备注</button>';
                if (row.PhaseStatus == 3) {
                    strHtml += '        <button class="autobutton" onclick="Past(' + row.PhaseReservationID + ',' + row.UserID + ')">签到</button>';
                }
                if (row.PhaseStatus < 4) {
                    strHtml += '        <button class="autobutton" onclick="Phase_ChangeBox(' + row.PhaseReservationID + ')">转期</button>';
                }
                strHtml += '      </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }
            $("#orderList").html(strHtml);
            laypage({
                cont: $("#Page"), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: Math.ceil(result.Data[0].RowsCount / 10), //通过后台拿到的总页数
                curr: PageIndex || 1, //当前页,
                skip: true, //是否开启跳页
                skin: '#AF0000',
                groups: 3, //连续显示分页数
                jump: function (obj, first) { //触发分页后的回调
                    if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                        PageIndex = obj.curr;
                        PhaseRegistration_List();
                    }
                }
            });
        }
    }
}

//查看增值服务
function ValueAddedServicesShow(id) {
    var str = "";
    // 0.不需要此服务
    // 1.统一版摩英回忆视频300元(单阶7天)
    // 2.VIP摩英大电影1980元(单阶7天)
    // 3.VIP蜕变水晶相册1280元(单阶7天)
    // 4.VIP摩英大电影+VIP蜕变水晶相册2680元 单阶7天性价比极高(单阶7天)
    // 5.VIP摩英大电影+VIP蜕变水晶相册3980元 两阶14天性价比极高(两阶14天)
    for (var i = 0; i < PhaseRegistration_Items.length; i++) {
        if (id == PhaseRegistration_Items[i].UserID) {
            switch (PhaseRegistration_Items[i].ValueAddedServices) {
                case 0:
                    str = "该学员本期课程没有选择任何增值服务";
                    break;
                case 1:
                    str = "统一版摩英回忆视频300元(单阶7天)";
                    break;
                case 2:
                    str = "VIP摩英大电影1980元(单阶7天)";
                    break;
                case 3:
                    str = "VIP摩英大电影1980元(单阶7天)";
                    break;
                case 4:
                    str = "VIP摩英大电影+VIP蜕变水晶相册2680元 单阶7天性价比极高(单阶7天)";
                    break;
                case 5:
                    str = "VIP摩英大电影+VIP蜕变水晶相册3980元 两阶14天性价比极高(两阶14天)";
                    break;
                default:
                    break;
            }
        }
    }
    layer.open({
        title: "已选增值服务",
        skin: "layui-layer-molv",
        area: ["300px", "200px"],
        content: str
    });
}

//编辑食宿费
function AccommodationFeesPaid_Add(PhaseReservationID, money) {
    layer.open({
        type: 1,
        title: "已交食宿费用",
        skin: "layui-layer-molv",
        area: ["340px", "220px"],
        content: $("#moneyBox"),
        btn: ["确 定", '取 消'],
        yes: function (index) {
            var PhaseID = $Course.RequestUrlParams("PhaseID");
            var param = {PhaseReservationID: PhaseReservationID, AccommodationFeesPaid: $("#money").val()};
            var result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/AccommodationFeesPaid_Add");
            if (result.Msg == "OK") {
                PhaseRegistration_List();
                layer.msg("修改成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        },
        success: function () {
            $("#money").val(money);
        }
    });
}

//编辑班级
function Phase_ClassName_Add(PhaseReservationID, obj) {
    layer.open({
        type: 1,
        title: "分配班级",
        skin: "layui-layer-molv",
        area: ["340px", "220px"],
        content: $("#classNameBox"),
        btn: ["确 定", '取 消'],
        yes: function (index) {
            var PhaseID = $Course.RequestUrlParams("PhaseID");
            var param = {PhaseReservationID: PhaseReservationID, ClassName: $("#className").val()};
            var result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/Phase_ClassName_Add");
            if (result.Msg == "OK") {
                PhaseRegistration_List();
                layer.msg("修改成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        },
        success: function () {
            $("#className").val($(obj).attr("cname"));
        }
    });
}

//修改状态
function PhaseStatus_Edit(PhaseReservationID, PhaseStatus, UserID) {
    layer.open({
        type: 1,
        title: "修改状态",
        skin: "layui-layer-molv",
        area: ["340px", "220px"],
        content: $("#phaseStatusBox"),
        btn: ["确 定", '取 消'],
        yes: function (index) {
            var param = {
                PhaseReservationID: PhaseReservationID,
                UserID: UserID,
                PhaseStatus: $("#phaseStatusBox select").val()
            };
            var result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseStatus_Edit");
            if (result.Msg == "OK") {
                PhaseRegistration_List();
                layer.msg("修改成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        },
        success: function () {
            $("#phaseStatusBox select").val(PhaseStatus);
        }
    });
}
//修改备注
function NoteEdit(CourseRegistrationID) {
    layer.open({
        type: 2,
        skin: "layui-layer-molv",
        title: '修改备注',
        area: ["500px", "380px"],
        content: "../Commen/Note.html?CourseRegistrationID=" + CourseRegistrationID
    });
}

//签到
function Past(PhaseReservationID, UserID) {
    layer.confirm("确定学员已到场？", function () {
        var param = {
            PhaseReservationID: PhaseReservationID,
            PhaseStatus: 4,
            UserID: UserID
        };
        var result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseStatus_Edit");
        if (result.Msg == "OK") {
            PhaseRegistration_List();
            layer.msg("修改成功！", {icon: 1, time: 2000}, function () {
                layer.closeAll();
            });
        }
    });
}

//转期列表
var Phase_Change_Items = [];
function Phase_ChangeBox(PhaseReservationID) {
    var PhaseID = $Course.RequestUrlParams("PhaseID");
    if (Phase_Change_Items.length == 0) {
        var param = {PhaseID: PhaseID};
        var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_ChangePhase");
        if (result.Msg == "OK") {
            if (result.Data.length > 0) {
                Phase_Change_Items = result.Data;
                var strHtml = "";
                for (var i = 0; i < Phase_Change_Items.length; i++) {
                    var row = Phase_Change_Items[i];
                    if (i == 0) {
                        strHtml += '<div class="radio">';
                        strHtml += '    <label><input type="radio" name="Phase" value="' + row.PhaseID + '" checked>' + row.CoursePhaseName + '</label> ';
                        strHtml += '</div>';
                    } else {
                        strHtml += '<div class="radio">';
                        strHtml += '    <label><input type="radio" name="Phase" value="' + row.PhaseID + '">' + row.CoursePhaseName + '</label> ';
                        strHtml += '</div>';
                    }
                }
                $("#Phase_ChangeBox div").html(strHtml);
            } else {
                layer.msg("没有可转期课程！", {icon: 2, time: 2000});
                return;
            }
        }
    }
    layer.open({
        type: 1,
        title: "可转期课程",
        skin: "layui-layer-molv",
        area: ["380px", "250px"],
        content: $("#Phase_ChangeBox"),
        btn: ["确 定", '取 消'],
        yes: function (index) {
            var NewPhaseID = $("input[name=Phase]:checked").val();
            var param = {PhaseReservationID: PhaseReservationID, PhaseID: PhaseID, NewPhaseID: NewPhaseID};
            var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_Change");
            if (result.Msg == "OK") {
                layer.msg("转期成功！", {icon: 1, time: 2000});
                PageIndex = 1;
                PhaseRegistration_List();
            }
            layer.close(index);
        }
    });
}