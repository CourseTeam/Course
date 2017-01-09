/**
 * Created by wangbin on 2017/1/5.
 */

$(function ($) {
    GetAllPhase();
    $("input[name=from]").on("change", function () {
        var from = $("input[name=from]:checked").val();
        if (from == 5) {
            $("#sponsor").show();
        } else {
            $("#sponsor").hide();
        }
    })
});

function GetAllPhase() {
    // alert(111111);
    var param = {};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_All");

    var CourseData = result.Data;
    var CourseNameArr = {};
    for (var i = 0; i < CourseData.length; i++) {
        CourseNameArr[CourseData[i].CoursePhaseName] = CourseData[i].CoursePhaseName;
    }
    // console.log(CourseNameArr[1]);
    var strHtml = "";
    for (var a in CourseNameArr) {
        var NameArr = CourseData.FilterItem({CoursePhaseName: CourseNameArr[a]});
        // console.log(CourseNameArr[a]);
        for (var i = 0; i < NameArr.length; i++) {
            var row = NameArr[i];
            var StartTime = row.StartTime ? row.StartTime.split(' ')[0] : "待定";
            var EndTime = row.EndTime ? row.EndTime.split(' ')[0] : "待定";
            var CoursePhaseName = "第" + row.Periods + "期《" + row.CoursePhaseName + "》";
            if (row.PhaseType > 0) {
                CoursePhaseName += row.PhaseType + "阶课程";
            }
            strHtml += '<div class="radio">';
            strHtml += '    <label>';
            strHtml += '        <input onclick="SelectPhase(' + row.PhaseType + ')" name="radio_phase" value="' + row.PhaseID + '" ptype="' + row.PhaseType + '" cid="' + row.CourseID + '" type="radio">';
            strHtml += '        <p>' + CoursePhaseName + '</p>';
            if (row.PhaseType != 1 && row.PhaseType != 0) {
                strHtml += '            <p style="color:red;">' + "(仅限参加过一阶课程的老学员)" + '</p>'
            }
            strHtml += '        <p>开始时间：' + StartTime + '</p>';
            strHtml += '        <p>结束时间：' + EndTime + '</p>';
            strHtml += '    </label>';
            strHtml += '</div>';
            if (i == NameArr.length - 1) {
                strHtml += '<div class="row mgt8">';
                strHtml += '    <div class="col-xs-12" style="text-align: center">....................</div>';
                strHtml += '</div>';
            }
        }
        console.log(NameArr);
    }
    $("div.course_list").html(strHtml);
}

