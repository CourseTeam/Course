//报名
var request;
var course_id;
var courseTID;

var phaseinfo;

var isOpenOther;

$(function ($) {

    get_request("CourseID","CourseType");
    get_phaselist("CourseID");

    var sureButton = document.getElementById("sureButton");
    sureButton.onclick = function () {
        sure();
    };

    var otherStud = document.getElementById("other_radio");
    otherStud.onclick = function(){
    	other();
    	isOpenOther = true;
    }


    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    if (UserInfo) {
        //noinspection JSAnnotator
        document.getElementById("tel").value = UserInfo.Phone;
        document.getElementById("email").value = UserInfo.Email;
        document.getElementById("name").value = UserInfo.NickName;
        $("input[name=sexRadio]").val(UserInfo.Sex);
        document.getElementById("school").value = UserInfo.School;
        document.getElementById("grade").value = UserInfo.Grade;
        document.getElementById("class").value = UserInfo.ClassName;
        document.getElementById("birth").value = UserInfo.BirthDay.split(" ")[0];

        document.getElementById("f_name").value = UserInfo.FatherName;
        document.getElementById("f_tel").value = UserInfo.FatherPhone;
        document.getElementById("m_name").value = UserInfo.MotherName;
        document.getElementById("m_tel").value = UserInfo.MotherPhone;
        document.getElementById("telephone").value = UserInfo.Tel;
        document.getElementById("address").value = UserInfo.Address;
    }

});


function other() {
	if (!isOpenOther) {
		var otherHtml = "";
	    otherHtml += '	<div class="radio">'
	  	otherHtml += '   <label>请输入介绍人（学生）姓名：'
	    otherHtml += '     <input type="text" name="channelRadio">'
	    otherHtml += '   </label>'
	    otherHtml += ' </div>'
		$(".channel-row").append(otherHtml);
	}
}


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
    var factory = $("#factory").val();
    var remark = $("#remark").val();

    var sex = $("input[name=sexRadio]:checked").val();
    var inputer = $("input[name=inputerRadio]:checked").val();
    var channel = $("input[name=channelRadio]:checked").val();
    var sel_pid = $("input[name=radio_phase]:checked").val();//一阶课程期数
    if (channel == undefined) {channel = 0};
    if (server_id == undefined) {server_id = 0};
    if (sel_pid == undefined) {sel_pid = 0};
    if (inputer == undefined) {inputer = "父亲"};


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
    param.sel_pid = sel_pid;
    param.sponsor = factory;
    param.tellme = remark;

    if (courseTID != 2) {
	    updateInfo(param);
    }
    course_reg(param);

}

function updateInfo(obj) {
    // 更改个人信息
    if (!dateVerify(obj.birth)) {
        layer.open({content: "出生日期格式不正确,请按照正确格式输入"});
        return;
    }

    if (obj.name == "" || obj.sex == undefined || obj.school == "" || obj.birth == ""
        || obj.f_name == "" || obj.f_tel == "" || obj.m_name == "" || obj.m_tel == "" || obj.address == "" || obj.server_id == undefined || obj.sel_pid == undefined) {
        layer.open({content: "信息输入未完整，请填写完整再预约"});
        return;
    }
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {
        "UserID": UserInfo.UserID, "NickName": obj.name, "Account": "", "Sex": obj.sex, "School": obj.school,
        "Grade": obj.grade, "ClassName": obj.class, "BirthDay": obj.birth, "Email": obj.email, "Phone": obj.tel,
        "FatherName": obj.f_name, "FatherPhone": obj.f_tel, "MotherName": obj.m_name, "MotherPhone": obj.m_tel,
        "Tel": obj.telephone, "Address": obj.address
    };

    var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserInfo_Edit");
    if (result.Msg == "OK" && result.Data == true) {
        //更新个人信息成功 更改cookie
        var param_cookie = {"UserID":UserInfo.UserID};
        var result_cookie = $Course.GetAjaxJson(param_cookie, ApiUrl + "User/GetUserInfoByUserID");
        $.cookie("UserInfo", $Course.stringify(result_cookie.Data), {expires: 30, path: '/'});
    }
}

