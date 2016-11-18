/**
 * Created by wangbin on 2016/11/14.
 */

$(document).ready(function () {
    //加载公用导航
    $("#header").load("../Commen/header.html");

    $("#btnSearch").on("click", function () {
        Product_list();
    });
    Product_list();
});

var PageIndex = 1;

function Product_list() {
    var param = {PageIndex: PageIndex, PageSize: 10};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Product/Product_List");
    console.log(result);
    if (result.Msg == "OK" || result == "1") {
        var strHtml = "";
        strHtml += '<li class="list-group-item header">';
        strHtml += '    <div class="row">';
        strHtml += '        <div class="col-xs-3">商品名称</div>';
        strHtml += '        <div class="col-xs-3">商品价格</div>';
        strHtml += '        <div class="col-xs-3">商品库存</div>';
        strHtml += '        <div class="col-xs-3">操作</div>';
        strHtml += '    </div>';
        strHtml += '</li>';
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<li class="list-group-item">';
                strHtml += '    <div class="row ">';
                strHtml += '        <div class="col-xs-3">' + row.ProductName + '</div>';
                strHtml += '        <div class="col-xs-3">' + row.Price + '</div>';
                strHtml += '        <div class="col-xs-3">' + row.Repertory + '</div>';
                strHtml += '        <div class="col-xs-3">';
                strHtml += '            <button class="autobutton" onclick="Edit(' + row.ProductID + ')">编 辑</button>';
                strHtml += '            <button class="autobutton" onclick="ProductInfo_Del(' + row.ProductID + ')">删 除</button>';
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
                        User_list();
                    }
                }
            });
        }
        $("#product_list").html(strHtml);
    }
}

function ProductInfo_Del(id) {
    layer.confirm("确定要删除该商品吗？", function () {
        var param = {ProductID: id};
        var result = $Course.PostAjaxJson(param, ApiUrl + "Product/Product_Del");
        if (result.Msg == "OK") {
            if (result.Data) {
                layer.msg("删除成功！", {icon: 1, time: 2000}, function () {
                    layer.closeAll();
                    Product_list();
                });
            } else {
                layer.msg("删除失败，请联系管理员！", {icon: 2, time: 2000}, function () {
                    layer.closeAll();
                });
            }
        }
    });
}

function Edit(id) {
    window.location.href = "ProductEdit.html?ProductID=" + id;
}