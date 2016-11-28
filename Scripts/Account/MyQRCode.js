/**
 * Created by wangbin on 2016/11/15.
 */

$(function ($) {
    UserInfo_Photo_Get();
});

function fileupload() {
    var url = ApiUrl + "File/FileUploadBase64";
    var param = {base64Str: document.getElementsByTagName("canvas")[0].toDataURL("image/png")}
    console.log(param);
    var result = $Course.PostAjaxJson(param, url);
    console.log(result);
    $("#down").attr("href", result.Data);
}

function UserInfo_Photo_Get() {
    var result = $Course.GetAjaxJson({UserID: $Course.RequestUrlParams("UserID")}, ApiUrl + "User/UserInfo_Photo_Get");
    console.log(result);
    if (result.Msg == "OK") {
        if (result.Data) {
            $(".imgLogo").attr("src", result.Data);
        }
        $("#qrcode").erweima({
            render: 'canvas',// / image / div   渲染模式
            ecLevel: 'Q',//:7% / M:15% / Q:25% / H:30%    二维码识别度（越大越容易扫描）
            minVersion: 6,//  二维码密度，推荐0-10
            fill: '#4A90E2',//  二维码颜色
            background: '#fff',//    二维码背景颜色
            text: ApiUrl + 'Course/Views/Account/Register.html?RefUserID=' + $Course.RequestUrlParams("UserID"),//     最后扫出来的结果
            size: 300,// 二维码大小
            radius: 30,// 点圆滑度,50以内
            quiet: 0,// 二维码边框
            mode: 4,//    不显示LOGO：0 / 文字且占整行：1 / 文字居中：2 / 图片且占整行：3 / 图片居中：4
            mSize:20             ,// logo大小
            mPosX: 50,// logo水平坐标,50居中
            mPosY: 50,//  logo垂直坐标,50居中
            label: '扫码注册',//     logo文字
            fontname: '微软雅黑',//     logo字体名
            fontcolor: 'orange',//       logo字体颜色
            image: $(".imgLogo")[0]//   设置的时候，需要把mode改成4，调用整个图片控件
        });
        fileupload();
    }
}