//课程报名
function course_reg(obj) {

    if (obj.name == "" || obj.sex == undefined || obj.school == "" || obj.birth == ""
        || obj.f_name == "" || obj.f_tel == "" || obj.m_name == "" || obj.m_tel == "" || obj.address == "" || obj.sel_pid == undefined) {
        layer.open({content: "信息输入未完整，请填写完整再预约"});
        return;
    }

    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {"UserID": UserInfo.UserID, "CourseID": course_id, "Channel": obj.channel, 
    			 "Preparer": obj.inputer,"Sponsor":obj.sponsor,"TellMe":obj.tellme};
    var result = $Course.PostAjaxJson(param, ApiUrl + "CourseRegistration/CourseRegistration_Add");

    if (result.Msg == "OK" && result.Data != false) {
        //课程报名成功
        layer.open({
            "content": "是否进行预约？",
            btn: ["确定", "取消"],
            yes: function (index) {
                phase_book(obj);
                layer.close(index);
            },
            no: function (index) {
                layer.close(index);
            }
        });
    }
}

//智慧家长报名
function parent_reg(obj) {
   var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
   var param = {"UserID": UserInfo.UserID, "CourseID": course_id, "Channel": obj.channel, "Preparer": obj.inputer};

}

//阶段预约
function phase_book(obj) {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {
        "UserID": UserInfo.UserID,
        "CourseID": course_id,
        "PhaseID": obj.sel_pid,
        "ParentCount": 0,
        "ValueAddedServices": obj.server_id,
        "PhaseType": phaseinfo.PhaseType
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseRegistration_Add");
    if (result.Msg == "OK") {
        layer.open({
            "content": "预约成功",
            time: 2,
            end: function () {
                window.location.href = "../Appointment/CourseList.html";
            }
        });
    }
}


function dateVerify(date) {
    var a = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (!a.test(date)) return false;
    return true;
}


function get_request(courseid,CourseType) {
    var str = window.location.search;   //location.search是从当前URL的?号开始的字符串
    if (str.indexOf(courseid) != -1) {
        var pos_start = str.indexOf(courseid) + courseid.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        var pid = str.substring(pos_start,pos_end);
        //获取课程详情 目前使用假数据
        course_id = pid;
        get_data(pid);
    }

    if (str.indexOf(CourseType) != -1) {
    	 var pos_start = str.indexOf(CourseType) + CourseType.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        var ctid = str.substring(pos_start);
        //获取课程详情 目前使用假数据
        courseTID = ctid;
        if (courseTID == 2) {
        	//智慧家长课程
        	create_parentlist();
        }
    }

}


function create_parentlist(){
// 	报名表,把学校、年级、班级、父母联系方式以及姓
// 名、填表人去除,改成工作单位、备注

	document.getElementById("m_name_text").style.display = "none";
	document.getElementById("m_tel_text").style.display = "none";
	document.getElementById("f_name_text").style.display = "none";
	document.getElementById("f_tel_text").style.display = "none";
	document.getElementById("inputter").style.display = "none";
	document.getElementById("school_text").style.display = "none";
	document.getElementById("grade_text").style.display = "none";
	document.getElementById("class_text").style.display = "none";
	document.getElementById("name_text").style.display = "none";

	var parentHtml = "";
	parentHtml += '<div  class="row" id="f_name_text">'
	parentHtml += '		<div class="col-xs-4"><p class="text">工作单位</p></div>'
	parentHtml += '		<div class="col-xs-8"><input class="input" id="factory" type="text"></div>'
	parentHtml += '	</div>'
	parentHtml += '	<div  class="row" id="f_tel_text">'
	parentHtml += '		<div class="col-xs-4"><p class="text">备注</p></div>'
	parentHtml += '		<div class="col-xs-8"><input class="input" id="remark" type="text"></div>'
	parentHtml += '	</div>'
	$(".other").append(parentHtml);

}

//课程一阶列表数据获取
function get_phaselist(cid) {
    var str = window.location.search;   //location.search是从当前URL的?号开始的字符串
    if (str.indexOf(cid) != -1) {
        var pos_start = str.indexOf(cid) + cid.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        var pid = str.substring(pos_start,pos_end);
        //获取课程详情 目前使用假数据
        course_id = pid;
        var param = {"CourseID": course_id};
        var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_OnePhase");
        if (result.Msg == "OK") {
            var data = result.Data;
            create_phaselist(data);
        }
    }
}

//创建课程一阶列表
function create_phaselist(data) {
    if (data.length) {
        var strHtml = "";
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var color = row.ReservationCount == row.PeopleCount ? "red" : "black"
            strHtml += '	<div class="radio">'
            strHtml += '       <label>'
            strHtml += '          <input type="radio" name="radio_phase" value="' + row.PhaseID + '">'
            strHtml += '            <p>' + row.CoursePhaseName + '</p>'
            if (row.PhaseType != 1 && row.PhaseType != 0) {
	            strHtml += '            <p style="color:red;">' + "(仅限参加过一阶课程的老学员)" + '</p>'
            }
            strHtml += '            <p>开始时间：' + row.StartTime.substring(0, 10) + '</p>'
            strHtml += '            <p>结束时间：' + row.EndTime.substring(0, 10) + '</p>'
            if (row.PhaseType != 1) {strHtml += '            <p style="color:' + color + ';">报名人数：' + row.ReservationCount + '/' + row.PeopleCount + '</p>'}
            strHtml += '        </label>'
            strHtml += '    </div>'
        }
        $(".phase_container").append(strHtml);
    }
}

