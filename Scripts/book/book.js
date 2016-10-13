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

//课程名宽度百分比
var phasename_width;

//是否上过一阶或者二阶课程
var isPhaseOne;
//是否上过三阶课程
var isPhaseThree;


$(function ($) {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    userID = UserInfo.UserID;

    var screen_width = window.screen.width;
    if (screen_width <= 320)phasename_width = "45%";
    else if (screen_width <= 500)phasename_width = "50%";
    else if (screen_width <= 640)phasename_width = "60%";
    else if (screen_width <= 800)phasename_width = "70%";

    getPhaseStatus();
    get_bookingdata();
    get_willbookdata();
    get_bookeddata();
    get_refunddata();

});

//转期 
function transfer(obj, pid, PhaseReservationID) {
    var coursename = $(obj).attr("cname");
    window.location.href = "../transfer/transfer.html?phaseID=" + pid + "&coursename=" + coursename + "&PhaseReservationID=" + PhaseReservationID;
}

//调用预约接口
//qinziType 家长人数
function post_book(param) {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var obj = {
        "PhaseID": param.pid, "UserID": UserInfo.UserID, "CourseID": param.cid, "ParentCount": param.qinziType,
        "ValueAddedServices": param.serviceType, "PhaseType": param.pt
    };
    var result = $Course.PostAjaxJson(obj, ApiUrl + "PhaseRegistration/PhaseRegistration_Add");
    if (result.Msg == "OK" && result.Data != false) {
        //预约成功
        window.location.href = "booksuccess.html";

    } else {
        layer.open({content: "一阶课程当前正在预约中，请完成该预约后再预约后续课程"});
    }

}

// 预约 或者 
//pid PhaseID  阶段ID
//cid CourseID 课程ID
//ctid CoutseTypeID 课程阶段ID
//tspan TimeSpan 剩余天数
//cpname CoursePhaseName  课程名字

// t--PhaseStatus
// pt PhaseType 阶段
// over OverCount 报名人数是否已满
// name CourseTypeName 课程类型名 0=亲子课程

function book(obj, pid, cid, ctid, crid, t, pt, over, name, tspan, cpname) {
    var status = t;
    phase_id = pid;
    course_id = cid;
    courseType_id = ctid;
    coursere_id = crid;
    var coursename = $(obj).attr("cname");

    var param = new Object();
    param.pid = phase_id;
    param.cid = course_id;
    param.ctid = ctid;
    param.crid = coursere_id;
    param.status = t;
    param.pt = pt;
    param.over = over;
    param.name = name;
    param.tspan = tspan;
    param.cpname = coursename;
    param.qinziType = 0;
    param.serviceType = 0;


    if (name == "0") {
        layer.open({
            title: "参加亲子课程的是",
            content: '<div class="radio">' +
            '<label>' +
            '<input type="radio" name="optionsRadios" id="radio1">一位孩子与两位家长' +
            '</label>' +
            '</div>' +
            '<div class="radio">' +
            '<label>' +
            '<input type="radio" name="optionsRadios" id="radio2">一位孩子与一位家长' +
            '</label>' +
            '</div>',
            btn: ['确定', '取消'],
            yes: function (index) {
                if (document.getElementById("radio1").checked == true) {
                    qinziType = 2;
                } else if (document.getElementById("radio2").checked == true) {
                    qinziType = 1;
                }
                param.qinziType = qinziType;
                post_book(param);
            }
        });
    }

    if (pt == 0) {
      layer.open({
        title:"提示",
        content:"是否预约" + coursename + "?",
        btn:['确定','取消'],
        yes:function(index){
          post_book(param);
          layer.open(index);
        },no:function(index){
          layer.open(index);
        }
      });
    }

    if (pt == 1 || pt == 2) {
        layer.open({
            title: "请选择您的增值服务",
            content: '<div class="radio">' +
            '<label>' +
            '<input type="radio" name="optionsRadios" id="radio1">统一版摩英回忆视频300元（单阶7天）' +
            '</label>' +
            '</div>' +
            '<div class="radio">' +
            '<label>' +
            '<input type="radio" name="optionsRadios" id="radio2">VIP摩英大电影1980元（单阶7天）' +
            '</label>' +
            '</div>' +
            '<div class="radio">' +
            '<label>' +
            '<input type="radio" name="optionsRadios" id="radio3">VIP蜕变水晶相册1280元（单阶7天）' +
            '</label>' +
            '</div>' +
            '<div class="radio">' +
            '<label>' +
            '<input type="radio" name="optionsRadios" id="radio4">VIP摩英大电影+VIP蜕变水晶相册2680元 强烈推荐 性价比极高（单阶7天）' +
            '</label>' +
            '</div>' +
            '<div class="radio">' +
            '<label>' +
            '<input type="radio" name="optionsRadios" id="radio5">VIP摩英大电影+VIP蜕变水晶相册3980元 强烈推荐 性价比极高（两阶14天）' +
            '</label>' +
            '</div>' +
            '<div class="radio">' +
            '<label>' +
            '<input type="radio" name="optionsRadios" id="radio6">不需要此服务' +
            '</label>' +
            '</div>',
            btn: ['确定'],
            yes: function (index) {
                if (document.getElementById("radio1").checked == true) {
                    serviceType = 1;
                } else if (document.getElementById("radio2").checked == true) {
                    serviceType = 2;
                } else if (document.getElementById("radio3").checked == true) {
                    serviceType = 3;
                } else if (document.getElementById("radio4").checked == true) {
                    serviceType = 4;
                } else if (document.getElementById("radio5").checked == true) {
                    serviceType = 5;
                } else if (document.getElementById("radio6").checked == true) {
                    serviceType = 0;
                }

                param.serviceType = serviceType;
                layer.close(index);
                post_book(param);
            }
        });
    }
}


