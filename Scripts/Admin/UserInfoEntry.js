/**
 * 录入学生信息
 * Created by wangbin on 2016/10/8.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
    $("#btnSave").on("click", function () {
        Phase_Edit();
    });
    var PhaseID = $Course.RequestUrlParams("PhaseID");
    // console.log(PhaseID);
    if (PhaseID != null) {
        Phase_Get(PhaseID);
    }
    laydate.skin("molv")
    laydate(BirthDay);
});


var BirthDay = {
    elem: '#BirthDay',
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