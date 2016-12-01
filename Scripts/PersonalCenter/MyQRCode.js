/**
 * Created by wangbin on 2016/11/15.
 */

$(function ($) {
    $("#qrcode").erweima({
        render: 'canvas',// / image / div   渲染模式
        ecLevel: 'Q',//:7% / M:15% / Q:25% / H:30%    二维码识别度（越大越容易扫描）
        minVersion: 6,//  二维码密度，推荐0-10
        fill: '#4A90E2',//  二维码颜色
        background: '#fff',//    二维码背景颜色
        text: ApiUrl + 'Course/Views/Account/Register.html?RefUserID=' + $Course.RequestUrlParams("UserID"),//     最后扫出来的结果
        size: 300,// 二维码大小
        radius: 30,// 点圆滑度,50以内
        quiet: 2,// 二维码边框
        mode: 0,//    不显示LOGO：0 / 文字且占整行：1 / 文字居中：2 / 图片且占整行：3 / 图片居中：4
        mSize: 10,// logo大小
        mPosX: 50,// logo水平坐标,50居中
        mPosY: 50,//  logo垂直坐标,50居中
        label: '扫码注册',//     logo文字
        fontname: '微软雅黑',//     logo字体名
        fontcolor: 'orange',//       logo字体颜色
        image: $(".imgLogo")[0]//   设置的时候，需要把mode改成4，调用整个图片控件
    });
    UserInfo_Photo_Get();
    fileupload();
    $("#share").on("click", function () {
        layer.open({content: "请点击微信右上角分享"});
    });
    imgLoad(headerImg, function() {
        canvas();
    });
});

function canvas() {
    var w = window.screen.width;
    var h = window.screen.height;

    //要将 canvas 的宽高设置成容器宽高的 2 倍
    var canvas = document.createElement("canvas");
    canvas.width = w * 3;
    canvas.height = h * 3;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    var context = canvas.getContext("2d");
    //然后将画布缩放，将图像放大两倍画到画布上
    context.scale(3,3);

    html2canvas(document.body, {
        canvas: canvas,
        onrendered: function(canvas) {
            $("#MyQRCode").html('<img style="width: 100%;" src="'+canvas.toDataURL("image/png")+'" />');
        },
        width: w * 3,
        height: h * 3
    });

}

function fileupload() {
    if ($Course.IsWeixin()) {
        $("#down").on("click", function () {
            layer.open({content: "请长按图片保存到手机"});
        });
    } else {
        var url = ApiUrl + "File/FileUploadBase64";
        var param = {base64Str: document.getElementsByTagName("canvas")[0].toDataURL("image/png")}
        console.log(param);
        var result = $Course.PostAjaxJson(param, url);
        $("#down").attr("href", result.Data);
    }
}

function UserInfo_Photo_Get() {
    var result = $Course.GetAjaxJson({UserID: $Course.RequestUrlParams("UserID")}, ApiUrl + "User/User_NameAndPhoto_Get");
    console.log(result);
    if (result.Msg == "OK") {
        if (result.Data) {
            $("#NickName").html("我是摩英达人" + result.Data.NickName);
            $(".imgLogo").attr("src", result.Data);
            if (result.Data.PhotoUrl) {
                $("#headerImg").attr("src", result.Data.PhotoUrl);
            } else {
                $("#headerImg").attr("src", '../../Images/defaultphoto.jpg');
            }
        }
    }
}

function imgLoad(img, callback) {
    var timer = setInterval(function() {
        if (img.complete) {
            callback(img);
            clearInterval(timer);
        }
    }, 300)
}
