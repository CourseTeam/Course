/**
 * 积分商城物品列表
 * Created by wangbin on 2016/11/18.
 */

$(function ($) {
    Product_list();
});

var PageIndex = 1;

function Product_list() {
    var param = {PageIndex: PageIndex, PageSize: 100};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Product/Product_List");
    console.log(result);
    if (result.Msg == "OK" || result == "1") {
        var strHtml = "";
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<div class="col-xs-6 list" onclick="Order(' + row.ProductID + ')">';
                strHtml += '    <img src="' + row.ProductImg + '" style="width: 100%">';
                strHtml += '    <div class="caption">';
                strHtml += '        <h4>' + row.ProductName + '</h4>';
                strHtml += '        <p style="font-size: 10px;color: #F24C4C">' + row.Price + '能量币' + '</p>';
                strHtml += '    </div>';
                strHtml += '</div>';
            }
        }
        $("#product_list").html(strHtml);
    }
}

function Order(ProductID) {
    console.log(ProductID);
}