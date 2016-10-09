//报名

var request;

$ (function($){

    get_request("CourseID");


	var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
	if (UserInfo) {
		$("#tel").text = UserInfo.Phone;
		$("#emial").text = UserInfo.Email;
		$("#name").text = UserInfo.NickName;
		$("#sex").text = UserInfo.Sex;
		$("#school").text = UserInfo.School;
		$("#grade").text = UserInfo.Grade;
		$("#class").text = UserInfo.ClassName;
		$("#birth").text = UserInfo.School;

		$("#f_name").text = UserInfo.FatherName;
		$("#f_tel").text = UserInfo.FatherPhone;
		$("#m_name").text = UserInfo.MotherName;
		$("#m_tel").text = UserInfo.MotherPhone;
		$("#telephone").text = UserInfo.Tel;
		$("#address").text = UserInfo.Address;

	}

	get_data();
})



function get_request(courseid) {  
	var str=window.location.search;   //location.search是从当前URL的?号开始的字符串
	if (str.indexOf(name)!=-1){        
        var pos_start=str.indexOf(name) + name.length + 1;
        var pos_end=str.indexOf("&",pos_start);
        var pid = str.substring(pos_start);
        get_data(pid);
    }


}  


function get_data(cid) {

	// CourseRegistration/PhaseRegistration_PhaseStatus_Upd
	var couseid = cid;
	var param = {"CourseID":couseid};
	var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_Details");
	if (result.MSG == "OK") {
		request = result.Data;
	}

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