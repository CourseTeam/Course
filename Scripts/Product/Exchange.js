/**
 * 商品兑换界面
 * Created by wangbin on 2016/11/22.
 */

$(function ($) {
    Product_Detials()
    Address_List();
});

var UserInfo = $Course.parseJSON($.cookie("UserInfo"));
var ProductNum = 1;
var total = 1;

function Product_Detials() {
    var ProductID = $Course.RequestUrlParams("ProductID");
    var param = {ProductID: ProductID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Product/Product_Detail");
    console.log(result);
    if (result.Msg == "OK" || result == "1") {
        var strHtml = "";
        var row = result.Data;
        strHtml += '<div class="container">';
        strHtml += '    <div class="row content">';
        strHtml += '        <div class="main">';
        strHtml += '            <span>' + row.ProductName + '</span>';
        strHtml += '            <p>' + $Course.DelHtmlTag(row.Intro) + '</p>';
        strHtml += '        </div>';
        strHtml += '        <div class="left" >';
        strHtml += '            <img src="' + row.ProductImg + '" class="leftImg">';
        strHtml += '        </div>';
        strHtml += '        <div class="right">';
        strHtml += '            <span style="float: right">' + row.Price + '能量币' + '</span>';
        strHtml += '            <div style="float:right;margin-top: 30px">';
        strHtml += '                <span>数量</span>';
        strHtml += '                <button style="border:0px;background:none;outline:none;" onclick="reduceGoodsNum(' + row.Price + ')">➖</button>';
        strHtml += '                <span class="goodsNum" id="goodsNums">' + ProductNum + '</span>';
        strHtml += '                <button style="border:0px;background:none;outline:none;" onclick="addGoodsNum(' + row.Repertory + ',' + row.Price + ')">➕</button>';
        strHtml += '            </div>';
        strHtml += '        </div>';
        strHtml += '    </div>';
        strHtml += '</div>';
        strHtml += '<div class="price" id="total">';
        total = row.Price
        strHtml += '    <span style="float:right;padding-right: 15px">' + '共' + ProductNum + '件商品' + '<span style="font-size: 14px;color: red;padding-left: 5px">' + '合计:' + total + '能量币' + '</span></span>';
        strHtml += '</div>';
        strHtml += '<div class="price" style="height: 45px;border-bottom: 10px solid #EEEEEE;" id="price">';
        strHtml += '    <span style="float: right;font-size: 14px;color: gray;padding-right: 15px">' + '我的能量币:' + UserInfo.Integral + '</span>';
        strHtml += '</div>';
        $("#article_detials").html(strHtml);
    }
}

function Address_List() {
    var param = {UserID: UserInfo.UserID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "DeliveryAddress/MyDeliveryAddress_List");
    console.log(result);
    if (result.Msg == "OK" || result == "1") {
        var strHtml = "";
        if (result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                var row = result.Data[i];
                strHtml += '<div style="border-bottom: 10px solid #EEEEEE">';
                strHtml += '    <div class="container frame_radio">';
                strHtml += '        <div class="radio content_radio">';
                strHtml += '            <label>';
                if (row.IsDefault == 1) {
                    strHtml += '                <input style="margin-top: 15px;" checked="checked" aphone="' + row.Phone + '" aname="' + row.UserName + '" type="radio" name="addressRadio" value="' + row.Address + '">';
                } else {
                    strHtml += '                <input style="margin-top: 15px;" aphone="' + row.Phone + '" aname="' + row.UserName + '" type="radio" name="addressRadio" value="' + row.Address + '">';
                }
                strHtml += '                <div class="address">';
                strHtml += '                    <span style="float: left;">' + row.UserName + '</span>';
                strHtml += '                    <span style="float: right">' + row.Phone + '</span>';
                strHtml += '                    <span class="address_content">' + row.Address + '</span>';
                strHtml += '                </div>';
                strHtml += '            </label>';
                strHtml += '        </div>';
                strHtml += '        <div style="text-align: right;padding: 5px;margin-top: -10px">';
                strHtml += '            <button style="border:0px;background:none;outline:none;" onclick="AddressEdit(' + row.DeliveryID + ')">编辑</button>';
                strHtml += '            <button style="border:0px;background:none;outline:none;" onclick="DeliveryAddress_Del(' + row.DeliveryID + ')">删除</button>';
                strHtml += '        </div>';
                strHtml += '    </div>';
                strHtml += '</div>';
            }
            strHtml += '<div style="text-align: right;padding: 5px;border-bottom: 10px solid #EEEEEE">';
            strHtml += '    <button style="border:0px;background:none;outline:none;" onclick="GoAddressList()">管理地址</button>';
            strHtml += '</div>';
            strHtml += '<div class="exchange" onclick="Exchange()">确认兑换</div>';
        } else {
            strHtml += '<div class="noAddress">';
            strHtml += '    <p style="text-align: center;padding-top: 20px">你还没有填写地址</p>';
            strHtml += '    <button style="text-align: center;background:transparent;border: none; outline: none; width: 100%;color: red" onclick="AddressEdit(0)">添加地址</button>';
            strHtml += '</div>';
        }
        $("#address").html(strHtml);
    }

}
function AddressEdit(DeliveryID) {
    if (DeliveryID > 0) {
        window.location.href = "../PersonalCenter/ShippingAddressEdit.html?DeliveryID=" + DeliveryID;
    } else {
        window.location.href = "../PersonalCenter/ShippingAddressEdit.html?ReturnUrl="+window.location.href;
    }

}
function GoAddressList() {
    window.location.href = "../Order/MyOrderList.html?type=2";
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
                Address_List();
            }
            layer.closeAll();
        },
        no: function () {

        }
    });
}

