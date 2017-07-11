/**
 * Created by wangbin on 2017/1/5.
 */

$(function ($) {
    $('#birthday').date();
    $("#distpicker").distpicker({
        autoSelect: false
    });
    GetAllPhase();
    $("input[name=from]").on("change", function () {
        var from = $("input[name=from]:checked").val();
        if (from == 5) {
            $("#sponsor").show();
        } else {
            $("#sponsor").hide();
        }
    });
    $("input[name=tbr]").on("change", function () {
        var tbr = $("input[name=tbr]:checked").val();
        if (tbr == "其他") {
            $("#preparer").show();
        } else {
            $("#preparer").hide();
        }
    });
});

function GetAllPhase() {
    var param = {};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_All");

    var CourseData = result.Data;
    var CourseNameArr = {};
    for (var i = 0; i < CourseData.length; i++) {
        CourseNameArr[CourseData[i].CoursePhaseName] = CourseData[i].CoursePhaseName;
    }
    // console.log(CourseNameArr);
    var strHtml = "<br/><h5>请选择您的课程和期数</h5>";
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
            var disabled = "";
            var manyuan = "";
            if (row.Periods == 19 || row.Periods == 20) {
                disabled = "disabled";
                manyuan = "<span style='color: #ff0000;'>已爆滿</span>";
            }
            strHtml += '<div class="radio">';
            strHtml += '    <label>';
            strHtml += '        <input ' + disabled + ' onclick="SelectPhase(' + row.PhaseType + ')" name="radio_phase" value="' + row.PhaseID + '" ptype="' + row.PhaseType + '" cid="' + row.CourseID + '" type="radio">';
            strHtml += '        <p>' + row.CoursePhaseName + '</p>';
            if (row.PhaseType != 1 && row.PhaseType != 0) {
                strHtml += '            <p style="color:red;">' + "(仅限参加过一阶课程的老学员)" + '</p>'
            }
            strHtml += '        <p>开始时间：' + StartTime + '</p>';
            strHtml += '        <p>结束时间：' + EndTime + '</p>';
            strHtml += '        <p>' + manyuan + '</p>';
            strHtml += '    </label>';
            strHtml += '</div>';
            if (i == NameArr.length - 1) {
                strHtml += '<div class="row mgt8">';
                strHtml += '    <div class="col-xs-12" style="text-align: center">....................</div>';
                strHtml += '</div>';
            }
        }
        // console.log(NameArr);
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

    // var Province = $('input[id=province] option:selected').val();
    // var City = $('input[id=city] option:selected').val();
    // var District = $('input[id=district] option:selected').val();

    var Phone = $("input[name=mob]").val();
    var IDCard = $("input[name=idcard]").val();
    var Email = $("input[name=email]").val();
    var FatherName = $("input[name=f_name]").val();
    var FatherPhone = $("input[name=f_mobile]").val();
    var MotherName = $("input[name=m_name]").val();
    var MotherPhone = $("input[name=m_mobile]").val();
    var Tel = $("input[name=telphone]").val();

    var ProvinceSel=document.getElementById("province");
    var ProvinceIndex = ProvinceSel.selectedIndex; // 选中索引
    var Province = ProvinceSel.options[ProvinceIndex].value;//要的值

    var CitySel=document.getElementById("city");
    var CityIndex = CitySel.selectedIndex; // 选中索引
    var City = CitySel.options[CityIndex].value;//要的值

    var DistrictSel=document.getElementById("district");
    var DistrictIndex = DistrictSel.selectedIndex; // 选中索引
    var District = DistrictSel.options[DistrictIndex].value;//要的值

    var Detailed_Address = $("input[name=address]").val();
    // var Address = $("input[name=address]").val();

    var Address = Province + City + District + Detailed_Address;

    var account = $("input[name=account]:checked").val();
    var Is_Old = $("input[name=isOldstudents]:checked").val();
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
            content: '学员姓名不能为空', style: 'background-color:#fff; color:#000; border:none;width:70%', time: 2
        });
        return;
    }

    if (!BirthDay) {
        layer.open({
            content: '出生日期不能为空', style: 'background-color:#fff; color:#000; border:none;width:70%', time: 2
        });
        return;
    }
    //var a = /^(\d{4})-(\d{2})-(\d{2})$/;
    var birth = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (!birth.test(BirthDay)) {
        layer.open({
            content: '出生日期格式错误', style: 'background-color:#fff; color:#000; border:none;width:70%', time: 2
        });
        return;
    }

    if (!FatherName) {
        layer.open({
            content: '父亲姓名不能为空', style: 'background-color:#fff; color:#000; border:none;width:70%', time: 2
        });
        return;
    }

    if (!FatherPhone) {
        layer.open({
            content: '父亲手机号不能为空', style: 'background-color:#fff; color:#000; border:none;width:70%', time: 2
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
            content: '母亲手机号不能为空', style: 'background-color:#fff; color:#000; border:none;width:70%', time: 2
        });
        return;
    }

    if (!Account) {
        layer.open({
            content: '选中的手机号不能为空', style: 'background-color:#fff; color:#000; border:none;width:70%', time: 2
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

    if (!IDCard) {
        layer.open({
            content: '学员身份证不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!Province || Province == "" || !City || City == "" || !District || District == "") {
        layer.open({
            content: '地区不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    if (!Detailed_Address) {
        layer.open({
            content: '详细地址不能为空',
            style: 'background-color:#fff; color:#000; border:none;width:70%',
            time: 2
        });
        return;
    }

    // if (!Address) {
    //     layer.open({
    //         content: '快递地址不能为空',
    //         style: 'background-color:#fff; color:#000; border:none;width:70%',
    //         time: 2
    //     });
    //     return;
    // }

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
        IDCard: IDCard,
        Is_Old: Is_Old,
        Address: Address,
        Account: Account,
        Pwd: $Course.MD5("123456")
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserInfo_ADD");
    if (result.Msg == "OK") {
        param.UserID = result.Data.UserID;
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
    var tbr = $("input[name=tbr]:checked").val();
    var Preparer = tbr == "其他" ? $("#preparer").val() : tbr;
    var CourseID = $("input[name=radio_phase]:checked").attr("cid");
    console.log(CourseID);
    var TellMe = $("#tellme").val();
    var param = {
        UserID: UserInfo.UserID, CourseID: CourseID, Channel: from, Preparer: Preparer,
        Sponsor: Channel, TellMe: TellMe, WorkUnits: null, ParentSex: null,
        ParentBirthday: null, ParentName: null, ParentEmail: null, ParentPhone: null, IsIntegral: 0
    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "CourseRegistration/CourseRegistration_Add");
    if (result.Msg == "OK") {
        param.Account = UserInfo.Account;
        PhaseRegistration_Add_Fast(param);
    }
}

function PhaseRegistration_Add_Fast(Info) {
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
    var result = $Course.PostAjaxJson(param, ApiUrl + "PhaseRegistration/PhaseRegistration_Add_Fast");
    if (result.Msg == "OK") {
        layer.open({
            content: '报名成功!</br>用户名:' + Info.Account + '</br>初始密码:123456</br>为了您的安全请尽快修改密码',
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