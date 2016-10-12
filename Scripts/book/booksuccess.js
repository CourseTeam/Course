 $(function($){
 	get_value("type");
});

function get_value(name){
	var str=window.location.search;   //location.search是从当前URL的?号开始的字符串
	if (str.indexOf(name)!=-1){        
        var pos_start=str.indexOf(name) + name.length + 1;
        var pos_end=str.indexOf("&",pos_start);
        var pid = str.substring(pos_start);
        if (pid == "0") {
        	document.getElementById("image").src= "../../Images/book/transfer_success.png";
        	$(".result").html("你已经成功转期");
        }
    }
}