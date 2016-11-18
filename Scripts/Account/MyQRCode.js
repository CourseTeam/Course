/**
 * Created by wangbin on 2016/11/15.
 */

$(function ($) {
    Get_QRCode();
});

function Get_QRCode() {
    console.log("1111");
    var qrcode = new QRCode('qrcode', {
        text: '啊',
        width: 250,
        height: 250,
        display: 'inline',
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
    });
    $("#qrcode").show();
    // qrcode.clear();
    // qrcode.makeCode('nilllll');
    // qrcode.img.display = "inline";
}