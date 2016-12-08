//报名
var request;
var course_id;
var courseTID;

var phaseinfo;
var isOpenOther;

//课程阶段 一阶  二阶等
var ptype;

var isJoinedCourse; //是否参加过课程

var isHaveService; //是否有增值服务

var isParentList; //是否是智慧家长课程

$(function ($) {
    GetUserData();
    document.getElementById("radio_zhihui_div").style.display = "none";
    document.getElementById("question-div").style.display = "none";

    get_request("CourseID", "CourseType");
    get_phaselist("CourseID");

    var sureButton = document.getElementById("sureButton");
    sureButton.onclick = function () {
        sure();
    };

    var otherStud = document.getElementById("other_radio5");
    otherStud.onclick = function () {
        other();
        isOpenOther = true;
    }


    document.getElementById("channel_radio1").onclick = function () {
        deleteOther();
    }
    document.getElementById("channel_radio2").onclick = function () {
        deleteOther();
    }
    document.getElementById("channel_radio3").onclick = function () {
        deleteOther();
    }
    document.getElementById("channel_radio4").onclick = function () {
        deleteOther();
    }

    var result = $Course.GetAjaxJson({}, ApiUrl + "SysConfig/SysConfig_Default");
    console.log(result);

    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    if (UserInfo != null || UserInfo != "null") {
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
        if (parseInt(UserInfo.Integral / result.Data[0].IntegralAndMoneyScale) > 0) {
            $("#integral").show();
            $(".integral").html("可用" + UserInfo.Integral + "个能量币抵扣" + parseInt(UserInfo.Integral / result.Data[0].IntegralAndMoneyScale) + "元学费");
        }else{
            $("#integral").hide();
        }

    }
    get_joinedState();
});
function GetUserData() {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {UserID: UserInfo.UserID};
    console.log(UserInfo)
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/GetUserInfoByUserID");
    result.Data.Ticket = UserInfo.Ticket;
    //将用户信息存入Cookie
    $.cookie("UserInfo", $Course.stringify(result.Data), {path: '/'});
}

function other() {
    if (!isOpenOther) {
        var otherHtml = "";
        otherHtml += '  <div id="other_text_radio" class="other_text_radio">'
        otherHtml += '   <label>请输入介绍人（学生）姓名：'
        otherHtml += '     <input id="introduce" type="text" name="channelRadio">'
        otherHtml += '   </label>'
        otherHtml += ' </div>'
        $(".channel-row").append(otherHtml);
    }
}

