/**
 * Created by xuwei on 2016/11/23.
 */

$(document).ready(function () {
    Order_Details();
});


function Order_Details() {
    var OrderID = $Course.RequestUrlParams("OrderID");
    var url = ApiUrl + 'Order/MyOrder_Detail';
    param = {OrderID: OrderID};
    var result = $Course.GetAjaxJson(param, url);
    if (result.Msg == "OK" && result.Data != null) {
        var strHtml = "";
        var row = result.Data;
        row.OrderNo = row.OrderNo == null ? '暂无物流信息' : row.OrderNo;
        row.LogisticsCompanies = row.LogisticsCompanies == null ? '暂无物流信息' : row.LogisticsCompanies;
        strHtml += '<div class="row address" >';
        strHtml += '  <div class="left">';
        strHtml += '      <img src="../../Images/location.png" height="25" width="20"/>';
        strHtml += '  </div>';
        strHtml += '  <div class="main">';
        strHtml += '      <div class="col-xs-5 text-left nopadding">收货人：' + row.DeliveryName + '</div>';
        strHtml += '      <div class="col-xs-7 text-right nopadding pdr15">联系方式：' + row.Phone + '</div>';
        strHtml += '      <div class="col-xs-12 text-left nopadding pdr15">收货地址：' + row.DeliveryAddress + '</div>';
        strHtml += '  </div>';
        strHtml += '</div>';
        strHtml += '<div class="row content">';
        strHtml += '  <div class="main">';
        strHtml += '      <span>' + row.ProductName + '</span>';
        strHtml += '      <p>' + $Course.DelHtmlTag(row.Intro) + '</p>';
        strHtml += '  </div>';
        strHtml += '  <div class="left imgbg" style="background-image: url(' + row.ProductImg + ')" ></div>';
        strHtml += '  <div class="right">';
        strHtml += '      <span>' + row.Price + '能量币</span>';
        strHtml += '      <p style="color: #ff0000;">x 1</p>';
        strHtml += '  </div>';
        strHtml += '</div>';
        strHtml += '<div class="row text-right bottom">';
        strHtml += '  <div class="col-xs-12"><span>共' + row.ProductNum + '件商品 <span style="color: #ff0000;">合计：' + row.TotalPrice + '能量币</span></span></div>';
        strHtml += '</div>';
        strHtml += '<div class="row text-right status" style="padding: 10px 0;">';
        if (row.Status == 1) {
            strHtml += '          <div class="col-xs-12"><button onclick="CancelOrder(' + row.OrderID + ')">取消订单</button></div>';
        }
        if (row.Status == 2) {
            strHtml += '          <div class="col-xs-12"><button onclick="ConfirmOrder(' + row.OrderID + ')">确认收货</button></div>';
        }
        if (row.Status == 3) {
            strHtml += '          <div class="col-xs-12 text-right"><span style="color:#808080">已收货</span></div>';
        }
        if (row.Status == 4) {
            strHtml += '          <div class="col-xs-12 text-right"><span style="color:#808080">已取消订单</span></div>';
        }
        strHtml += '</div>';
        strHtml += '<div class="row" style="height: 1px;background: #eee"></div>';
        strHtml += '<div class="row logistics">';
        strHtml += '  <div class="col-xs-12">订单号：' + row.OrderNo + '</div>';
        strHtml += '  <div class="col-xs-12">物流公司：' + row.LogisticsCompanies + '</div>';
        strHtml += '</div>';
        strHtml += '<div class="row" style="height: 8px;background: #eee;clear: both;"></div>';
        $(".order").html(strHtml);
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
                Order_Details();
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
                Order_Details();
            }
            layer.closeAll();
        },
        no: function () {

        }
    });
}