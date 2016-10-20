/**
 * 课程详情页面
 * Created by wangbin on 2016/10/6.
 */

$ (function ($) {
    CourseInfo_Details();
});

function CourseInfo_Details() {
    var CourseID = $Course.RequestUrlParams("CourseID");
    var Status = $Course.RequestUrlParams("Status");
    var param = {CourseID:CourseID};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Course/CourseInfo_Details");
    console.log(result);
    if (result.Msg == "OK") {
        var CourseDetials = result.Data.courseInfo;
        var PhaseDetials = result.Data.phaselist[0];
        var Teachers = result.Data.teacherlist;
        var full = PhaseDetials.ReservationCount >= PhaseDetials.PeopleCount? true : false;
        var residue = PhaseDetials.PeopleCount - PhaseDetials.ReservationCount;
        var residueCount = residue < 0 ? 0 : residue;
        var strHtml_Detials = "";
        strHtml_Detials += '<ul class="list-unstyled" style="margin: 0px;padding: 10px;overflow: auto">';
        strHtml_Detials += '    <li style="font-size: 10px;">';
        strHtml_Detials += '        <img class="CourseDetials_leftImg" style="padding-bottom: 5px;" src="' + CourseDetials.CourseImgUrl + '" alt="...">';
        strHtml_Detials += '        <h4 class="media-heading text-center">' + CourseDetials.CourseName + '</h4>';
        strHtml_Detials += '        <h5 class="text-center" style="color: red;">(预约按钮在最下方)</h5>';
        strHtml_Detials += '        ' + CourseDetials.Intro + '';
        strHtml_Detials += '    </li>';
        if (CourseDetials.MaxPhaseType < 1) {
            strHtml_Detials += '    <li class="col-xs-12 pure" style="padding-top: 12px;">';
            strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">最近开营时间：' + PhaseDetials.StartTime.split(" ")[0] + '</div>';
            strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">地点：' + PhaseDetials.Place + '</div>';
            strHtml_Detials += '    </li>';
            strHtml_Detials += '    <li class="col-xs-12 pure" style="padding-top: 8px;">';
            strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">剩余名额：' + residueCount + '</div>';
            strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">预约截止时间：' + PhaseDetials.StartTime.split(" ")[0] + '</div>';
            strHtml_Detials += '    </li>';
        }
        // for (var i = 0; i < 3; i++) {
        //     var type = "二";
        //     strHtml_Detials += '    <li class="col-xs-12 pure" style="padding-top: 12px;">';
        //     if (i == 0) {
        //         type = "二";
        //     } else if (i == 1) {
        //         type = "三";
        //     } else if (i == 2) {
        //         type = "四";
        //     }
        //     strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">' + type + '阶开营时间：待定</div>';
        //     strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">地点：待定</div>';
        //     strHtml_Detials += '    </li>';
        //     strHtml_Detials += '    <li class="col-xs-12 pure" style="padding-top: 8px;">';
        //     strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">剩余名额：待定</div>';
        //     strHtml_Detials += '        <div class="col-xs-6 pure" style="font-size: 12px;text-align: left">预约截止时间：待定</div>';
        //     strHtml_Detials += '    </li>';
        // }
        strHtml_Detials += '</ul>';

        var width = window.screen.width;
        var imgWidth = ((width - 50) / 4) > 200 ? 200 : ((width - 50) / 4);
        var strHtml_Teachers = "";
        strHtml_Teachers += '<div class="pure divide"></div>';
        strHtml_Teachers += '   <div class="pure" style="width: 100%;height: 30px;overflow: auto">';
        strHtml_Teachers += '       <div class="pure" style="width: 2px;height: 20px;background-color: #F24D4D;margin-top: 5px;float: left;"></div>';
        strHtml_Teachers += '       <span style="font-size: 18px;float: left;padding-top: 2px;padding-left: 5px;">主讲教师</span>';
        strHtml_Teachers += '   </div>';
        strHtml_Teachers += '   <div class="col-xs-12 pure">';
        for (var i = 0; i < Teachers.length; i++) {
            var teacher = Teachers[i];
            strHtml_Teachers += '       <div class="col-xs-3 pure" style="text-align: center;padding-top: 10px;">';
            strHtml_Teachers += '           <img class="pure" src="' + teacher.TeacherImg + '" style="width: ' + imgWidth + 'px;height: ' + imgWidth + 'px">';
            strHtml_Teachers += '           <p style="height: 40px;">' + teacher.TeacherName + '</p>';
            strHtml_Teachers += '       </div>';
        }
        strHtml_Teachers += '   </div>';
        strHtml_Teachers += '</div>';

        var strHtml_Serve = "";
        if (CourseDetials.MaxPhaseType > 1) {
            strHtml_Serve += '   <div class="pure divide"></div>';
            strHtml_Serve += '   <div class="pure" style="width: 100%;height: 30px;overflow: auto">';
            strHtml_Serve += '      <div class="pure" style="width: 2px;height: 20px;background-color: #F24D4D;margin-top: 5px;float: left;"></div>';
            strHtml_Serve += '      <span style="font-size: 18px;float: left;padding-top: 2px;padding-left: 5px;">增值服务</span>';
            strHtml_Serve += '   </div>';
            strHtml_Serve += '   <ul class="list-unstyled" style="padding-left: 10px;padding-right: 10px;padding-top: 5px;font-size: 12px;">';
            strHtml_Serve += '      <li style="font-size: 14px;background-color: rgb(0, 176, 240);color: rgb(255, 255, 0);"><strong>镜头可以回放 人生无法重来</strong></li>';
            strHtml_Serve += '      <li>家长常常会问：</li>';
            strHtml_Serve += '      <li>我的孩子经历了这么棒的集训营，</li>';
            strHtml_Serve += '      <li style="color: rgb(0, 176, 80);">如何给到他持续的激励、鼓舞？</li>';
            strHtml_Serve += '      <li>那么多精彩蜕变瞬间我却缺席不在</li>';
            strHtml_Serve += '      <li style="color: rgb(0, 176, 80);">如何留下这些感动蜕变瞬间？</li>';
            strHtml_Serve += '      <br>';
            strHtml_Serve += '      <img style="width: 100%;" src="../../Images/serviceImg/p_02.png">';
            strHtml_Serve += '      <p></p>';
            strHtml_Serve += '      <li><span style="color: red;">“观禾影视文化传媒”</span>为您带来<span style="color: red;">最佳解决方案！</span>帮你把摩英集训营打包带回家！~ 定格蜕变成长瞬间！ 持续放大摩英效应！ 让您的孩子成为<span style="color: red;">“变形计”</span>大片主角！！</li>';
            strHtml_Serve += '      <li>摩英教育全系课程 强势推出 360°蜕变全记录影视定制产品，为您的孩子个性化定制一份专属于他的精彩回忆，一份见证孩子感动、蜕变成长的蓝光高清纪录片，纯净第三方视角真实记录，这将是您给孩子最好的成长礼物！</li>';
            strHtml_Serve += '      <li><span  style="color: rgb(0, 176, 80);">每一次的成长，每一次的感动，每一次的蜕变，用镜头记录下来，将瞬间变为永恒。</span>五年、十年后，回头来看，这份青春成长的回忆对孩子的价值是无法用金钱来衡量的!</li>';
            strHtml_Serve += '      <br>';
            strHtml_Serve += '      <img style="width: 100%;" src="../../Images/serviceImg/p_03.png">';
            strHtml_Serve += '      <p></p>';
            strHtml_Serve += '      <li style="font-size: 14px;color: rgb(0, 112, 192)"><strong>360°蜕变全记录 系列产品</strong></li>';
            strHtml_Serve += '      <li><span style="color: red">定制产品以微电影的风格结合记录片的形式，</span>为您完美的保留孩子青春蜕变的恒久记忆，绝对比《爸爸去哪儿》更精彩哦！因为主角就是您的孩子！</li>';
            strHtml_Serve += '      <br>';
            strHtml_Serve += '      <li style="background-color: rgb(0, 176, 240);color: rgb(255, 255, 0)"><strong>摩英<span style="color: white;">统一版</span>回忆视频</strong></li>';
            strHtml_Serve += '      <li>7天全程记录，最后成片时长60分钟，由专业摄像团队+资深剪辑师倾力打造统一版回忆视频，最后刻录成1920x1080FHD蓝光高清D9光盘</li>';
            strHtml_Serve += '      <br>';
            strHtml_Serve += '      <li style="background-color: rgb(0, 176, 240);color: rgb(255, 255, 0)"><strong>VIP摩英大电影</strong><span style="color: white;">（个性定制）</span></li>';
            strHtml_Serve += '      <li>从入营报到直到结营离开酒店，专业摄像师全程跟拍，记录学员7天集训生活、学习中的感动绽放瞬间，打造专属于您孩子个人的珍藏青春回忆。并由专业剪辑师后期剪辑成一部60分钟左右的个人MV微电影（1920x1080FHD蓝光高清），给家长一个全新的独特视角了解孩子的世界，为孩子留下一份永久珍藏的励志回忆。</li>';
            strHtml_Serve += '      <br>';
            strHtml_Serve += '      <li style="background-color: rgb(0, 176, 240);color: rgb(255, 255, 0)"><strong>VIP蜕变水晶相册</strong><span style="color: white;">（个性定制）</span></li>';
            strHtml_Serve += '      <li>专业摄影师全程抓拍，记录学员7天集训营生活、学习中的感动蜕变瞬间，从中精选出120张照片素材留底，再从120张精选照片中精修30张制作一本12寸的水晶相册，并附赠全部留底原始素材及精修成片。</li>';
            strHtml_Serve += '      <br>';
            strHtml_Serve += '      <img style="width: 100%;" src="../../Images/serviceImg/p_04.png">';
            strHtml_Serve += '      <p></p>';
            strHtml_Serve += '      <li style="font-size: 14px;background-color: rgb(255, 255, 0);"><strong>我们注重的是：</strong></li>';
            strHtml_Serve += '      <li>純净第三方视角真实记录，让您的孩子化身<span style="color: red;">"变形记"</span>主角，拍摄过程中会<span style="color: red;">采取尽可能隐蔽的拍摄方式，</span>以免打扰孩子正常学习生活的情绪状态。</li>';
            strHtml_Serve += '      <li>集训营的八天中我们会<span style="color: red;">根据学员意愿安排单独视频采访及相关主讲老师、助教采访，探访学员内心世界，</span>传达学员真实想法，在学员与家长之间建立真情流露的沟通渠道。</li>';
            strHtml_Serve += '      <li>定制客户的全部视频、照片原始素材均<span style="color: red;">提供为期一年的免费存档服务</span>（自产品订购日起一年内）可供学员及家长随时预约提取。</li>';
            strHtml_Serve += '      <li>因个性化定制占用摄制组团队大量的时间和精力，每期集训营<span style="color: red;">每班仅限3个名额，摄影摄像师会时刻关注您的孩子，</span>记录他们在这八天中的幸福、快乐、感动、蜕变……</li>';
            strHtml_Serve += '      <li>注：名额确定以完款登记时间为准</li>';
            strHtml_Serve += '      <br>';
            strHtml_Serve += '      <img style="width: 100%;" src="../../Images/serviceImg/p_06.png">';
            strHtml_Serve += '      <p></p>';
            strHtml_Serve += '      <li style="font-size: 14px;background-color: rgb(0, 176, 240);color: rgb(255, 255, 0);"><strong>360°蜕变全记录</strong></li>';
            strHtml_Serve += '      <li>增值服务:</li>';
            strHtml_Serve += '      <li>统一版摩英回忆视频<strong style="color: red;">300元</strong>(单阶7天)</li>';
            strHtml_Serve += '      <li>VIP摩英大电影<strong style="color: red;">1980元</strong>(单阶7天)</li>';
            strHtml_Serve += '      <li>VIP蜕变水晶相册<strong style="color: red;">1280元</strong>(单阶7天)</li>';
            strHtml_Serve += '      <li>VIP摩英大电影+VIP蜕变水晶相册<strong style="color: red;">2680元</strong>(单阶7天) <strong style="color: red;">强烈推荐 性价比极高</strong></li>';
            strHtml_Serve += '      <li>VIP摩英大电影+VIP蜕变水晶相册<strong style="color: red;">3980元</strong>(两阶14天) <strong style="color: red;">狂烈推荐 性价比极高</strong></li>';
            if (full) {
                strHtml_Serve += '      <li><button class="registrationButton" onclick="CourseRegistration_Add(' + CourseDetials.CourseID + ', ' + CourseDetials.CourseType + ')" id="registrationButton">立即候补</button></li>';
            } else {
                strHtml_Serve += '      <li><button class="registrationButton" onclick="CourseRegistration_Add(' + CourseDetials.CourseID + ', ' + CourseDetials.CourseType + ')" id="registrationButton">立即预约</button></li>';
            }
            strHtml_Serve += '   </ul>';
        } else {
            strHtml_Serve += '  <ul class="list-unstyled" style="padding-left: 10px;padding-right: 10px;padding-top: 5px;font-size: 12px;">';
            if (full) {
                strHtml_Serve += '      <li><button class="registrationButton" onclick="CourseRegistration_Add(' + CourseDetials.CourseID + ', ' + CourseDetials.CourseType + ')" id="registrationButton">立即候补</button></li>';
            } else {
                strHtml_Serve += '      <li><button class="registrationButton" onclick="CourseRegistration_Add(' + CourseDetials.CourseID + ', ' + CourseDetials.CourseType + ')" id="registrationButton">立即预约</button></li>';
            }
            strHtml_Serve += '   </ul>';
        }

        $("#Detials").html(strHtml_Detials);
        $("#Teachers").html(strHtml_Teachers);
        $("#Serve").html(strHtml_Serve);
    }
}

function CourseRegistration_Add(CourseID, CourseType) {
    window.location.href = "../book/sign.html?CourseID=" + CourseID + '&CourseType=' + CourseType;
}