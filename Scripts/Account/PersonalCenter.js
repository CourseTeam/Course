/**
 * Created by wangbin on 2016/11/15.
 */

$(function ($) {
    // 获取用户ID
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    console.log(UserInfo);
    // PersonalCenter_Show();
});

function PersonalCenter_Show() {
    var strHtml = "";
    strHtml += '<img src="../../Images/personCenter/backgroundImg.png" style="width: 100%"/>';
    strHtml += '<img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTAhA3KbPFFX6zi5VUdY6SDBXOo9y6xyDDzDuD4IMwDRVmZKap0fXUlCRQ" class="headerImg" id="headerImg">';
    strHtml += '<p class="name">名字</p>';
    strHtml += '<p class="integral">积分:无</p>';
    strHtml += '<img src="http://192.168.80.13:1217/Uploads/54e8537d-61df-4c75-b889-66b66c76baba.jpg" style="width: 50px;height: 50px;center">';
    $("#headerImg").html(strHtml);
}