function Exchange() {
    console.log();
    var ProductID = $Course.RequestUrlParams("ProductID");
    var UserID = UserInfo.UserID;
    var UserName = $("input[name='addressRadio']:checked").attr("aname");
    var Phone = $("input[name='addressRadio']:checked").attr("aphone");
    var Address = $("input[name='addressRadio']:checked").val();

    if (UserName && Phone && Address) {
        var param = {
            ProductID: ProductID,
            UserID: UserID,
            ProductNum: ProductNum,
            DeliveryAddress: Address,
            DeliveryName: UserName,
            Phone: Phone
        };
        var result = $Course.PostAjaxJson(param, ApiUrl + "Order/Orders_ADD");
        if (result.Msg == "OK") {
            var param = {UserID: UserID};
            var result = $Course.GetAjaxJson(param, ApiUrl + "User/GetUserInfoByUserID");
            result.Data.Ticket = UserInfo.Ticket;
            console.log(UserInfo);
            //将用户信息存入Cookie
            $.cookie("UserInfo", $Course.stringify(result.Data), {expires: 7, path: '/'});
            layer.open({
                content: "下单成功，我们会及时为你安排发货", time: 2, end: function () {
                    window.location.href = "../Order/MyOrderList.html?type=1";
                }
            });
        } else {
            layer.open({
                content: result.Msg, time: 2
            })
        }
    }
}

// 减少数量
function reduceGoodsNum(Price) {
    if (ProductNum > 1) {
        total = (ProductNum - 1) * Price;
        if (total <= UserInfo.Integral) {
            ProductNum -= 1;
            var totalHtml = '<span style="float:right;padding-right: 15px">' + '共' + ProductNum + '件商品' + '<span style="font-size: 14px;color: red;padding-left: 5px">' + '合计:' + total + '能量币' + '</span></span>';
            $("#total").html(totalHtml);
            $("#goodsNums").html(ProductNum);
        }
    }
}

// 增加数量
function addGoodsNum(Repertory, Price) {
    if (ProductNum < Repertory) {
        total = (ProductNum + 1) * Price;
        if (total <= UserInfo.Integral) {
            ProductNum += 1;
            var totalHtml = '<span style="float:right;padding-right: 15px">' + '共' + ProductNum + '件商品' + '<span style="font-size: 14px;color: red;padding-left: 5px">' + '合计:' + total + '能量币' + '</span></span>';
            $("#total").html(totalHtml);
            $("#goodsNums").html(ProductNum);
        }
    }
}
