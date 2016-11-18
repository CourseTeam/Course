/**
 * Created by wangbin on 2016/11/16.
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
        ProductInfo_Edit();
    });
    var ProductID = $Course.RequestUrlParams("ProductID");
    if (ProductID != null) {
        ProductInfo_Get(ProductID);
    }

});

var ProductID = $Course.RequestUrlParams("ProductID") || 0;
console.log(ProductID);
var ProductImg = "";
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
        ProductImg = data.response.Data;
    }
});

// 新增/修改商品信息
function ProductInfo_Edit() {
    // 商品名称
    var ProductName = $("#ProductName").val();
    // 库存
    var Repertory = $("#Repertory").val();
    // 价格
    var Price = $("#Price").val();
    // 商品介绍
    var Intro = $("#summernote").summernote("code");
    if (!ProductName) {
        layer.msg("请输入商品名称！", {icon: 2, time: 2000});
        return;
    }
    if (!Repertory) {
        layer.msg("请输入库存！", {icon: 2, time: 2000});
        return;
    }
    if (!Price) {
        layer.msg("请输入商品价格", {icon: 2, time: 2000});
        return;
    }
    if (!Intro) {
        layer.msg("请输入商品介绍！", {icon: 2, time: 2000});
        return;
    }
    if (ProductImg == "") {
        layer.msg("请上传课程图片！", {icon: 2, time: 2000});
        return;
    }
    console.log(ProductName);
    console.log(Repertory);
    console.log(Price);
    console.log(Intro);
    console.log(ProductImg);

    var param = {
        ProductID: ProductID,
        ProductName: ProductName,
        Repertory: Repertory,
        Price: Price,
        Intro: Intro,
        ProductImg: ProductImg
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "Product/Product_Edit");
    if (result.Msg == "OK") {
        layer.msg("保存成功！", {icon: 1, time: 2000}, function () {
            window.location.href = "ProductList.html";
        });
    }
}

// 获取商品信息
function ProductInfo_Get(ProductID) {
    var param = {ProductID: ProductID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Product/Product_Detail");
    console.log(result);
    $("#ProductName").val(result.Data.ProductName);
    $("#Repertory").val(result.Data.Repertory);
    $("#Price").val(result.Data.Price);
    $("#summernote").summernote("code", result.Data.Intro);
    $("#imgbox").html("<img src='" + result.Data.ProductImg + "' style='width: 150px;height: 150px;' />");
    ProductImg = result.Data.ProductImg;
}