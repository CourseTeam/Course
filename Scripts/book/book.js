/**
 * Created by vjzhu on 2016/9/28 .
 */

var datas = [];
var booking_result;
var willbook_result;
var booked_result;
var bookType;
var serviceType;
var qinziType;

//预约数据请求
var phase_id;
var course_id;
var userID;
var courseType_id;
var coursere_id;
var parent;
var service;

 $(function($){
   get_bookingdata();
   get_willbookdata();
   get_bookeddata();

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
        
    } else {
        layer.open({
            content: '用户名或密码错误！请重新输入！',
            style: 'background-color:#F24C4C; color:#fff; border:none;',
            time: 2
        });
    }
}


// 预约 或者 
//pid PhaseID  阶段ID
//cid CourseID 课程ID
//ctid CoutseTypeID 课程阶段ID
//tspan TimeSpan 剩余天数
//cpname CoursePhaseName  课程名字

// e CourseID, t--PhaseStatus
// pt PhaseType 阶段
// over OverCount 是否过期
// name CourseTypeName 课程类型名 0=亲子课程

function book(obj,pid,cid,ctid,crid,e,t,pt,over,name,tspan,cpname){
  var id = e;
  var status = t;
  phase_id = pid;
  course_id = cid;
  courseType_id = ctid;
  coursere_id = crid;
  var coursename = $(obj).attr("cname");
  
  if (tspan < 14) {
      layer.open({
        title:"",
        content:'<div>'+
          '您已超出可转期时间 详情请联系客服'+
        '</div>',
        btn:["确定"],
      });
      return;
  }
  
  if (over) {
    //跳转到转期界面
    window.location.href = "../transfer/transfer.html?phaseID=" + phase_id + "&coursename=" + coursename;
    return;
  }
  
  if (name == "0") {
     layer.open({
        title:"参加亲子课程的是",
        content:'<div class="radio">'+
                  '<label>'+
                    '<input type="radio" name="optionsRadios" id="radio1">一位孩子与两位家长'+
                  '</label>'+
                '</div>' +
                '<div class="radio">'+
                  '<label>'+
                      '<input type="radio" name="optionsRadios" id="radio2">一位孩子与一位家长'+
                  '</label>'+
                '</div>',
        btn:['确定','取消'],
        yes:function (index) {
          if (document.getElementById("radio1").checked == true) {
              qinziType = 2;
          }else if (document.getElementById("radio2").checked == true) {
              qinziType = 1;
          }
        }
      });
  }

  if (pt == 1 || pt == 2) {
     layer.open({
        title:"请选择您的增值服务",
        content:'<div class="radio">'+
                  '<label>'+
                    '<input type="radio" name="optionsRadios" id="radio1">统一版摩英回忆视频300元（单阶7天）'+
                  '</label>'+
                '</div>' +
                '<div class="radio">'+
                  '<label>'+
                      '<input type="radio" name="optionsRadios" id="radio2">VIP摩英大电影1980元（单阶7天）'+
                  '</label>'+
                '</div>' +
                '<div class="radio">'+
                  '<label>'+
                    '<input type="radio" name="optionsRadios" id="radio3">VIP蜕变水晶相册1280元（单阶7天）'+
                  '</label>'+
                '</div>' +
                '<div class="radio">'+
                  '<label>'+
                    '<input type="radio" name="optionsRadios" id="radio4">VIP摩英大电影+VIP蜕变水晶相册2680元 强烈推荐 性价比极高（单阶7天）'+
                  '</label>'+
                '</div>' +
                '<div class="radio">'+
                  '<label>'+
                    '<input type="radio" name="optionsRadios" id="radio5">VIP摩英大电影+VIP蜕变水晶相册3980元 强烈推荐 性价比极高（两阶14天）'+
                  '</label>'+
                '</div>',
        btn:['确定','我不需要此项服务'],
        yes:function (index) {
        if (document.getElementById("radio1").checked == true) {
            serviceType = 1;
        }else if (document.getElementById("radio2").checked == true) {
            serviceType = 2;
        }else if (document.getElementById("radio3").checked == true) {
            serviceType = 3;
        }else if (document.getElementById("radio4").checked == true) {
            serviceType = 4;
        }else if (document.getElementById("radio5").checked == true) {
            serviceType = 5;
        }

          //预约 添加增值服务


          layer.close(index);

        },no:function (index) {
          serviceType = 0;
          layer.close(index);
        }
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
      var img = isCost? "../../Images/book/cost_selected.png":"../../Images/book/cost_normal.png";
      var type = get_type(row.PhaseStatus);
      var stateImg = get_stateImg(row.PhaseStatus);
      var color = isCost?"#F24D4D":"#9B9B9B";
       strHtml += '  <ul style="float: left;">'
       strHtml += '    <li>'
       if (stateImg != "") {
          strHtml += '        <div style="background:url(' + row.CourseImgUrl + ') no-repeat;background-size: cover;"><img id= img -'+ i +'width="75" height="75"  src="' + stateImg +'"></div>'
       }else {
          strHtml += '        <div><img id= img -'+ i +'width="75" height="75"  src="' + row.CourseImgUrl +'"></div>'
       }
       strHtml += '    </li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float: left;">'
       strHtml += '    <li><font class="name">'+ row.CoursePhaseName + '</font></li>'
       strHtml += '    <li><font class="time">'+ "开营时间：" + row.StartTime.substr(0,10) + '</font></li>'
       strHtml += '    <li><font class="location">'+ row.Place + '</font></li>'
       strHtml += '    <li><font class="cost" color="' + color + '"><img src="'+ img + '"width="19" height="15" >' + "未缴纳食宿费" + '</font></li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float:left;">'
       strHtml += '    <button class="button" type="button" disabled="disabled"  style="margin-top:10px;margin-right:10px;">'+ type +'</button>'
       strHtml += '  </ul>'
       strHtml += '<div style="clear: both;"></div>'
   }
  $(".list-li").append(strHtml);
}


//未预约
function create_willbooklist(){
   var strHtml = "";
   strHtml += '  <ul class="title">未预约课程</ul>'
    for (var i = 0; i < willbook_result.Data.length; i++) {
      var row = willbook_result.Data[i];
      var isCost = row.AccommodationFeedPaid > row.AccommodationCost;
      var type = get_type(row.PhaseStatus);
      var color = isCost?"#F24D4D":"#9B9B9B";
      var costText = isCost?"已缴纳食宿费":"未缴纳食宿费";
      var isOverCount = row.ReservationCount >= row.PeopleCount;
      var name = row.CourseTypeName == "亲子课程"?"0":"1";
      var btnColor = row.TimeSpan < 14?"#E6E6E6":"#9B9B9B";
      var stateImg = get_stateImg(row.PhaseStatus);
      if (isOverCount) {type = "预约"};

      var img = isCost? "../../Images/book/cost_selected.png":"../../Images/book/cost_normal.png";
       strHtml += '  <ul style="float: left;">' 
       strHtml += '    <li>'
       if (stateImg != "") {
          strHtml += '        <div style="background:url(' + row.CourseImgUrl + ') no-repeat;background-size: cover;"><img id= img -'+ i +'width="75" height="75"  src="' + stateImg +'"></div>'
       }else {
          strHtml += '        <div><img id= img -'+ i +'width="75" height="75"  src="' + row.CourseImgUrl +'"></div>'
       }       
       strHtml += '    </li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float: left;">'
       strHtml += '    <li><font class="name">'+ row.CoursePhaseName + '</font></li>'
       strHtml += '    <li><font class="time">'+ "开营时间：" + row.StartTime.substr(0,10) + '</font></li>'
       strHtml += '    <li><font class="location">'+ row.Place + '</font></li>'
       strHtml += '    <li><font class="cost" color="' + color + '"><img src="'+ img + '"width="19" height="15" >' + costText + '</font></li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float:left;">'
       strHtml += '    <button class="button" type="button"  cname="'+ row.CoursePhaseName + '" onclick="book(this, ' + row.PhaseID +',' + row.CourseID + ',' + row.CouseTypeID + ',' + row.CourseRegistrationID + ',' + row.PhaseStatus + ',' + row.PhaseType + ',' + isOverCount + ',' +  name  + ',' + row.TimeSpan  + ')" style="margin-top:10px;margin-right:10px; background-color:' + btnColor + '">'+type+'</button>'
       strHtml += '  </ul>'
       strHtml += '<div style="clear: both;"></div>'
   }
  $(".list-li").append(strHtml);

}


function create_bookedlist() {
     var strHtml = "";
        strHtml += '  <ul class="title">已参加课程</ul>'
   for (var i = 0; i < booked_result.Data.length; i++) {
      var row = booked_result.Data[i];
      var isCost = row.AccommodationFeedPaid > row.AccommodationCost;
      var color = isCost?"#F24D4D":"#9B9B9B";
      var type = get_type(row.PhaseStatus);
      var stateImg = get_stateImg(row.PhaseStatus);
      var costImg = row.AccommodationFeedPaid > row.AccommodationCost? "../../Images/book/cost_normal.png":"../../Images/book/cost_selected.png";
       strHtml += '  <ul style="float: left;">' 
       strHtml += '    <li>'
       if (stateImg != "") {
          strHtml += '        <div style="background:url(' + row.CourseImgUrl + ') no-repeat;background-size: cover;"><img id= img -'+ i +'width="75" height="75"  src="' + stateImg +'"></div>'
       }else {
          strHtml += '        <div><img id= img -'+ i +'width="75" height="75"  src="' + row.CourseImgUrl +'"></div>'
       }
       strHtml += '    </li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float: left;">'
       strHtml += '    <li><font class="name">'+ row.CoursePhaseName + '</font></li>'
       strHtml += '    <li><font class="time">'+ "开营时间：" + row.StartTime.substr(0,10) + '</font></li>'
       strHtml += '    <li><font class="location">'+ row.Place + '</font></li>'
       strHtml += '    <li><font class="cost" color="' + color + '"><img src="' + costImg +'" width="19" height="15" >' + "已缴纳食宿费" + '</font></li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float:left;">'
       strHtml += '    <button class="button" type="button" disabled="disabled" style="margin-top:10px;margin-right:10px;">'+type+'</button>'
       strHtml += '  </ul>'
       strHtml += '<div style="clear: both;"></div>'
   }
  $(".list-li").append(strHtml);

}

function get_type(t){

   switch(t){
    case 0:
      return "预约";
    break;
    case 1:
      return "预约中";
    break;
    case 2:
      return "候补中";
    break;
    case 3:
      return "预约成功";
    break;
    case 4:
      return "已签到";
    break;
    case 5:
      return "已退费";
    break;
   }
}

function get_stateImg(state){
   switch(state){
     case 0:
      return "";
    break;
    case 1:
      return "../../Images/book/yuyuezhong.png";
    break;
    case 2:
      return "../../Images/book/houbuzhong.png";
    break;
    case 3:
      return "../../Images/book/yuyuecg.png";
    break;
    case 4:
      return "";
    break;
    case 5:
      return "";
    break;
   }
}

function start_book() {

  var param = {"PhaseID":phase_id,"UserID":userID,"CourseID":course_id,"CourseTypeID":courseType_id,"CourseRegistrationID":coursere_id,"ParentCount":parent,"ValueAddedServices":service};
  var post_result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseRegistration_Add");
  if (post_result.Msg == "OK") {
        window.location.href = "booksuccess.html";
  }

}




