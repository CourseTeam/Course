//报名
var request;
var course_id;

$ (function($){

    get_request("CourseID");
    var sureButton = document.getElementById("sureButton");
 	sureButton.onclick = function(){
 		sure();
 	}

	var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
	if (UserInfo) {
		$("#tel").val() = UserInfo.Phone;
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

})

function sure() {

	var server_id = $('input[name="radio_server"]:checked').val();
	var tel = $("#tel").val();
	var email = $("#email").val();
	var name = $("#name").val();
	var school = $("#school").val();
	var grade = $("#grade").val();
	var cclass = $("#class").val();
	var birth = $("#birth").val();

	var f_name = $("#f_name").val();
	var f_tel = $("#f_tel").val();
	var m_name = $("#m_name").val();
	var m_tel = $("#m_tel").val();
	var telephone = $("#telephone").val();
	var address = $("#address").val();

	var sex = $("input[name=sexRadio]:checked").val();
	var inputer = $("input[name=inputerRadio]:checked").val();
	var channel = $("input[name=channelRadio]:checked").val();

	var param = new Object();
	param.server_id = server_id;
	param.tel = tel;
	param.email = email;
	param.name = name;
	param.sex = sex;
	param.school = school;
	param.grade = grade;
	param.class = cclass;
	param.birth = birth;
	param.f_name = f_name;
	param.f_tel = f_tel;
	param.m_name = m_name;
	param.m_tel = m_tel;
	param.telephone = telephone;
	param.address = address;
	param.inputer = inputer;
	param.channel = channel;
	updateInfo(param);
	course_reg(param);

}	


function updateInfo(obj){
	// 更改个人信息
	// var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
	if (!dateVerify(obj.birth)) {
		layer.open({content:"出生日期格式不正确,请按照正确格式输入"});
	}

	if (obj.name == "" || obj.sex == "" || obj.school == "" || obj.grade == "" || obj.class == "" || obj.birth == ""
		|| obj.email == "" || obj.tel == "" || obj.f_name == "" || obj.f_tel == "" || obj.m_name == "" || obj.m_tel == "" ||
		 obj.telephone == "" || obj.address == "") {
		layer.open({content:"信息输入未完整，请填写完整再预约"});
	}

	var param = {"UserID":"1","NickName":obj.name,"Account":"","Sex":obj.sex,"School":obj.school,
				"Grade":obj.grade,"ClassName":obj.class,"BirthDay":obj.birth,"Email":obj.email,"Phone":obj.tel,
				"FatherName":obj.f_name,"FatherPhone":obj.f_tel,"MotherName":obj.m_name,"MotherPhone":obj.m_tel,
				"Tel":obj.telephone,"Address":obj.address};

	var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserInfo_Edit");
	if (result.Msg == "OK" && result.Data == true) {
		//更新个人信息成功

	}

}

function course_reg(obj){
	var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
	var param = {"UserID":UserInfo.UserID,"CourseID":course_id,"ValueAddedServices":obj.radio_server,"Channel":obj.channel,"Preparer":obj.inputer};
	var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_Details");
	if (result.Msg == "OK" && result.Data != false) {
		//预约成功
		layer.open({
			"title":"提示",
			"content":"是否进行预约？",
			btn:["取消","确定"],
			ok:function(index){
			layer.close(index);
	        window.location.href = "booksuccess.html";
			},no:function(index){
			layer.close(index);
			}

		})
	}
}

function dateVerify(date){ 
	var a = /^(\d{4})-(\d{2})-(\d{2})$/
	if(!a.test(date)) return false;
	return true;
}

function get_request(courseid) {  
	var str=window.location.search;   //location.search是从当前URL的?号开始的字符串
	if (str.indexOf(name)!=-1){        
        var pos_start=str.indexOf(name) + name.length + 1;
        var pos_end=str.indexOf("&",pos_start);
        var pid = str.substring(pos_start);
        //获取课程详情 目前使用假数据
        course_id = pid;
        get_data(pid);
    }
}  


function get_data(cid) {

	// CourseRegistration/PhaseRegistration_PhaseStatus_Upd
	var couseid = cid;
	var param = {"CourseID":couseid};
	var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_Details");
	if (result.Msg == "OK") {
		request = result.Data.phaselist[0];
	}

	var strHtml = "";

	strHtml += '<div class="row">'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	<p class="top-text">一阶开营时间：'+ request.StartTime.substr(0,10) + '</p>'			
	strHtml += '  </div>'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	<p class="top-text">地点：' + request.Place + '</p>'		 	
	strHtml += '  </div>'
	strHtml += '</div>'

	strHtml += '<div class="row">'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	<p class="top-text">剩余名额：'+ (request.PeopleCount - request.ReservationCount) + '</p>'			
	strHtml += '  </div>'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	<p class="top-text">预约截止时间：'+ request.EndTime.substr(0,10) + '</p>'		
	strHtml += '  </div>'
	strHtml += '</div>'


	$(".container").append(strHtml);

}