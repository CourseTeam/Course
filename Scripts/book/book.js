/**
 * Created by vjzhu on 2016/9/28 .
 */

var datas = [];
var booking_result;
var willbook_result;
var booked_result;

 $(function($){
    login();
}); 

function login() {
  
  var param = {Tel: "15901857927", Pwd: $Course.MD5("1")};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Account/Login");
    console.log(result);
    if (result.IsSuccess) {
        // layer.open({
        //     content: '登录成功!',
        //     style: 'background-color:#F24C4C; color:#fff; border:none;',
        //     time: 2
        // });
        //将用户信息存入Cookie
        var json = $Course.stringify(result.Data);
        $.cookie("UserInfo", json , {expires: 30, path: '/'});   
         get_bookingdata();

        // window.location.href = "../Appointment/CourseList.html";
    } else {
        layer.open({
            content: '用户名或密码错误！请重新输入！',
            style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2
        });
    }
}

function get_bookingdata () {
    // var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var uid = 1;
    var param = {"UserID":uid,"Type":1};
    booking_result = $Course.GetAjaxJson(param, ApiUrl + "PhaseRegistration/MyRegistration_List");

    if (booking_result.Msg == "OK") {
        if (booking_result.Data.length > 0) {
            create_bookinglist();
        }
      }
}

function get_willbookdata(){
  var uid = 1;
  var param = {"UserID":uid,"Type":2};
  willbook_result = $Course.GetAjaxJson(param, ApiUrl + "PhaseRegistration/MyRegistration_List");

  if (willbook_result.Msg == "OK") {
        if (willbook_result.Data.length > 0) {
            create_willbooklist();
        }
     }
}

function get_bookeddata(){
  var uid = 1;
  var param = {"UserID":uid,"Type":3};
  booked_result = $Course.GetAjaxJson(param, ApiUrl + "PhaseRegistration/MyRegistration_List");

  if (booked_result.Msg == "OK") {
        if (booked_result.Data.length > 0) {
            create_bookedlist();
        }
     }
}

function create_bookinglist() {
    var strHtml = "";
    strHtml += '  <ul class="title">已预约课程，开课两周前可预约</ul>'
   for (var i = 0; i < booking_result.Data.length; i++) {
      var row = booking_result.Data[i];
      var isCost = row.AccommodationFeedPaid > row.AccommodationCost;
      var color = isCost?"#F24D4D":"#9B9B9B";
       strHtml += '  <ul style="float: left;">' 
       strHtml += '    <li>'
       strHtml += '      <img id= img -'+ i +'width="100" height="100" src="http://s16.sinaimg.cn/mw690/001wMDbFzy6Lmwz7HJBaf&690">'
       strHtml += '    </li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float: left;">'
       strHtml += '    <li><font class="name">'+ row.CoursePhaseName + '</font></li>'
       strHtml += '    <li><font class="time">'+ "开营时间：" + row.StartTime.substr(0,10) + '</font></li>'
       strHtml += '    <li><font class="location">'+ row.Place + '</font></li>'
       strHtml += '    <li><font class="cost" color="' + color + '"><img src="../../Images/book/cost_normal.png" width="19" height="15" >' + "未缴纳食宿费" + '</font></li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float:left;">'
       strHtml += '    <button class="button" type="button" style="margin-top:10px;margin-right:10px;">预约</button>'
       strHtml += '  </ul>'
       strHtml += '<div style="clear: both;"></div>'
   }
  $(".list-li").append(strHtml);
}

function create_willbooklist(){
   var strHtml = "";
   strHtml += '  <ul class="title">未预约课程</ul>'
    for (var i = 0; i < willbook_result.Data.length; i++) {
      var row = willbook_result.Data[i];
      var isCost = row.AccommodationFeedPaid > row.AccommodationCost;
       strHtml += '  <ul style="float: left;">' 
       strHtml += '    <li>'
       strHtml += '      <img id= img -'+ i +'width="100" height="100" src="http://s16.sinaimg.cn/mw690/001wMDbFzy6Lmwz7HJBaf&690">'
       strHtml += '    </li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float: left;">'
       strHtml += '    <li><font class="name">'+ row.CoursePhaseName + '</font></li>'
       strHtml += '    <li><font class="time">'+ "开营时间：" + row.StartTime + '</font></li>'
       strHtml += '    <li><font class="location">'+ row.Place + '</font></li>'
       strHtml += '    <li><font class="cost" color="' + color + '"><img src="../../Images/book/cost_normal.png" width="19" height="15" >' + "未缴纳食宿费" + '</font></li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float:left;">'
       strHtml += '    <button class="button" type="button" style="margin-top:10px;margin-right:10px;">预约</button>'
       strHtml += '  </ul>'
       strHtml += '<div style="clear: both;"></div>'
   }
  $(".list-li").append(strHtml);

}

function create_bookedlist() {
   for (var i = 0; i < booked_result.Data.length; i++) {
      var row = booked_result.Data[i];
      var isCost = row.AccommodationFeedPaid > row.AccommodationCost;
      var costImg = row.AccommodationFeedPaid > row.AccommodationCost? "../../Images/book/cost_normal.png":"../../Images/book/cost_selected.png";
       strHtml += '  <ul style="float: left;">' 
       strHtml += '    <li>'
       strHtml += '      <img id= img -'+ i +'width="100" height="100" src="http://s16.sinaimg.cn/mw690/001wMDbFzy6Lmwz7HJBaf&690">'
       strHtml += '    </li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float: left;">'
       strHtml += '    <li><font class="name">'+ row.CoursePhaseName + '</font></li>'
       strHtml += '    <li><font class="time">'+ "开营时间：" + row.StartTime + '</font></li>'
       strHtml += '    <li><font class="location">'+ row.Place + '</font></li>'
       strHtml += '    <li><font class="cost" color="' + color + '"><img src="' + costImg +'" width="19" height="15" >' + "未缴纳食宿费" + '</font></li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float:left;">'
       strHtml += '    <button class="button" type="button" style="margin-top:10px;margin-right:10px;">预约</button>'
       strHtml += '  </ul>'
       strHtml += '<div style="clear: both;"></div>'
   }
  $(".list-li").append(strHtml);



}