function deleteOther() {
    if (isOpenOther) {
        isOpenOther = false;
        $(".other_text_radio").remove();
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
    var introduce = $("#introduce").val();

    var sex = $("input[name=sexRadio]:checked").val();
    var p_sex = $("input[name=p_sexRadio]:checked").val();
    var inputer = $("input[name=inputerRadio]:checked").val();
    var channel = $("input[name=channelRadio]:checked").val();
    var sel_pid = $("input[name=radio_phase]:checked").val();//一阶课程期数
    var p_name = $("#p_name").val();
    var p_birth = $("#p_birth").val();
    var p_email = $("#p_email").val();
    var p_tel = $("#p_tel").val();
    var IsIntegral = $("input[name=integral]").is(':checked') ? 1 : 0;
    if (channel == undefined) {
        channel = 0
        layer.open({content: "请选择渠道"});
        return;
    }
    ;
    if (server_id == undefined && isHaveService) {
        server_id = 0;
        layer.open({content: "请选择您的增值服务"});
        return;
    }
    ;
    if (inputer == undefined && !isParentList) {
        layer.open({content: "请选择填表人"});
        return;
    }
    ;

    if (p_name == "") {
        layer.open({content: "请填写姓名"});
        return;
    }

    if (p_birth == "") {
        layer.open({content: "请填写生日"});
        return;
    }

    if (p_email == "") {
        layer.open({content: "请填写邮箱"});
        return;
    }

    if (p_tel == "") {
        layer.open({content: "请填写联系方式"});
        return;
    }

    if (p_sex == undefined) {
        p_sex = "";
    }


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
    param.introduce = introduce;
    param.tellme = remark;
    param.factory = factory;
    param.p_pname = p_name;
    param.p_sex = p_sex;
    param.p_birth = p_birth;
    param.p_email = p_email;
    param.p_tel = p_tel;
    param.IsIntegral = IsIntegral;

    //发送调查问卷

    if (!isJoinedCourse) {
        post_question(param);
    }

    if (courseTID != 2) {
        updateInfo(param);
    }
    layer.open({
        "content": "是否进行预约？",
        btn: ["确定", "取消"],
        yes: function (index) {
            course_reg(param);
            layer.close(index);
        },
        no: function (index) {
            layer.close(index);
        }
    });


}

function updateInfo(obj) {
    // 更改个人信息
    if (!dateVerify(obj.birth)) {
        layer.open({content: "出生日期格式不正确,请按照正确格式输入"});
        return;
    }

    if (obj.name == "" || obj.sex == undefined || obj.school == "" || obj.birth == ""
        || obj.f_name == "" || obj.f_tel == "" || obj.m_name == "" || obj.m_tel == ""
        || obj.address == "" || obj.server_id == undefined || obj.sel_pid == undefined) {
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
        var param_cookie = {"UserID": UserInfo.UserID};
        var result_cookie = $Course.GetAjaxJson(param_cookie, ApiUrl + "User/GetUserInfoByUserID");
        result_cookie.Data.Ticket = UserInfo.Ticket;
        $.cookie("UserInfo", $Course.stringify(result_cookie.Data), {path: '/'});
    }
}

function post_question(obj) {

    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var q1 = $(".q1").val();
    var q2 = $(".q2").val();
    var q3 = $(".q3").val();
    var q4 = $(".q4").val();
    var q5 = $(".q5").val();
    var q6 = $(".q6").val();
    var q7 = $(".q7").val();

    var param_question = {
        "UserID": UserInfo.UserID,
        "CourseID": course_id,
        "Q1": q1,
        "Q2": q2,
        "Q3": q3,
        "Q4": q4,
        "Q5": q5,
        "Q6": q6,
        "Q7": q7
    };

    var result_cookie = $Course.PostAjaxJson(param_question, ApiUrl + "Questionnaire/Questionnaire_Add");


}

//课程报名
function course_reg(obj) {

    if (obj.name == "" || obj.sex == undefined || obj.school == "" || obj.birth == ""
        || obj.f_name == "" || obj.f_tel == "" || obj.m_name == "" || obj.m_tel == ""
        || obj.address == "" || obj.sel_pid == undefined || obj.name == "") {
        layer.open({content: "信息输入未完整，请填写完整再预约"});
        return;
    }

    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {
        "UserID": UserInfo.UserID,
        "CourseID": course_id,
        "Channel": obj.channel,
        "Preparer": obj.inputer,
        "Sponsor": obj.introduce,
        "TellMe": obj.tellme,
        "WorkUnits": obj.factory,
        "ParentSex": obj.p_sex,
        "ParentBirthday": obj.p_birth,
        "ParentName": obj.p_pname,
        "ParentEmail": obj.p_email,
        "ParentPhone": obj.p_tel,
        IsIntegral: obj.IsIntegral
    };

    var result = $Course.PostAjaxJson(param, ApiUrl + "CourseRegistration/CourseRegistration_Add");

    if (result.Msg == "OK" && result.Data) {
        //课程报名成功
        phase_book(obj);
    }
}

//智慧家长报名
function parent_reg(obj) {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {
        "UserID": UserInfo.UserID,
        "CourseID": course_id,
        "Channel": obj.channel,
        "Preparer": obj.inputer,
        "WorkUnits": obj.factory
    };

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
            "PhaseType": $("input[name=radio_phase]:checked").attr("ptype")
        }
        ;
    var result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseRegistration_Add");
    if (result.Msg == "OK") {
        layer.open({
            "content": "预约成功",
            time: 2,
            end: function () {
                window.location.href = "../Course/CourseList.html";
            }
        });
    }
}

