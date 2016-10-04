/**
 * 新增/编辑教师
 * Created by wangbin on 2016/10/4.
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
        TeacherInfo_Edit();
    });
    var TeacherID = $Course.RequestUrlParams("TeacherID");
    if (TeacherID != null) {
        // TeacherInfo_Get(TeacherID);
    }
})

var TeacherID = $Course.RequestUrlParams("TeacherID") || 0;
console.log(TeacherID);
var TeacherImg = "";
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
        TeacherImg = data.response.Data;
    }
});

function TeacherInfo_Edit() {
    var TeacherName = $("#TeacherName").val();
    var Intro = $("#summernote").summernote("code");
    if (!TeacherName) {
        layer.msg("请输入教师姓名！", {icon: 2, time: 2000});
        return;
    }
    if (!Intro) {
        layer.msg("请输入教师介绍！", {icon: 2, time: 2000});
        return;
    }
    if (TeacherImg == "") {
        layer.msg("请上传教师图片！", {icon: 2, time: 2000});
        return;
    }

    var param = {
        TeacherID: TeacherID,
        TeacherName: TeacherName,
        Intro: Intro,
        TeacherImg: TeacherImg,
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "Teacher/TeacherInfo_Edit");
    if (result.Msg == "OK") {
        layer.msg("保存成功！", {icon: 2, time: 2000}, function () {
            window.location.href = "TeacherList.html";
        });
    }
}

// function TeacherInfo_Get(TeacherID) {
//     var param = {TeacherID:TeacherID};
//     var result = $Course.GetAjaxJson{param, ApiUrl + ""};
//     $("#TeacherName").val(result.Data.TeacherName);
//     $("#summernote").summernote("code", result.Data.Intro);
//     $("#imgbox").html("<img src='" + result.Data.TeacherImg + "' style='width: 150px;height: 150px;' />");
//     TeacherImg = result.Data.TeacherImg;
// }