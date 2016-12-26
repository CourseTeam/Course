/**
 * Created by wangbin on 2016/12/23.
 */

$(function ($) {
    MyIntegral_List_Withdraw();
});


function MyIntegral_List_Withdraw() {
    var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
    var param = {UserID: UserInfo.UserID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Withdraw/MyIntegral_List_Withdraw");
    if (result.Msg == "OK") {
        var strHtml = "";
        if (result.Data) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                var time = row.AddTime.split(" ")[0];
                var date = getMyDay(time);
                if (row.Status == 4) {
                    strHtml += '<div class="record">';
                    strHtml += '    <div class="col-xs-4 day" style="color: #cbcbcb">' + date + '</div>';
                    strHtml += '    <div class="col-xs-4 integral" style="color: #cbcbcb">' + row.Integral + '积分' + '</div>';
                    strHtml += '    <div class="col-xs-4 integral" style="color: #cbcbcb">' + '提现' + row.Money + '元' + '</div>';
                    strHtml += '    <div class="col-xs-9 createtime">' + time + '</div>';
                    strHtml += '    <div class="col-xs-3" style="color: #cbcbcb;text-align: right;font-size: 14px;padding-top: 5px">成功</div>';
                    strHtml += '    <div class="col-xs-12 stage" style="color: #F24C4C;text-align: left;margin-top: 10px">你的提现账户有误,请仔细核对再重新申请</div>';
                    strHtml += '</div>';
                    strHtml += '<div class="bank">';
                    strHtml += '    <div class="col-xs-3 pdr0" style="padding-top: 5px">银行卡号:</div>';
                    strHtml += '    <div class="col-xs-9" style="padding-top: 5px">' + row.PayNo + '</div>';
                    strHtml += '    <div class="col-xs-3 pdr0">开户行:</div>';
                    strHtml += '    <div class="col-xs-9">' + row.BankType + '</div>';
                    strHtml += '    <div class="col-xs-3 pdr0">姓名:</div>';
                    strHtml += '    <div class="col-xs-6">' + row.PayName + '</div>';
                    strHtml += '    <div class="col-xs-3" style="text-align: right;color: #00d6b2" onclick="PaymentEdit(' + row.PayID + ')">修改</div> ';
                    strHtml += '</div>';
                } else {
                    strHtml += '<div class="record">';
                    strHtml += '    <div class="col-xs-3 day">' + date + '</div>';
                    strHtml += '    <div class="col-xs-5 integral">' + row.Integral + '积分' + '</div>';
                    strHtml += '    <div class="col-xs-4 integral">' + '提现' + row.Money + '元' + '</div>';
                    strHtml += '    <div class="col-xs-6 createtime">' + time + '</div>';
                    strHtml += '    <div class="col-xs-6" style="color: #ffffff;text-align: right;font-size: 14px;padding-top: 5px">' + Withdraw_Status(row.Status) + '</div>';
                    strHtml += '    <div class="col-xs-4 stage">申请</div>';
                    strHtml += '    <div class="col-xs-4 stage">通过审核</div>';
                    strHtml += '    <div class="col-xs-4 stage">已汇款</div>';
                    if (row.Status == 1) {
                        strHtml += '    <img src="../../Images/withdraw/withdraw_apply.png" style="padding-left: 15%;width: 100%;padding-right: 15%"/></div>';
                    } else if (row.Status == 2) {
                        strHtml += '    <img src="../../Images/withdraw/withdraw_audit.png" style="padding-left: 15%;width: 100%;padding-right: 15%"/></div>';
                    } else if (row.Status == 3) {
                        strHtml += '    <img src="../../Images/withdraw/withdraw_remit.png" style="padding-left: 15%;width: 100%;padding-right: 15%"/></div>';
                    }
                    strHtml += '</div>';
                }
            }
        }
        $("#withdraw_record").html(strHtml);
    }
}

function Withdraw_Status(status) {
    switch (status) {
        case 1:
            return "审核中";
            break;
        case 2:
            return "审核成功";
            break;
        case 3:
            return "已汇款";
            break;
    }
}

function PaymentEdit(PayID) {
    window.location.href = "../Payment/PaymentEdit.html?PayID=" + PayID;
}

function getMyDay(create_date){
    var week;
    var today = new Date().Format('yyyy-MM-dd');
    var yesterday = new Date(new Date().getTime()-3600*24*1000).Format('yyyy-MM-dd');
    if (create_date == today) {
        week = "今天";
        return week;
    }
    if (create_date == yesterday) {
        week = "昨天";
        return week;
    }
    var date = new Date(create_date);
    if(date.getDay()==0) week = "周日";
    if(date.getDay()==1) week = "周一";
    if(date.getDay()==2) week = "周二";
    if(date.getDay()==3) week = "周三";
    if(date.getDay()==4) week = "周四";
    if(date.getDay()==5) week = "周五";
    if(date.getDay()==6) week = "周六";
    return week;
}