//判断参加课程状态 是否参加过一阶课程
function get_joinedState() {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {"UserID": UserInfo.UserID};
    // var param = {"UserID": 156};

    var result = $Course.GetAjaxJson(param, ApiUrl + "course/Is_JoinCourse");
    if (result.Msg == "OK") {
        isJoinedCourse = result.Data.IsJoinedCourse;
        if (isJoinedCourse == 0 && courseTID != 2) {
            document.getElementById("question-div").style.display = "block";
        }
    }
}


function dateVerify(date) {
    var a = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (!a.test(date)) return false;
    return true;
}


function get_request(courseid, CourseType) {


    var str = window.location.search;   //location.search是从当前URL的?号开始的字符串
    if (str.indexOf(courseid) != -1) {
        var pos_start = str.indexOf(courseid) + courseid.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        var pid = str.substring(pos_start, pos_end);
        //获取课程详情 目前使用假数据
        course_id = pid;
        get_data(pid);
    }

    if (str.indexOf(CourseType) != -1) {
        var pos_start = str.indexOf(CourseType) + CourseType.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        var ctid = str.substring(pos_start);

        courseTID = ctid;
        if (courseTID == 2) {
            //智慧家长课程
            isParentList = true;
            document.getElementById("question-div").style.display = "none";
            document.getElementById("radio_zhihui_div").style.display = "block";

            create_parentlist();
        }
    }
}


function create_parentlist() {
//  报名表,把学校、年级、班级、父母联系方式以及姓
// 名、填表人去除,改成工作单位、备注
    document.getElementById("stu_tel_row").style.display = "none";
    document.getElementById("email_row").style.display = "none";
    document.getElementById("name_text").style.display = "none";
    document.getElementById("stu_sex_row").style.display = "none";
    document.getElementById("stu_birth").style.display = "none";
    // document.getElementById("stu_phone").style.display = "none";

    document.getElementById("m_name_text").style.display = "none";
    document.getElementById("m_tel_text").style.display = "none";
    document.getElementById("f_name_text").style.display = "none";
    document.getElementById("f_tel_text").style.display = "none";
    document.getElementById("inputter").style.display = "none";
    document.getElementById("school_text").style.display = "none";
    document.getElementById("grade_text").style.display = "none";
    document.getElementById("class_text").style.display = "none";

    var topHtml = "";
    topHtml += ' <div  class="row" id="f_name_text">'
    topHtml += '     <div class="col-xs-4"><p class="text">家长性别</p></div>'
    topHtml += '<div class="radio">'
    topHtml += '     <label>'
    topHtml += '         <input type="radio" name="p_sexRadio" checked="checked"  value="男">男'
    topHtml += '     </label>'
    topHtml += '</div>'
    topHtml += '<div class="radio">'
    topHtml += '  <label>'
    topHtml += '     <input type="radio" name="p_sexRadio"  value="女">女'
    topHtml += '  </label>'
    topHtml += '</div>'
    topHtml += ' </div>'
    topHtml += ' <div  class="row" id="f_tel_text">'
    topHtml += '     <div class="col-xs-4"><p class="text">联系方式</p></div>'
    topHtml += '     <div class="col-xs-8"><input class="input" id="p_tel" type="text" style="height:40px; width:100%;"></div>'
    topHtml += ' </div>'
    topHtml += ' </div>'
    topHtml += ' <div  class="row" id="f_tel_text">'
    topHtml += '     <div class="col-xs-4"><p class="text">出生日期</p></div>'
    topHtml += '     <div class="col-xs-8"><input class="input" id="p_birth" type="text" style="height:40px; width:100%;"></div>'
    topHtml += ' </div>'
    topHtml += ' <div  class="row" id="f_tel_text">'
    topHtml += '     <div class="col-xs-4"><p class="text">姓名</p></div>'
    topHtml += '     <div class="col-xs-8"><input class="input" id="p_name" type="text" style="height:40px; width:100%;"></div>'
    topHtml += ' </div>'
    topHtml += ' <div  class="row" id="f_tel_text">'
    topHtml += '     <div class="col-xs-4"><p class="text">邮件</p></div>'
    topHtml += '     <div class="col-xs-8"><input class="input" id="p_email" type="text" style="height:40px; width:100%;"></div>'
    topHtml += ' </div>'
    $(".sign").append(topHtml);


    var parentHtml = "";
    parentHtml += ' <div  class="row" id="f_name_text">'
    parentHtml += '     <div class="col-xs-4"><p class="text">工作单位</p></div>'
    parentHtml += '     <div class="col-xs-8"><input class="input" id="factory" type="text" style="height:40px; width:100%;"></div>'
    parentHtml += ' </div>'
    parentHtml += ' <div  class="row" id="f_tel_text">'
    parentHtml += '     <div class="col-xs-12"><p class="text">备注(说说您相对摩英说的话)</p></div>'
    parentHtml += '     <div class="col-xs-12"><textarea class="input" id="remark" type="text" style="resize:none; height:60px; width:100%;"></textarea></div>'
    parentHtml += ' </div>'
    $(".other").append(parentHtml);

}

