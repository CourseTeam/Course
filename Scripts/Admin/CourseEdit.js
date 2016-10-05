/**
 * Created by xuwei on 2016/9/29 0029.
 */
$(function ($) {
    $("#header").load("../Commen/header.html");
    $('#summernote').summernote({
        lang: 'zh-CN',
        focus: true,
        height: 150,   //set editable area's height
        codemirror: { // codemirror options
            theme: 'monokai'
        }
    });
    $("#btnSave").on("click", function () {
        CourseInfo_Edit();
    });
    var CourseID = $Course.RequestUrlParams("CourseID");
    if (CourseID != null) {
        CourseInfo_Get(CourseID);
    }
})

var CourseID = $Course.RequestUrlParams("CourseID") || 0;
console.log(CourseID);
var CourseImgUrl = "";
var fileinit = $('#file-Portrait').fileinput({
    language: 'zh', //设置语言
    uploadUrl: ApiUrl + "File/ImgFileUpload", //上传的地址
    allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀,
    maxFileCount: 1,
    enctype: 'multipart/form-data',
    showUpload: true, //是否显示上传按钮
    showCaption: false,//是否显示标题
    browseClass: "btn btn-primary", //按钮样式
    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
    msgFilesTooMany: "只允许选择一张图片！"
    //msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
}).on("filebatchselected", function (event, files) {
    $(this).fileinput("upload");
}).on("fileuploaded", function (event, data) {
    if (data.response) {
        console.log(data);
        CourseImgUrl = data.response.Data;
    }
});
//课程编辑或新增
function CourseInfo_Edit() {
    var CourseName = $("#CourseName").val();
    //var CurrentPeople = $("#CurrentPeople").val();
    var Tuition = $("#Tuition").val();
    var Intro = $("#summernote").summernote("code");
    var CourseType = $("select").val();
    if (!CourseName) {
        layer.msg("请输入课程名称！", {icon: 2, time: 2000});
        return;
    }
    if (!Tuition) {
        layer.msg("请输入学费！", {icon: 2, time: 2000});
        return;
    }
    if (!Intro) {
        layer.msg("请输入课程介绍！", {icon: 2, time: 2000});
        return;
    }
    if (CourseImgUrl == "") {
        layer.msg("请上传课程图片！", {icon: 2, time: 2000});
        return;
    }

    var param = {
        CourseID: CourseID,
        CourseName: CourseName,
        Tuition: Tuition,
        Intro: Intro,
        CourseImgUrl: CourseImgUrl,
        CourseType: CourseType
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "Course/CourseInfo_Edit");
    if (result.Msg == "OK") {
        layer.msg("保存成功！", {icon: 1, time: 2000}, function () {
            window.location.href = "CourseList.html";
        });
    }
}

function CourseInfo_Get(CourseID) {
    var param = {CourseID: CourseID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_Get");
    console.log(result);
    $("#CourseName").val(result.Data.CourseName);
    $("#Tuition").val(result.Data.Tuition);
    $("#summernote").summernote("code", result.Data.Intro);
    $("select").val(result.Data.CourseType);
    $("#imgbox").html("<img src='" + result.Data.CourseImgUrl + "' style='width: 150px;height: 150px;' />");
    CourseImgUrl = result.Data.CourseImgUrl;
    //$(".file-preview").hide();
}