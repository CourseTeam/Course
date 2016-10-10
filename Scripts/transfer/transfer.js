
var phase_result;
var phaseID;
var selCourseID;
var selCourseName;

 $(function($){
 	getvalue("phaseID","coursename");
 	var sureButton = document.getElementById("sureButton");
 	sureButton.onclick = function(){
 		go_transfer();
 	}
 });

//访问转期接口
function go_transfer(){
	var param = {"PhaseID":phaseID,"NewPhaseID":selCourseID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/Phase_Change");
    if (result.Msg == "OK") {
    	//转期成功
        
    }
}

 function get_data(pid) {
 	phaseID = pid;
 	var param = {"PhaseID":pid};
    // var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_ChangePhase");
    // if (result.MSG = "OK") {
    // 	phase_result = result.Data;
    // }
 }
 
 function getvalue(name,coursename){
    var str=window.location.search;   //location.search是从当前URL的?号开始的字符串
	if (str.indexOf(name)!=-1){        
        var pos_start=str.indexOf(name) + name.length + 1;
        var pos_end=str.indexOf("&",pos_start);
        var pid = str.substring(pos_start);
        get_data(pid);
    }
    if (str.indexOf(coursename)!=-1){        
        var pos_start=str.indexOf(coursename)+coursename.length+1;
        var pos_end=str.indexOf("&",pos_start);
        var btn = document.getElementById("course-list");
        if (pos_end==-1){
            var cname = decodeURIComponent(str.substring(pos_start));
            $("#my-course").html(cname);
            btn.innerHTML = cname;
            btn.onclick = function(){
	        	showlist();
            }
        }
    }
}

// var result = $Course.GetAjaxJson(param, ApiUrl + "Phase/Phase_List_ChangePhase");

function showlist() {
		var strHtml = "";
		for (var i = 0; i < 5; i++) {
			// var row = phase_result[i];
			strHtml += '<div class="radio">' +
					'<label>'+ 
						'<input type="radio" value="' + "name"+"," + i + '"' + 'name="course">课程1' +
					'</label>'+
			'</div>';
		}

		layer.open({
			title:"",
			content:strHtml,
			btn:["确定","取消"],
			yes:function(index){
		      var id = $("input[name=course]:checked").val();

		      selCourseID = id.split(",")[1];
		      selCourseName = id.split(",")[0];
		      var btn = document.getElementById("course-list");
              btn.innerHTML = selCourseName;
		      layer.close(index);


			},no:function(index){

			}
		});
}