function getPhaseStatus() {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {"UserID": UserInfo.UserID};
    // var param = {"UserID":156};
    var result = $Course.GetAjaxJson(param, ApiUrl + "course/Is_JoinCourse");
    if (result.Msg == "OK") {
        isPhaseOne = result.Data.PhaseType1OR2;
        isPhaseThree = result.Data.PhaseType3;
    }
}

function get_bookingdata() {
    var uid = userID;
    var param = {"UserID": uid, "Type": 1};

    booking_result = $Course.GetAjaxJson(param, ApiUrl + "PhaseRegistration/MyRegistration_List");

    if (booking_result.Msg == "OK") {
        if (booking_result.Data.length > 0) {
            create_bookinglist();
        }
    }
}



function get_willbookdata() {
    var uid = userID;
    var param = {"UserID": uid, "Type": 2};
    willbook_result = $Course.GetAjaxJson(param, ApiUrl + "PhaseRegistration/MyRegistration_List");


    if (willbook_result.Msg == "OK") {
        if (willbook_result.Data.length > 0) {
            create_willbooklist();
        }
    }
}


function get_bookeddata() {
    var uid = userID;
    var param = {"UserID": uid, "Type": 3};
    booked_result = $Course.GetAjaxJson(param, ApiUrl + "PhaseRegistration/MyRegistration_List");

    if (booked_result.Msg == "OK") {
        if (booked_result.Data.length > 0) {
            create_bookedlist();
        }
    }
}

function get_refunddata(){
    var uid = userID;
    var param = {"UserID": uid, "Type": 4};
    booked_result = $Course.GetAjaxJson(param, ApiUrl + "PhaseRegistration/MyRegistration_List");

    if (booked_result.Msg == "OK") {
        if (booked_result.Data.length > 0) {
            create_refundlist();
        }
    }
}


//已预约课程
function create_bookinglist() {
    var strHtml = "";
    strHtml += '  <ul class="title">已预约课程，开课两周前可转期</ul>'
    for (var i = 0; i < booking_result.Data.length; i++) {
        var row = booking_result.Data[i];
        var isCost = row.AccommodationFeesPaid >= row.AccommodationCost;
        var costTitle = isCost ? "已缴纳食宿费" : "未缴纳食宿费";
        var img = isCost ? "../../Images/book/cost_selected.png" : "../../Images/book/cost_normal.png";
        var type = get_type(row.PhaseStatus);
        var stateImg = get_stateImg(row.PhaseStatus);
        var disabled = row.PhaseStatus == 3 ? "" : "disabled";
        //转期参数
        var param = {"pid": row.PhaseID, "cpname": row.CoursePhaseName};
        var color = isCost ? "#F24D4D" : "#9B9B9B";
        strHtml += '  <ul style="float: left;">'
        strHtml += '    <li>'
        if (stateImg != "") {
            strHtml += '        <div style="background:url(' + row.CourseImgUrl + ') no-repeat;background-size: cover;"><img id= img -' + i + 'width="75" height="75"  src="' + stateImg + '"></div>'
        } else {
            strHtml += '        <div><img id= img -' + i + ' width="75" height="75"  src="' + row.CourseImgUrl + '"></div>'
        }
        strHtml += '    </li>'
        strHtml += '  </ul>'
        strHtml += '  <ul style="float: left; width:' + phasename_width + ';" >'
        strHtml += '    <li "><font class="name">' + row.CoursePhaseName + '</font></li>'
        strHtml += '    <li><font class="time">' + "开营时间：" + row.StartTime.substr(0, 10) + '</font></li>'
        strHtml += '    <li><font class="location">' + row.Place + '</font></li>'
        strHtml += '    <li><font class="cost" color="' + color + '"><img src="' + img + '"width="19" height="15" >' + costTitle + '</font></li>'
        strHtml += '  </ul>'
        strHtml += '  <ul style="float:right;">'
        strHtml += '    <button class="button" type="button" cname="' + row.CoursePhaseName + '" onclick="transfer(this,' + row.PhaseID + ',' + row.PhaseReservationID + ')"  style="margin-top:10px;margin-right:10px;" >' + type + '</button>'
        strHtml += '  </ul>'
        strHtml += '<div style="clear: both;"></div>'
    }
    $(".list-li").append(strHtml);
}


