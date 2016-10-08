
var request;

$ (function($){

    // $("#header").load("../Commen/header.html");
	request = GetRequest();
	// var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
	// if (UserInfo) {
	// 	$("#tel").text = UserInfo.Phone;
	// 	$("#emial").text = UserInfo.Email;
	// 	$("#name").text = UserInfo.NickName;
	// 	$("#sex").text = UserInfo.Sex;
	// 	$("#school").text = UserInfo.School;
	// 	$("#grade").text = UserInfo.Grade;
	// 	$("#class").text = UserInfo.ClassName;
	// 	$("#birth").text = UserInfo.School;

	// 	$("#f_name").text = UserInfo.FatherName;
	// 	$("#f_tel").text = UserInfo.FatherPhone;
	// 	$("#m_name").text = UserInfo.MotherName;
	// 	$("#m_tel").text = UserInfo.MotherPhone;
	// 	$("#telephone").text = UserInfo.Tel;
	// 	$("#address").text = UserInfo.Address;

	// }

	get_data();
})

function GetRequest() {  
                var url = location.search; //获取url中"?"符后的字串  
                var theRequest = new Object();  
                if (url.indexOf("?") != -1) {  
                    var str = url.substr(1);  
                    strs = str.split("&");  
                    for (var i = 0; i < strs.length; i++) {  
                        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);  
                    }  
                }  
                return theRequest;  
            }  


function get_data() {

	// CourseRegistration/PhaseRegistration_PhaseStatus_Upd
	var strHtml = "";
	
	strHtml += '<div class="row">'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	<p>一阶开营时间：'+ request.time + '</p>'			
	strHtml += '  </div>'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	地点：' + request.location;			
	strHtml += '  </div>'
	strHtml += '</div>'
	
	strHtml += '<div class="row">'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	<p>剩余名额：'+ request.minge + '</p>'			
	strHtml += '  </div>'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	预约截止时间：'+ request.outtime			
	strHtml += '  </div>'
	strHtml += '</div>'
	

	$(".container").append(strHtml);

}