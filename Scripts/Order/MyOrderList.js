/**
 * Created by xuwei on 2016/11/21.
 */

$(document).ready(function () {
    MyOrder_List();
    MyDeliveryAddress_List();
    var type = $Course.RequestUrlParams("type");
    $(".tab a").removeClass("active");
    if (type == 1) {
        $(".da_list").hide();
        $(".order_list").show();
        $(".addbtn").hide();
        $("#order_list").addClass("active");
    } else {
        $(".da_list").show();
        $(".order_list").hide();
        $(".addbtn").show();
        $("#da_list").addClass("active");
    }
    $(".tab a").on("click", function (a, b) {
        $(".tab a").removeClass("active");
        $(this).addClass("active");
        if ($(this).attr("id") == "da_list") {
            $(".da_list").show();
            $(".order_list").hide();
            $(".addbtn").show();
        } else {
            $(".da_list").hide();
            $(".order_list").show();
            $(".addbtn").hide();
        }
    });
});

//我的订单列表
function MyOrder_List() {
    var url = ApiUrl + 'Order/MyOrders_List';
    var UserID = $Course.parseJSON($.cookie("UserInfo")).UserID;
    param = {UserID: UserID};
    var result = $Course.GetAjaxJson(param, url);
    if (result.Msg == "OK") {
        if (result.Data.length > 0) {
            var strHtml = "";
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<div class="order">';
                strHtml += '      <div class="row content" onclick="GoOrderDetails(' + row.OrderID + ')">';
                strHtml += '          <div class="main">';
                strHtml += '          <span>' + row.ProductName + '</span>';
                strHtml += '          <p>' + $Course.DelHtmlTag(row.Intro) + '</p>';
                strHtml += '          </div>';
                strHtml += '          <div class="left imgbg" style="background-image: url(' + row.ProductImg + ')"></div>';
                strHtml += '          <div class="right">';
                strHtml += '          <span>' + row.Price + '能量币</span>';
                strHtml += '          <p style="color: #ff0000;">x ' + row.ProductNum + '</p>';
                strHtml += '          </div>';
                strHtml += '      </div>';
                strHtml += '      <div class="row text-right bottom">';
                strHtml += '          <div class="col-xs-12"><span>共' + row.ProductNum + '件商品 <span style="color: #ff0000;">合计：' + row.TotalPrice + '能量币</span></span></div>';
                strHtml += '      </div>';
                strHtml += '      <div class="row text-right status" style="padding: 10px 0;">';
                if (row.Status == 1) {
                    strHtml += '          <div class="col-xs-12"><button onclick="CancelOrder(' + row.OrderID + ')">取消订单</button></div>';
                }
                if (row.Status == 2) {
                    strHtml += '          <div class="col-xs-12"><button onclick="ConfirmOrder(' + row.OrderID + ')">确认收货</button></div>';
                }
                if (row.Status == 3) {
                    strHtml += '          <div class="col-xs-12 text-right"><span style="color:#808080">交易完成</span></div>';
                }
                if (row.Status == 4) {
                    strHtml += '          <div class="col-xs-12 text-right"><span style="color:#808080">已取消订单</span></div>';
                }
                strHtml += '      </div>';
                strHtml += '      <div class="row" style="height: 8px;background: #eee"></div>';
                strHtml += '</div>';
            }
            $(".order_list").html(strHtml);
        }
    }
}
//取消订单
function CancelOrder(OrderID) {
    layer.open({
        content: "确定要取消订单吗？消费能量币将会全部返回你的账户",
        btn: ["确 定", "取 消"],
        yes: function () {
            var url = ApiUrl + "Order/Order_Cancel";
            var param = {OrderID: OrderID};
            var result = $Course.PostAjaxJson(param, url);
            if (result.Msg == "OK" && result.Data) {
                MyOrder_List();
            }
            layer.closeAll();
        },
        no: function () {

        }
    });
}
//确认收货
function ConfirmOrder(OrderID) {
    layer.open({
        content: "请确认已收货？",
        btn: ["确 定", "取 消"],
        yes: function () {
            var url = ApiUrl + "Order/Order_Confirm";
            var param = {OrderID: OrderID};
            var result = $Course.PostAjaxJson(param, url);
            if (result.Msg == "OK" && result.Data) {
                MyOrder_List();
            }
            layer.closeAll();
        },
        no: function () {

        }
    });
}

//跳转到详情
function GoOrderDetails(OrderID) {
    window.location.href = "OrderDetails.html?OrderID=" + OrderID;
}

//我的收货地址列表
function MyDeliveryAddress_List() {
    var url = ApiUrl + 'DeliveryAddress/MyDeliveryAddress_List';
    var UserID = $Course.parseJSON($.cookie("UserInfo")).UserID;
    param = {UserID: UserID};
    var result = $Course.GetAjaxJson(param, url);
    if (result.Msg == "OK") {
        if (result.Data.length > 0) {
            var strHtml = "";
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<div class="row">';
                strHtml += '    <div class="col-xs-6 text-left da_lh30">' + row.UserName + '</div>';
                strHtml += '    <div class="col-xs-6 text-right da_lh30">' + row.Phone + '</div>';
                strHtml += '    <div class="col-xs-12 text-left da_address">' + row.Address + '</div>';
                if (row.IsDefault == 1) {
                    strHtml += '    <div class="col-xs-6 text-left da_lh30"><input type="radio" name="address" checked /> 默认地址</div>';
                } else {
                    strHtml += '    <div class="col-xs-6 text-left da_lh30"><input type="radio" name="address" onclick="SetDefault_Address(' + row.DeliveryID + ')" /> 默认地址</div>';
                }
                strHtml += '    <div class="col-xs-6 text-right da_lh30"><span onclick="AddressEdit(' + row.DeliveryID + ')">编辑</span> <span onclick="DeliveryAddress_Del(' + row.DeliveryID + ')">删除</span></div>';
                strHtml += '    <div style="height: 8px;background: #eee;clear: both;"></div>';
                strHtml += '</div>';
            }
            $(".da_list").html(strHtml);
        }
    }
}
//新增或编辑地址
function AddressEdit(DeliveryID) {
    if (DeliveryID > 0) {
        window.location.href = "../PersonalCenter/ShippingAddressEdit.html?DeliveryID=" + DeliveryID;
    } else {
        window.location.href = "../PersonalCenter/ShippingAddressEdit.html";
    }
}
//删除收货地址
function DeliveryAddress_Del(DeliveryID) {
    layer.open({
        content: "确定要删除吗？",
        btn: ["确 定", "取 消"],
        yes: function () {
            var url = ApiUrl + "DeliveryAddress/DeliveryAddress_Del";
            var param = {DeliveryID: DeliveryID};
            var result = $Course.PostAjaxJson(param, url);
            if (result.Msg == "OK" && result.Data) {
                MyDeliveryAddress_List();
            }
            layer.closeAll();
        },
        no: function () {

        }
    });
}

//设置默认收货地址
function SetDefault_Address(DeliveryID) {
    var url = ApiUrl + "DeliveryAddress/DeliveryAddress_IsDefault_Upd";
    var param = {DeliveryID: DeliveryID};
    var result = $Course.PostAjaxJson(param, url);
    if (result.Msg == "OK" && result.Data) {
        MyDeliveryAddress_List();
    }
}