//未预约
function create_willbooklist() {
    var strHtml = "";
    strHtml += '  <ul class="title">未预约课程</ul>'
    for (var i = 0; i < willbook_result.Data.length; i++) {

      var row = willbook_result.Data[i];
      var isCost = row.AccommodationFeesPaid >= row.AccommodationCost && row.AccommodationCost != 0;
      var type = get_type(row.PhaseStatus);
      var color = isCost?"#F24D4D":"#9B9B9B";
      var costText = isCost?"已缴纳食宿费":"未缴纳食宿费";
      var isOverCount = row.ReservationCount >= row.PeopleCount;
      var name = row.CourseTypeName == "亲子课程"?"0":"1";
      var stateImg = get_stateImg(row.PhaseStatus);

       //阶数
      var phasenumber = row.PhaseType;
      var disabled = "";
      if (phasenumber == 3 || phasenumber == 4){if (isPhaseOne==0) {disabled="disabled"}};

      var btnColor = disabled == ""? "#F24D4D":"#9B9B9B";

      if (isOverCount) {type = "候补"}else{type="预约"};
      
      var img = isCost? "../../Images/book/cost_selected.png":"../../Images/book/cost_normal.png";
       strHtml += '  <ul style="float: left;">' 
       strHtml += '    <li>'
       if (stateImg != "") {
          strHtml += '        <div style="background:url(' + row.CourseImgUrl + ') no-repeat;background-size: cover;"><img id= img -'+ i +'width="75" height="75"  src="' + stateImg +'"></div>'
       }else {
          strHtml += '        <div><img  width="75" height="75"  src="' + row.CourseImgUrl +'"></div>'
       }
       strHtml += '    </li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float: left; width:' + phasename_width +';" >'
       strHtml += '    <li><font class="name">'+ row.CoursePhaseName + '</font></li>'
       strHtml += '    <li><font class="time">'+ "开营时间：" + row.StartTime.substr(0,10) + '</font></li>'
       strHtml += '    <li><font class="location">'+ row.Place + '</font></li>'
       strHtml += '    <li><font class="cost" color="' + color + '"><img src="'+ img + '"width="19" height="15" >' + costText + '</font></li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float:right;">'
       if (disabled == "") {strHtml += '<button class="button" type="button"  cname="'+ row.CoursePhaseName + '" onclick="book(this, ' + row.PhaseID +',' + row.CourseID + ',' + row.CouseTypeID + ',' + row.CourseRegistrationID + ',' + row.PhaseStatus + ',' + row.PhaseType + ',' + isOverCount + ',' +  name  + ',' + row.TimeSpan  + ')" style="margin-top:10px;margin-right:10px; background-color:' + btnColor + '">'+type+'</button>'}
                      else {strHtml += '<button class="button" type="button" disabled="' + disabled +'"  cname="'+ row.CoursePhaseName + '" onclick="book(this, ' + row.PhaseID +',' + row.CourseID + ',' + row.CouseTypeID + ',' + row.CourseRegistrationID + ',' + row.PhaseStatus + ',' + row.PhaseType + ',' + isOverCount + ',' +  name  + ',' + row.TimeSpan  + ')" style="margin-top:10px;margin-right:10px; background-color:' + btnColor + '">'+type+'</button>'};


       strHtml += '  </ul>'
       strHtml += '<div style="clear: both;"></div>'
   }
  $(".list-li").append(strHtml);

}

