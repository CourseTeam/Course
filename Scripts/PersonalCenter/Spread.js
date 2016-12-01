/**
 * 推广记录/积分奖励
 * Created by wangbin on 2016/11/23.
 */

$(function ($) {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    UserID = UserInfo.UserID;
    if (UserID != null) {
        MyRefer_List();
        IntegralResource_List();
    }
    $(".tab a").on("click", function (a, b) {
        $(".tab a").removeClass("active");
        $(this).addClass("active");
        if ($(this).attr("id") == "myRefer_list") {
            $("#myRefer").show();
            $("#integral").hide();
        } else {
            $("#myRefer").hide();
            $("#integral").show();
        }
    });
    // IntegralResource_List(UserID);
});

var UserID = 0;

function MyRefer_List(PageIndex, PageSize) {
    var param = {
        UserID: UserID,
        PageIndex: 1,
        PageSize: 100
    };
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/MyRefer_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<div class="row btm">';
                strHtml += '    <div class="col-xs-4">' + row.RegTime.split(" ")[0] + '</div>';
                strHtml += '    <div class="col-xs-8 record" style="padding-left: 0px">' + row.NickName + '成功使用您的二维码注册' + '</div>';
                strHtml += '</div>';
            }
            $("#myRefer").html(strHtml);
        }
    }
}

function IntegralResource_List() {
    var param = {
        UserID: UserID,
        Type: 2
    };
    var result = $Course.GetAjaxJson(param, ApiUrl + "IntegralResource/MyIntegralResource_List");
    if (result.Msg == "OK") {
        var strHtml = "";
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                var Title = "";
                if (row.SourceName == "注册") {
                    Title = "成功注册奖励"
                }
                if (row.SourceName == "邀请") {
                    Title = row.Title + "成功使用你的二维码注册成功"
                }
                if (row.SourceName == "消费" || row.SourceName == "邀请>消费") {
                    Title = row.Title + "成功签到"
                }

                strHtml += '<div class="row btm_Integral">';
                strHtml += '    <div class="col-xs-8" style="padding-left: 10px">';
                strHtml += '        <span class="record_Integral">' + Title + '</span>';
                strHtml += '        <span style="color: grey">' + row.AddTime.split(" ")[0] + '</span>';
                strHtml += '    </div>';
                strHtml += '    <div class="col-xs-4" style="text-align: right;padding-left: 0px;padding-top: 10px;color: red">' + row.Integral + '能量币' + '</div>';
                strHtml += '</div>';
            }
            $("#integral").html(strHtml);
        }
    }
}