function get_data(cid) {

    var couseid = cid;
    var param = {"CourseID": couseid};
    var phase_type = cid
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_Details");

    if (result.Msg == "OK") {
        request = result.Data.courseInfo;
        phaseinfo = result.Data.phaselist[0];
        $("#course_title").html(result.Data.courseInfo.CourseName);

        if (phaseinfo.PhaseType == 1 || phaseinfo.PhaseType == 2) {
            var zengzhiHtml = "";
            zengzhiHtml += '<p class="zengzhi_title">请选择您的增值服务</p>'
            zengzhiHtml += '	<div class="radio">'
            zengzhiHtml += '       <label>'
            zengzhiHtml += '          <input type="radio" name="radio_server" value="1">'
            zengzhiHtml += '            <p>统一版摩英回忆视频：' + '<span style="color:red">300元</span>' + '（单阶7天）</p>'
            zengzhiHtml += '        </label>'
            zengzhiHtml += '    </div>'
            zengzhiHtml += '    <div class="radio">'
            zengzhiHtml += '     <label>'
            zengzhiHtml += '        <input type="radio" name="radio_server" value="2">'
            zengzhiHtml += '        <p>VIP摩英大电影：' + '<span style="color:red">1980元</span>' + '（单阶7天）</p>'
            zengzhiHtml += '      </label>'
            zengzhiHtml += '   </div>'
            zengzhiHtml += '    <div class="radio">'
            zengzhiHtml += '      <label>'
            zengzhiHtml += '        <input type="radio" name="radio_server" value="3">'
            zengzhiHtml += '        <p>VIP蜕变水晶相册：' + '<span style="color:red">1280元</span>' + '（单阶7天）</p>'
            zengzhiHtml += '      </label>'
            zengzhiHtml += '    </div>'
            zengzhiHtml += '    <div class="radio">'
            zengzhiHtml += '      <label>'
            zengzhiHtml += '        <input type="radio" name="radio_server" value="4">'
            zengzhiHtml += '        <p>VIP摩英大电影 + VIP蜕变水晶相册：' + '<span style="color:red">2680元</span>'+ '(单阶7天)' + '<span style="color:red">强烈推荐，性价比极高</span>' + '</p>'
            zengzhiHtml += '      </label>'
            zengzhiHtml += '    </div>'
            zengzhiHtml += '    <div class="radio">'
            zengzhiHtml += '      <label>'
            zengzhiHtml += '        <input type="radio" name="radio_server" value="0">'
            zengzhiHtml += '        <p>不需要此项服务</p>'
            zengzhiHtml += '      </label>'
            zengzhiHtml += '    </div>'
            $(".zengzhi").append(zengzhiHtml);
        }
    }
    		
            // zengzhiHtml += '    <div class="radio">'
            // zengzhiHtml += '      <label>'
            // zengzhiHtml += '        <input type="radio" name="radio_server" value="5">'
            // zengzhiHtml += '        <p>VIP摩英大电影 + VIP蜕变水晶相册3980元 强烈推荐 性价比极高（两阶14天）</p>'
            // zengzhiHtml += '      </label>'
            // zengzhiHtml += '    </div>'

}