var ywtit=$('#ywtit');
//抢鱼丸功能默认开启
$("#right_col_peck .peck-cdn").bind('DOMSubtreeModified',peck)
function peck(){
	/* 1为自动抢鱼丸模式  0为普通抢模式 */
	//判断是否有宝
	var peckText=$("#right_col_peck .peck-cdn").text().trim();
	if(peckText&&peckText.indexOf(':')>0){
		tmp = peckText.split(":");
		sec = parseInt(tmp[0]) * 60 + parseInt(tmp[1]);
		setTimeout(openPeck, (sec * 1000) - 1000);
		$("#right_col_peck").unbind('DOMSubtreeModified');
		return;
	}
	if(peckText=="领取"){
		$("#right_col_peck").click();
		openPeck();
		return;
	}
}

function openPeck(){
    var _Timer = setInterval(function () {
	    if ($(".peck-cdn").text() == "领取" && !$(".peck-cdn").is(":hidden")) {
	        $(".peck-cdn,#right_col_peck").click();
	    } else if ($(".peck-cdn").is(":hidden")) {
			clearInterval(_Timer);
			$("#right_col_peck .peck-cdn").bind('DOMSubtreeModified',peck)
	    }
    },500)
}