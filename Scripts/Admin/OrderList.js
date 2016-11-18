/**
 * Created by wangbin on 2016/11/17.
 */

$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    $("#btnSearch").on("click", function () {
        Order_List();
    });
    Order_List();
});

var PageIndex = 1;

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
                strHtml += '            <button class="autobutton" onclick="Edit(' + row.OrderID + ')">编 辑</button>';
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

function Edit(id) {
    window.location.href = "ProductEdit.html?ProductID=" + id;
}