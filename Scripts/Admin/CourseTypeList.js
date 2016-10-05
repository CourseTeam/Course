/**
 * Created by xuwei on 2016/9/27 0027.
 */
$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");
    $("#btnAdd").on("click", function () {
        Open_CourseType_Edit(0);
    });
    layer.skin="layui-layer-molv";
    $("#btnSave").on("click", function () {
        CourseType_Edit();
    });
    //加载课程类型列表
    CourseType_List();
});

var courseType = {};



var courseTypeID = 0;

//打开课程类别新增或编辑弹窗
function Open_CourseType_Edit(obj) {
    console.log(obj);
    var title = obj == 0 ? "新增课程类型" : "编辑课程类型";
    if (obj == 0) {
        courseType.CourseTypeID = 0;
        $("#CourseTypeName").val("");
        $("select").val(1);
    } else {
        courseType.CourseTypeID = $(obj).attr("cid");
        courseType.CourseTypeName = $(obj).attr("cname");
        $("#CourseTypeName").val($(obj).attr("cname"));
        if ($(obj).attr("ctype") == '学生课程') {
            $("select").val(1);
        }
        if ($(obj).attr("ctype") == '家长课程') {
            $("select").val(2);
        }
        if ($(obj).attr("ctype") == '亲子课程') {
            $("select").val(3);
        }
        console.log(courseType)
    }
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
    var param = {CourseTypeID: courseType.CourseTypeID, CourseTypeName: CourseTypeName, Type: Type};

    var result = $Course.PostAjaxJson(param, ApiUrl + "CourseType/CourseType_Edit");
    console.log(result);
    if (result.Msg == "OK") {
        layer.msg("保存成功！", {icon: 1, time: 2000}, function () {
            layer.closeAll();
            CourseType_List();
        });
    } else {
        layer.msg("保存失败，请联系管理员！", {icon: 2, time: 2000}, function () {
            layer.closeAll();
        });
    }
}

// 课程类型列表
function CourseType_List() {
    var param = {};
    var result = $Course.GetAjaxJson(param, ApiUrl + "CourseType/CourseType_List");
    if (result.Msg == "OK") {
        if (result.Data.length > 0) {
            var strHtml = "";
            strHtml += '<li class="list-group-item header">';
            strHtml += '        <div class="row">';
            strHtml += '            <div class="col-xs-5">课程类型名称</div>';
            strHtml += '            <div class="col-xs-4">类型</div>';
            strHtml += '            <div class="col-xs-3">操作</div>';
            strHtml += '        </div>';
            strHtml += '</li>';
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<li class="list-group-item">';
                strHtml += '        <div class="row">';
                strHtml += '                <div class="col-xs-5">' + row.CourseTypeName + '</div>';
                strHtml += '                <div class="col-xs-4">' + row.Type + '</div>';
                strHtml += '                <div class="col-xs-3">';
                strHtml += '                    <button cid="' + row.CourseTypeID + '" cname="' + row.CourseTypeName + '" ctype="' + row.Type + '" onclick="Open_CourseType_Edit(this)">修改</button>';
                strHtml += '                    <button onclick="CourseType_Del(' + row.CourseTypeID + ')">删除</button>';
                strHtml += '                </div>';
                strHtml += '        </div>';
                strHtml += '</li>';
            }
        }
    }
    $("#courseType_list").html(strHtml);
}

//课程类型删除
function CourseType_Del(id) {
    layer.confirm("确定要删除吗？", function () {
        var param = {CourseTypeID: id};
        var result = $Course.GetAjaxJson(param, ApiUrl + "CourseType/CourseType_Del");
        if (result.Msg == "OK") {
            if (result.Data) {
                layer.msg("删除成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                    CourseType_List();
                });
            } else {
                layer.msg("删除失败，请联系管理员！", {icon: 2, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        }
    });
}