//已参加课程
function create_bookedlist() {
    var strHtml = "";
    strHtml += '  <ul class="title">已参加课程</ul>'
    for (var i = 0; i < booked_result.Data.length; i++) {
        var row = booked_result.Data[i];
        var isCost = row.AccommodationFeesPaid >= row.AccommodationCost;
        var color = isCost ? "#F24D4D" : "#9B9B9B";
        var type = get_type(row.PhaseStatus);
        var stateImg = get_stateImg(row.PhaseStatus);
        var costImg = row.AccommodationFeedPaid > row.AccommodationCost ? "../../Images/book/cost_normal.png" : "../../Images/book/cost_selected.png";
        strHtml += '  <ul style="float: left;">'
        strHtml += '    <li>'
        if (stateImg != "") {
            strHtml += '        <div style="background:url(' + row.CourseImgUrl + ') no-repeat;background-size: cover;"><img id= img -' + i + 'width="75" height="75"  src="' + stateImg + '"></div>'
        } else {
            strHtml += '        <div><img id= img -' + i + 'width="75" height="75"  src="' + row.CourseImgUrl + '"></div>'
        }
        strHtml += '    </li>'
        strHtml += '  </ul>'
        strHtml += '  <ul style="float: left; width:' + phasename_width + ';" >'
        strHtml += '    <li><font class="name">' + row.CoursePhaseName + '</font></li>'
        strHtml += '    <li><font class="time">' + "开营时间：" + row.StartTime.substr(0, 10) + '</font></li>'
        strHtml += '    <li><font class="location">' + row.Place + '</font></li>'
        strHtml += '    <li><font class="cost" color="' + color + '"><img src="' + costImg + '" width="19" height="15" >' + "已缴纳食宿费" + '</font></li>'
        strHtml += '  </ul>'
        strHtml += '  <ul style="float:right;">'
        strHtml += '    <button class="button" type="button" disabled="disabled" style="margin-top:10px;margin-right:10px;">' + type + '</button>'
        strHtml += '  </ul>'
        strHtml += '<div style="clear: both;"></div>'
    }
    $(".list-li").append(strHtml);

}

//已退费课程
function create_refundlist(){
   var strHtml = "";
    strHtml += '  <ul class="title">已退费课程</ul>'
    for (var i = 0; i < booked_result.Data.length; i++) {
        var row = booked_result.Data[i];
        var isCost = row.AccommodationFeesPaid >= row.AccommodationCost;
        var color = isCost ? "#F24D4D" : "#9B9B9B";
        var type = get_type(row.PhaseStatus);
        var stateImg = get_stateImg(row.PhaseStatus);
        var costImg = row.AccommodationFeedPaid > row.AccommodationCost ? "../../Images/book/cost_normal.png" : "../../Images/book/cost_selected.png";
        strHtml += '  <ul style="float: left;">'
        strHtml += '    <li>'
        if (stateImg != "") {
            strHtml += '        <div style="background:url(' + row.CourseImgUrl + ') no-repeat;background-size: cover;"><img id= img -' + i + 'width="75" height="75"  src="' + stateImg + '"></div>'
        } else {
            strHtml += '        <div><img id= img -' + i + 'width="75" height="75"  src="' + row.CourseImgUrl + '"></div>'
        }
        strHtml += '    </li>'
        strHtml += '  </ul>'
        strHtml += '  <ul style="float: left; width:' + phasename_width + ';" >'
        strHtml += '    <li><font class="name">' + row.CoursePhaseName + '</font></li>'
        strHtml += '    <li><font class="time">' + "开营时间：" + row.StartTime.substr(0, 10) + '</font></li>'
        strHtml += '    <li><font class="location">' + row.Place + '</font></li>'
        strHtml += '    <li><font class="cost" color="' + color + '"><img src="' + costImg + '" width="19" height="15" >' + "已缴纳食宿费" + '</font></li>'
        strHtml += '  </ul>'
        strHtml += '  <ul style="float:right;">'
        strHtml += '    <button class="button" type="button" disabled="disabled" style="margin-top:10px;margin-right:10px;">' + type + '</button>'
        strHtml += '  </ul>'
        strHtml += '<div style="clear: both;"></div>'
    }
    $(".list-li").append(strHtml);
}

function get_type(t) {

    switch (t) {
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
            return "转期";
            break;
        case 4:
            return "已参加";
            break;
        case 5:
            return "已退费";
            break;
    }
}

function get_stateImg(state) {
    switch (state) {
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
            return "../../Images/book/joined.png";
            break;
        case 5:
            return "";
            break;
    }
}

function start_book() {

    var param = {
        "PhaseID": phase_id,
        "UserID": userID,
        "CourseID": course_id,
        "CourseTypeID": courseType_id,
        "CourseRegistrationID": coursere_id,
        "ParentCount": parent,
        "ValueAddedServices": service
    };
    var post_result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseRegistration_Add");
    if (post_result.Msg == "OK") {
        window.location.href = "booksuccess.html";
    }

}




