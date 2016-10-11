//报名
var request;
var course_id;

$ (function($){

    get_request("CourseID");
    get_phaselist("CourseID");

    var sureButton = document.getElementById("sureButton");
 	sureButton.onclick = function(){
 		sure();
 	};

	var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
	if (UserInfo) {
		//noinspection JSAnnotator
		document.getElementById("tel").value = UserInfo.Phone;
		document.getElementById("email").value = UserInfo.Email;
		document.getElementById("name").value = UserInfo.NickName;
		document.getElementById("sex").value = UserInfo.Sex;
		document.getElementById("school").value = UserInfo.School;
		document.getElementById("grade").value = UserInfo.Grade;
		document.getElementById("class").value = UserInfo.ClassName;
		document.getElementById("birth").value = UserInfo.School;
		
		document.getElementById("f_name").value = UserInfo.FatherName;
		document.getElementById("f_tel").value = UserInfo.FatherPhone;
		document.getElementById("m_name").value = UserInfo.MotherName;
		document.getElementById("m_tel").value = UserInfo.MotherPhone;
		document.getElementById("telephone").value = UserInfo.Tel;
		document.getElementById("address").value = UserInfo.Address;
		
	}
	
});

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

	var param = {};
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
		return;
	}

	if (obj.name == "" || obj.sex == "" || obj.school == "" || obj.grade == "" || obj.class == "" || obj.birth == ""
		|| obj.email == "" || obj.tel == "" || obj.f_name == "" || obj.f_tel == "" || obj.m_name == "" || obj.m_tel == "" ||
		 obj.telephone == "" || obj.address == "") {
		layer.open({content:"信息输入未完整，请填写完整再预约"});
		return;
	}

	var param = {"UserID":"1","NickName":obj.name,"Account":"","Sex":obj.sex,"School":obj.school,
				"Grade":obj.grade,"ClassName":obj.class,"BirthDay":obj.birth,"Email":obj.email,"Phone":obj.tel,
				"FatherName":obj.f_name,"FatherPhone":obj.f_tel,"MotherName":obj.m_name,"MotherPhone":obj.m_tel,
				"Tel":obj.telephone,"Address":obj.address};

	var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserInfo_Edit");
	if (result.Msg == "OK" && result.Data == true) {
		//更新个人信息成功
		course_reg();
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
	var a = /^(\d{4})-(\d{2})-(\d{2})$/;
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


//课程一阶列表
function get_phaselist(cid) {
	var param = {"CourseID":cid};
	var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_OnePhase");
	if (result.Msg == "OK") {
		
	}
}


function get_data(cid) {

	// CourseRegistration/PhaseRegistration_PhaseStatus_Upd
	var couseid = cid;
	var param = {"CourseID":couseid};
	var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_Details");
	if (result.Msg == "OK" && result.Data.length > 0) {
		request = result.Data.phaselist[0];
	}

	var strHtml = "";

	strHtml += '<div class="row">';
	strHtml += '  <div class="col-xs-6">';
	strHtml += '	<p class="top-text">一阶开营时间：'+ request.StartTime.substr(0,10) + '</p>';
	strHtml += '  </div>';
	strHtml += '  <div class="col-xs-6">';
	strHtml += '	<p class="top-text">地点：' + request.Place + '</p>';
	strHtml += '  </div>';
	strHtml += '</div>';

	strHtml += '<div class="row">';
	strHtml += '  <div class="col-xs-6">';
	strHtml += '	<p class="top-text">剩余名额：'+ (request.PeopleCount - request.ReservationCount) + '</p>';
	strHtml += '  </div>';
	strHtml += '  <div class="col-xs-6">';
	strHtml += '	<p class="top-text">预约截止时间：'+ request.EndTime.substr(0,10) + '</p>';
	strHtml += '  </div>';
	strHtml += '</div>';

	$(".container").append(strHtml);


	if (request.phaseType == 4 || request.phaseType == 3) {

		var zengzhiHtml = "";
		zengzhiHtml += '<p class="zengzhi_title">请选择您的增值服务</p>'
		zengzhiHtml += '	<div class="radio">'
	    zengzhiHtml += '       <label>'
	    zengzhiHtml += '          <input type="radio" name="radio_server" value="1">'
	    zengzhiHtml += '            <p>统一版摩英回忆视频300元（单阶7天）</p>'
	    zengzhiHtml += '        </label>'
	    zengzhiHtml += '    </div>'
	    zengzhiHtml += '    <div class="radio">'
	    zengzhiHtml += '      <label>'
	    zengzhiHtml += '        <input type="radio" name="radio_server" value="2">'
	    zengzhiHtml += '        <p>VIP摩英大电影1980元（单阶7天）</p>'
	    zengzhiHtml += '      </label>'
	    zengzhiHtml += '   </div>'
	    zengzhiHtml += '    <div class="radio">'
	    zengzhiHtml += '      <label>'
	    zengzhiHtml += '        <input type="radio" name="radio_server" value="3">'
	    zengzhiHtml += '        <p>VIP蜕变水晶相册1280元（单阶7天）</p>'
	    zengzhiHtml += '      </label>'
	    zengzhiHtml += '    </div>'
	    zengzhiHtml += '    <div class="radio">'
	    zengzhiHtml += '      <label>'
	    zengzhiHtml += '        <input type="radio" name="radio_server" value="4">'
	    zengzhiHtml += '        <p>VIP摩英大电影 + VIP蜕变水晶相册2680元 强烈推荐 性价比极高（单阶7天）</p>'
	    zengzhiHtml += '      </label>'
	    zengzhiHtml += '    </div>'
	    zengzhiHtml += '    <div class="radio">'
	    zengzhiHtml += '      <label>'
	    zengzhiHtml += '        <input type="radio" name="radio_server" value="5">'
	    zengzhiHtml += '        <p>VIP摩英大电影 + VIP蜕变水晶相册3980元 强烈推荐 性价比极高（两阶14天）</p>'
	    zengzhiHtml += '      </label>'
	    zengzhiHtml += '    </div>'
	    zengzhiHtml += '      <div class="radio">'
	    zengzhiHtml += '      <label>'
	    zengzhiHtml += '        <input type="radio" name="radio_server" value="0" checked="checked">'
	    zengzhiHtml += '        <p>不需要此项服务</p>'
	    zengzhiHtml += '      </label>'
	    zengzhiHtml += '    </div>'
		$(".zengzhi").append(zengzhiHtml);

	}

}