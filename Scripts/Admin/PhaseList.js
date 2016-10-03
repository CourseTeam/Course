/**
 * Created by xuwei on 2016/10/2 0002.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
});

var CourseID = $Course.RequestUrlParams("CourseID");

function Phase_List() {
    var param = {CourseID: CourseID};
    var result=$Course.GetAjaxJson(param,ApiUrl+"Phase/Phase_List");
    console.log(result)
}

Phase_List();