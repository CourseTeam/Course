/**
 * Created by wangbin on 2016/11/17.
 */

$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    $("#btnSearch").on("click", function () {
        Order_List();
    });

    $("#btnSave").on("click", function () {
        Order_Logistics_Add();
    });

    Order_List();
});

var PageIndex = 1;
var OrderID = 0;

function Order_List() {
    var SearchKey = $("#SearchKey").val();
    var param = {SearchKey: SearchKey, PageIndex: PageIndex, PageSize: 10};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Order/Orders_List");
    console.log(result);
    if (result.Msg == "OK" || result == "1") {
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-2">商品</div>';
        strHtml += '        <div class="col-xs-1">收货人</div>';
        strHtml += '        <div class="col-xs-2">收货人手机号</div>';
        strHtml += '        <div class="col-xs-2">收货地址</div>';
        strHtml += '        <div class="col-xs-2">快递公司</div>';
        strHtml += '        <div class="col-xs-2">快递单号</div>';
        strHtml += '        <div class="col-xs-1">操作</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row ">';
                strHtml += '        <div class="col-xs-2">' + row.ProductName + '</div>';
                strHtml += '        <div class="col-xs-1">' + row.DeliveryName + '</div>';
                strHtml += '        <div class="col-xs-2">' + row.Phone + '</div>';
                strHtml += '        <div class="col-xs-2">' + row.DeliveryAddress + '</div>';
                strHtml += '        <div class="col-xs-2">' + row.LogisticsCompanies + '</div>';
                strHtml += '        <div class="col-xs-2">' + row.OrderNo + '</div>';
                strHtml += '        <div class="col-xs-1">';
                if (row.Status == 1) {
                    strHtml += '            <button class="autobutton" onclick="Order_Edit(' + row.OrderID + ')">未发货</button>';
                } else if (row.Status == 2){
                    strHtml += '            <button class="autobutton" style="background: gainsboro;outline: none">已发货</button>';
                } else if (row.Status == 2){
                    strHtml += '            <button class="autobutton" style="background: gainsboro;outline: none">已收货</button>';
                }
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</li>';
            }
            laypage({
                cont: $("#Page"), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: Math.ceil(result.Data[0].RowsCount / 10), //通过后台拿到的总页数
                curr: PageIndex || 1, //当前页,
                skip: true, //是否开启跳页
                skin: '#AF0000',
                groups: 3, //连续显示分页数
                jump: function (obj, first) { //触发分页后的回调
                    //alert(obj.curr)
                    if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                        PageIndex = obj.curr;
                        Order_List();
                    }
                }
            });
        }
        $("#product_list").html(strHtml);
    }
}

function Order_Edit(OrderId) {
    OrderID = OrderId;
    $("#OrderNo").val("");
    $("select").val("顺丰快递");
    layer.open({
        skin: 'layui-layer-molv',
        type: 1,
        title: "填写快递单号",
        area: ["500px", "250px"],
        content: $("#EditBox")
    });
}

function Order_Logistics_Add() {
    var OrderNo = $("#OrderNo").val();
    if (OrderNo == "") {
        layer.msg("请输入单号", {icon: 2, time: 2000});
        return;
    }
    var LogisticsCompanies = $("select").val();
    var param = {OrderID: OrderID, OrderNo: OrderNo, LogisticsCompanies: LogisticsCompanies};

    var result = $Course.PostAjaxJson(param, ApiUrl + "Order/Orders_Logistics_ADD");
    console.log(result);
    if (result.Msg == "OK") {
        layer.msg("保存成功！", {icon: 1, time: 2000}, function () {
            layer.closeAll();
            CourseType_List();
        });
    } else {
        layer.msg("保存失败，请联系管理员！", {icon: 2, time: 2000}, function () {
            layer.closeAll();
        });
    }
}

function Edit(id) {
    window.location.href = "ProductEdit.html?ProductID=" + id;
}