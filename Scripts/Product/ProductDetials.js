/**
 * 商品详情页面
 * Created by wangbin on 2016/11/15.
 */

$(function ($) {
    Article_Detials()
});

function Article_Detials() {
    var ProductID = $Course.RequestUrlParams("ProductID");
    var param = {ProductID: ProductID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Product/Product_Detail");
    console.log(result);
    if (result.Msg == "OK" || result == "1") {
        var strHtml = "";
        var row = result.Data;
        strHtml += '<img class="headerImg" src="' + row.ProductImg + '">';
        strHtml += '<div class="container">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-6 tab">';
        strHtml += '            <span class="productName">' + row.ProductName + '<p class="repertory">' + '数量' + row.Repertory + '个' + '</p></span>';
        strHtml += '        </div>';
        strHtml += '        <div class="col-xs-6 tab">';
        strHtml += '        <p class="price">' + row.Price + '能量币' + '</p>';
        strHtml += '        </div>';
        strHtml += '    </div>';
        strHtml += '</div>';
        strHtml += '<div class="line"></div>';
        strHtml += '<div class="container">';
        strHtml += '    <div class="row" id="product_list" style="padding: 10px">';
        strHtml += '        <h4 style="margin: 0px">商品介绍</h4>';
        strHtml += '        <p style="word-break: break-all">' + row.Intro + '</p>';
        strHtml += '    </div>';
        strHtml += '</div>';
        strHtml += '<div class="exit" id="exit" onclick="Exchange()">立即兑换</div>';
        $("#article_detials").html(strHtml);
    }
}

function Exchange() {
    var ProductID = $Course.RequestUrlParams("ProductID");
    window.location.href = "Exchange.html?ProductID=" + ProductID;
}