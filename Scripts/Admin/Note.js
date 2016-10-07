/**
 * Created by xuwei on 2016/10/7 0007.
 */



$(function ($) {
    CourseRegistration_Note_Get();
});

var CourseRegistrationID = $Course.RequestUrlParams("CourseRegistrationID");

//获取备注信息和缴费方式
function CourseRegistration_Note_Get() {
    var param = {CourseRegistrationID: CourseRegistrationID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "CourseRegistration/CourseRegistration_Note_Get");
    console.log(result);
    if (result.Msg == "OK") {
        $("#note").val(result.Data.Note);
        $("#money").val(result.Data.Money);
    }
}

function NoteEdit() {
    var param = {CourseRegistrationID:CourseRegistrationID,Note: $("#note").val(), Money: $("#money").val()};
    var result = $Course.GetAjaxJson(param, ApiUrl + "CourseRegistration/PhaseRegistration_PhaseStatus_Upd");
    if (result.Msg == "OK") {
        layer.msg("修改成功！", {icon: 1, time: 2000}, function () {
            window.parent.layer.closeAll();
        })
    }
}

function closeBox() {
    window.parent.layer.closeAll();
}