function Submit() {
    var NickName = $("input[name=nickname]").val();
    var Sex = $("input[name=sex]:checked").val();
    var School = $("input[name=school]").val();
    var Grade = $("input[name=grade]").val();
    var ClassName = $("input[name=ban]").val();
    var BirthDay = $("input[name=birthday]").val();
    var Phone = $("input[name=mob]").val();
    var Email = $("input[name=email]").val();
    var FatherName = $("input[name=f_name]").val();
    var FatherPhone = $("input[name=f_mobile]").val();
    var MotherName = $("input[name=m_name]").val();
    var MotherPhone = $("input[name=m_mobile]").val();
    var Tel = $("input[name=telphone]").val();
    var Address = $("input[name=address]").val();
    var account = $("input[name=account]:checked").val();
    var Course = $("input[name=radio_phase]:checked").val();
    var Account = null;
    if (account == 1) {
        Account = Phone;
    }
    if (account == 2) {
        Account = FatherPhone;
    }
    if (account == 3) {
        Account = MotherPhone;
    }

    if (!NickName) {
        layer.open({
            content: '学员姓名不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!BirthDay) {
        layer.open({
            content: '出生日期不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    var birth = /^(\d{4})\-(\d{2})\-(\d{2})$/;
    if (!birth.test(BirthDay)) {
        layer.open({
            content: '出生日期格式错误',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!FatherName) {
        layer.open({
            content: '父亲姓名不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!FatherPhone) {
        layer.open({
            content: '父亲手机号不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!MotherName) {
        layer.open({
            content: '母亲姓名不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!MotherPhone) {
        layer.open({
            content: '母亲手机号不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!Account) {
        layer.open({
            content: '选中的手机号不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    // 判断手机号是否正确的正则表达式
    var filter = /^1\d{10}$/;
    if (!filter.test(Account)) {
        layer.open({
            content: '请输入正确的手机号来作为账号',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    // 判断手机号是否已注册
    var register = GetUserInfoByAccount(Account);
    if (register) {
        layer.open({
            content: '手机号已被注册',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!Address) {
        layer.open({
            content: '快递地址不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!Course) {
        layer.open({
            content: '请选择课程',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    var param = {
        NickName: NickName,
        Sex: Sex,
        BirthDay: BirthDay,
        School: School,
        Grade: Grade,
        ClassName: ClassName,
        Email: Email,
        Phone: Phone,
        FatherName: FatherName,
        FatherPhone: FatherPhone,
        MotherName: MotherName,
        MotherPhone: MotherPhone,
        Tel: Tel,
        Address: Address,
        Account: Account,
        Pwd: $Course.MD5("123456")
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserInfo_ADD");
    if (result.Msg == "OK") {
        console.log("obobdsaoibf");
        console.log(result);
        param.UserID = result.Data.UserID;
        console.log(param);
        var Login_param = {Tel: Account, Pwd: $Course.MD5("123456")};
        var Login_result = $Course.GetAjaxJson(Login_param, ApiUrl + "Account/Login");
        console.log(Login_result);
        if (Login_result.Msg == "OK") {
            //将用户信息存入Cookie
            $.cookie("UserInfo", $Course.stringify(Login_result.Data), {expires: 7, path: '/'});
            $.cookie("Ticket", Login_result.Data.Ticket, {expires: 7, path: '/'});
            // param.from =
            CourseRegistration_Add(param);
        }
    }
}

function CourseRegistration_Add(UserInfo) {
    var from = $("input[name=from]:checked").val();
    var Channel = null;
    if (from == 5) {
        Channel = $("input[name=sponsor]").val()
    }
    var Preparer = $("input[name=tbr]:checked").val();
    var CourseID = $("input[name=radio_phase]:checked").attr("cid");
    console.log(CourseID);
    var TellMe = $("#tellme").val();
    var param = {
        UserID: UserInfo.UserID,
        CourseID: CourseID,
        Channel: from,
        Preparer: Preparer,
        Sponsor: Channel,
        TellMe: TellMe,
        WorkUnits: null,
        ParentSex: null,
        ParentBirthday: null,
        ParentName: null,
        ParentEmail: null,
        ParentPhone: null,
        IsIntegral: 0
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "CourseRegistration/CourseRegistration_Add");
    if (result.Msg == "OK") {
        PhaseRegistration_Add(param);
    }
}

function PhaseRegistration_Add(Info) {
    var PhaseID = $("input[name=radio_phase]:checked").val();
    var ValueAddedServices = $("input[name=service]:checked").val();
    var PhaseType = $("input[name=radio_phase]:checked").attr("ptype");
    var param = {
        PhaseID: PhaseID,
        UserID: Info.UserID,
        CourseID: Info.CourseID,
        ParentCount: 0,
        ValueAddedServices: ValueAddedServices,
        PhaseType: PhaseType
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseRegistration_Add");
    if (result.Msg == "OK") {
        layer.open({
            content: '报名成功!',
            time: 2,
            end: function () {
                window.location.href = "booking.html";
            }
        });
        return;
    }
}

function SelectPhase(PhaseType) {

    if (PhaseType > 0 && PhaseType < 3) {
        $("#ValueAddedServices").show();
        // 如果选择的是二阶课程那么两阶14天的增值服务就隐藏
        if (PhaseType > 1) {
            $("#DoubleServices").hide();
        } else {
            $("#DoubleServices").show();
        }
    } else {
        $("#ValueAddedServices").hide();
    }
}

// 判断手机号是否已注册
function GetUserInfoByAccount(Account) {
    var param = {Account: Account};
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/GetUserInfoByAccount");
    if (result.Msg == "OK") {
        return result.Data;
    }
}