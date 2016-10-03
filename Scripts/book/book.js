/**
 * Created by vjzhu on 2016/9/28 .
 */

 $(function($){
   create_list();
}); 


function create_list() {
    var strHtml = "";
    strHtml += '  <ul class="title">已预约课程，开课两周前可预约</ul>'
   for (var i = 0; i < 50; i++) {
       strHtml += '  <ul style="float: left;">'
       strHtml += '    <li>'
       strHtml += '      <img id= img -'+ i +'width="100" height="100" src="http://img 011.hc360.cn/g2/M03/24/33/wKhQulMZvjmEJ0QGAAAAAJMULyM656.jpg">'
       strHtml += '    </li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float: left;">'
       strHtml += '    <li><font class="name">'+ "摩英青少年领袖训练营" + '</font></li>'
       strHtml += '    <li><font class="time">'+ "开营时间：2016.12.12" + '</font></li>'
       strHtml += '    <li><font class="location">'+ "上海市嘉定区" + '</font></li>'
       strHtml += '    <li><font class="cost"><img src="../../Images/book/cost_normal.png" width="19" height="15">' + "未缴纳食宿费" + '</font></li>'
       strHtml += '  </ul>'
       strHtml += '  <ul style="float:left;">'
       strHtml += '    <button class="button" type="button" style="margin-top:10px;margin-right:10px">预约</button>'
       strHtml += '  </ul>'
       strHtml += '<div style="clear: both;"></div>'
   }
  $(".list-li").append(strHtml);
}




