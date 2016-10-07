

$ (function($){
	get_data();
})

function get_data() {
	var strHtml = "";

	strHtml += '<div class="row">'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	<p>一阶开营时间：2016.10.10</p>'			
	strHtml += '  </div>'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	地点：唐朝酒店'			
	strHtml += '  </div>'
	strHtml += '</div>'

	strHtml += '<div class="row">'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	<p>剩余名额：213</p>'			
	strHtml += '  </div>'
	strHtml += '  <div class="col-xs-6">'
	strHtml += '	预约截止时间：2015.12.21'			
	strHtml += '  </div>'
	strHtml += '</div>'

	
	
	$(".container").append(strHtml);

}