//课程一阶列表数据获取
function get_phaselist(cid) {
    var str = window.location.search;   //location.search是从当前URL的?号开始的字符串
    if (str.indexOf(cid) != -1) {
        var pos_start = str.indexOf(cid) + cid.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        var pid = str.substring(pos_start, pos_end);
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

function selectedPhase(phasetype) {
    // body...
    if (phasetype == 4 || phasetype == 3) {
        document.getElementById("zengzhi").style.display = "none";
    } else {
        document.getElementById("zengzhi").style.display = "block";
    }
}

//创建课程一阶列表
function create_phaselist(data) {
    if (data.length) {
        var strHtml = "";
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var color = row.ReservationCount == row.PeopleCount ? "red" : "black"
            var StartTime = row.StartTime ? row.StartTime.split(' ')[0] : "待定";
            var EndTime = row.EndTime ? row.EndTime.split(' ')[0] : "待定";
            strHtml += '    <div class="radio">'
            strHtml += '       <label>'
            strHtml += '          <input type="radio" onclick="selectedPhase(' + row.PhaseType + ')" ptype="' + row.PhaseType + '" name="radio_phase" value="' + row.PhaseID + '">'
            strHtml += '            <p>' + row.CoursePhaseName + '</p>'
            if (row.PhaseType != 1 && row.PhaseType != 0) {
                strHtml += '            <p style="color:red;">' + "(仅限参加过一阶课程的老学员)" + '</p>'
            }
            strHtml += '            <p>开始时间：' + StartTime + '</p>'
            strHtml += '            <p>结束时间：' + EndTime + '</p>'
            // if (row.PhaseType != 1) {
            //     strHtml += '            <p style="color:' + color + ';">报名人数：' + row.ReservationCount + '/' + row.PeopleCount + '</p>'
            // }
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
            isHaveService = true;
            var zengzhiHtml = "";
            zengzhiHtml += '<span style="color: red">*</span><span class="zengzhi_title">请选择您的增值服务</span>'
            zengzhiHtml += '    <div class="radio">'
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
            zengzhiHtml += '    <label>'
            zengzhiHtml += '        <input type="radio" name="radio_server" value="4">'
            zengzhiHtml += '        <p>VIP摩英大电影 + VIP蜕变水晶相册：' + '<span style="color:red">2680元</span>' + '(单阶7天)' + '<span style="color:red">强烈推荐，性价比极高</span>' + '</p>'
            zengzhiHtml += '    </label>'
            zengzhiHtml += '    </div>'
            zengzhiHtml += '      <div class="radio">'
            zengzhiHtml += '        <label>'
            zengzhiHtml += '           <input type="radio" name="radio_server" value="5">'
            zengzhiHtml += '           <p>VIP摩英大电影 + VIP蜕变水晶相册3980元 强烈推荐 性价比极高（两阶14天）</p>'
            zengzhiHtml += '        </label>'
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
}