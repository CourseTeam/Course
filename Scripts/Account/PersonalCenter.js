/**
 * 个人中心
 * Created by wangbin on 2016/10/1.
 */
var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
var UserID = UserInfo.UserID;
console.log(UserInfo);

$(function ($) {
    GetData()
    $(".border_btm").on("click",function(){
        var name=$(this).find("span").eq(0).html();
        var values=$(this).find("span").eq(1).html();
        var id = $(this).find("span").eq(1).attr("id");
        if(name=="修改密码"){
            window.location.href = 'ChangePassword.html';
        } else if (name == "登录名") {

        } else if (name == '性别') {
            SexView(values);
        } else if (name == '出生日期') {
            DateView(values);
        } else {
            PopupView(name,values,id);
        }
    });
    $("#exit").on("click", function () {
       Exit();
    });
});

function PopupView(name, values, id) {
    layer.open({
        title:name,
        content: '<input style="outline: none;" type="text" id="edit" placeholder="请输入' + name + '">',
        // style: 'background-color:#F24C4C; color:#fff; border:none;'
        btn:['确定','取消'],
        yes:function (index) {
            $("#" + id).html($("#edit").val());
            Edit();
            layer.close(index);
        }
    });
    $("input[type='text']").on('focus',function () {
        $(this).css('border','1px solid #F24C4C');
    }).on('blur',function(){
        $(this).css('border','1px solid #eeeeee');
    });
    $("#edit").val(values);
}

function SexView(values) {
    layer.open({
       title:"性别",
        content:'<div class="radio">' +
                    '<label>' +
                        '<input type="radio" name="optionsRadios" id="optionsRadios1" checked="checked">男' +
                    '</label>' +
                '</div>' +
                '<div class="radio">' +
                    '<label>' +
                        '<input type="radio" name="optionsRadios" id="optionsRadios2">女' +
                    '</label>' +
                '</div>',
        btn:['确定','取消'],
        yes:function (index) {
            if (document.getElementById("optionsRadios1").checked == true) {
                $("#sex").html("男");
            } else if (document.getElementById("optionsRadios2").checked == true) {
                $("#sex").html("女");
            }
            Edit();
            layer.close(index);
        }
    });
    if (values == '女') {
        document.getElementById("optionsRadios2").checked = true;
    } else {
        document.getElementById("optionsRadios1").checked = true;
    }
}

function DateView(values) {
    layer.open({
        title:"出生日期",
        content:'<div>' +
                    '<input style="outline: none;border: 1px solid #eeeeee;width: 25%;border-radius: 3px;" class="text-center" type="text" id="year" placeholder="年">' +
                    '<label>年</label>' +
                    '<input style="outline: none;border: 1px solid #eeeeee;width: 20%;border-radius: 3px;" class="text-center" type="text" id="month" placeholder="月">' +
                    '<label>月</label>' +
                    '<input style="outline: none;border: 1px solid #eeeeee;width: 20%;border-radius: 3px;" class="text-center" type="text" id="day" placeholder="日">' +
                    '<label>日</label>' +
                '</div>',
        btn:['确定','取消'],
        yes:function (index) {
            $("#birthday").html($("#year").val() + "-" + $("#month").val() + "-" + $("#day").val());
            Edit();
            layer.close(index);
        }
    });
    $("input[type='text']").on('focus',function () {
        $(this).css('border','1px solid #F24C4C');
    }).on('blur',function(){
        $(this).css('border','1px solid #eeeeee');
    });
    $("#year").val(values.split("-")[0]);
    $("#month").val(values.split("-")[1]);
    $("#day").val(values.split("-")[2]);
}



function GetData() {
    UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {UserID: UserInfo.UserID};
    console.log(UserInfo)
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/GetUserInfoByUserID");
    //$.cookie("UserInfo", 1);
    result.Data.Ticket=UserInfo.Ticket;
    //将用户信息存入Cookie
    $.cookie("UserInfo", $Course.stringify(result.Data), {expires: 30, path: '/'});

    $("#account").html(result.Data.Account);
    $("#nickName").html(result.Data.NickName);
    $("#sex").html(result.Data.Sex);
    $("#school").html(result.Data.School);
    $("#grade").html(result.Data.Grade);
    $("#className").html(result.Data.ClassName);
    $("#birthday").html(result.Data.BirthDay.split(" ")[0]);
    $("#phone").html(result.Data.Phone);
    $("#email").html(result.Data.Email);
    $("#fatherName").html(result.Data.FatherName);
    $("#fatherPhone").html(result.Data.FatherPhone);
    $("#motherName").html(result.Data.MotherName);
    $("#motherPhone").html(result.Data.MotherPhone);
    $("#tel").html(result.Data.Tel);
    $("#address").html(result.Data.Address);
}

function Edit() {
    var NickName = $("#nickName").html();
    var Sex = $("#sex").html();
    var School = $("#school").html();
    var Grade = $("#grade").html();
    var ClassName = $("#className").html();
    var BirthDay = $("#birthday").html();
    var Phone = $("#phone").html();
    var Email = $("#email").html();
    var FatherName = $("#fatherName").html();
    var FatherPhone = $("#fatherPhone").html();
    var MotherName = $("#motherName").html();
    var MotherPhone = $("#motherPhone").html();
    var Tel = $("#tel").html();
    var Address = $("#address").html();
    console.log(NickName);
    var param = {UserID: UserID, NickName: NickName, Sex: Sex, School: School, Grade: Grade,
                 ClassName: ClassName, BirthDay: BirthDay, Phone: Phone, Email: Email,
                 FatherName: FatherName, FatherPhone: FatherPhone, MotherName:MotherName,
                 MotherPhone: MotherPhone, Tel: Tel, Address: Address}
    var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserInfo_Edit");
    if(result.Msg=="OK"){
        GetData();
    }
}

function Exit() {
    layer.open({
        content : "确定退出?",
        btn:['确定','取消'],
        yes:function (index) {
            $.cookie("UserInfo", null, {expires: 30, path: '/'});
            window.location.href = "Login.html";
        }
    });
}