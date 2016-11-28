/**
 * 消费记录
 * Created by wangbin on 2016/11/23.
 */

$ (function ($) {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    UserID = UserInfo.UserID;
    if (UserID != null) {
        IntegralResource_List();
    }
    // IntegralResource_List(UserID);
});

var UserID = 0;

function IntegralResource_List() {
    var param = {
        UserID: UserID,
        Type: 1
    };
    var result = $Course.GetAjaxJson(param, ApiUrl + "IntegralResource/MyIntegralResource_List");
    console.log(result);
    if (result.Msg == "OK") {
        var strHtml = "";
        if (result.Data.length > 0) {
            for (var i = 0;i < result.Data.length;i++) {
                var row = result.Data[i];
                strHtml += '<div class="row btm">';
                strHtml += '    <div class="col-xs-8" style="padding-left: 10px">';
                strHtml += '        <span class="record">' + row.Title + '</span>';
                strHtml += '        <span style="color: grey">' + row.AddTime.split(" ")[0] + '</span>';
                strHtml += '    </div>';
                strHtml += '    <div class="col-xs-4" style="text-align: right;padding-left: 0px;padding-top: 10px;color: red">' + row.Integral + '能量币' + '</div>';
                strHtml += '</div>';
            }
            $("#consume").html(strHtml);
        }
    }
}