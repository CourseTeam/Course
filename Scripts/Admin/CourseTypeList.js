/**
 * Created by xuwei on 2016/9/27 0027.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
    $("#btnAdd").on("click", function () {
        Open_CourseType_Edit(0);
    });
    //加载课程类型列表
    CourseType_List();
});
var courseTypeID = 0;
//打开课程类别新增或编辑弹窗
function Open_CourseType_Edit(id) {
    var title = id > 0 ? "编辑课程类型" : "新增课程类型";
    courseTypeID = id;
    layer.open({
        skin: 'layui-layer-molv',
        type: 1,
        title: title,
        area: ["500px", "250px"],
        content: $("#EditBox")
    });

}
//课程类别新增或编辑
function CourseType_Edit() {
    var CourseTypeName = $("#CourseTypeName").val();
    if (CourseTypeName == "") {
        layer.msg("请输入课程类型名称！", {icon: 2, time: 2000});
        return;
    }
    var Type = $("select").val();
    var param = {CourseTypeID: courseTypeID, CourseTypeName: CourseTypeName, Type: Type};
    var result = $Course.PostAjaxJson(param, ApiUrl + "CourseType/CourseType_Edit");
    console.log(result);
    if (result.Msg == "OK") {
        layer.msg("保存成功！", {icon: 2, time: 2000});
    }
}

// 课程类型列表
function CourseType_List() {
    var param = {};
    var result = $Course.GetAjaxJson(param, ApiUrl + "CourseType/CourseType_List");
    if (result.Data.length > 0) {
        var strHtml = "";
        // strHtml += '<li class="list-group-item header">';
        // strHtml += '        <div class="row">';
        // strHtml += '            <div class="col-xs-5">课程类型名称</div>';
        // strHtml += '            <div class="col-xs-4">类型</div>';
        // strHtml += '            <div class="col-xs-3">操作</div>';
        // strHtml += '        </div>';
        // strHtml += '</li>';
        for (var i = 0; i < result.Data.length; i++) {
            var row = result.Data[i];
            strHtml += '<li class="list-group-item">';
            strHtml += '        <div class="row">';
            strHtml += '                <div class="col-xs-5">' + row.CourseTypeName + '</div>';
            strHtml += '                <div class="col-xs-4">' + row.Type + '</div>';
            strHtml += '                <div class="col-xs-3">';
            strHtml += '                    <button onclick="Open_CourseType_Edit(' + row.CourseTypeID + ')">修改</button>';
            strHtml += '                    <button>删除</button>';
            strHtml += '                </div>';
            strHtml += '        </div>';
            strHtml += '</li>';
        }
    }
    $(".list-group").append(strHtml);
}
