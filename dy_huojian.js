var ywtit=$('#ywtit');
//拦截封包  屏蔽弹幕 防止卡顿
function Sttdecode(f) {
	
	// console.log(f)
	if (f == "") {
		return false
	}
	var d = f.split("/");
	var e = new Array();
	$.each(d, function(b) {
		e[b] = new Object();
		if (d[b].indexOf("@=") != -1) {
			var a = d[b].split("@=");
			e[b].name = de_filter_str(a[0]);
			e[b].value = de_filter_str(a[1])
		} else {
			e[b].name = "";
			e[b].value = de_filter_str(d[b])
		}
	});
	//sn@=放风筝的X伦/dn@=佐y1丶/gn@=春雷礼炮/gc@=1/drid@=314136/gs@=6/es@=1/rid@=287471/gid@=102/
	if(getsttdata(e,"type")=='chatmessage'){
		return false;
	}

	//抢鱼丸的破信
	//type@=ggbb/rid@=461739/gid@=4/sl@=56/sid@=18160483/did@=25089260/snk@=安之若素M/dnk@=tianchangyu/rpt@=0/
	if(getsttdata(e,"type")=='ggbb'){
		return false;
	}
	//屏蔽礼物
	if(getsttdata(e,"type")=='dgn'){
		return false;
	}
	return e
}

ywtit.bind('DOMSubtreeModified',function (){
	var ywText = ywtit.text();
	if(ywText.indexOf('丸')>0){
		// $('#chart_content').val('免费监视火箭 秒抢鱼丸 群:541978413')
		// sendmsg();
		ywtit.unbind('DOMSubtreeModified');

		//暂停视频
		setTimeout(function (){
			var flashvars=$('#WebRoom param[name="flashvars"]');
			var flashvars_val=flashvars.val();
			flashvars.val(flashvars_val.replace('Status=true','Status=false'));
			$('#WebRoom').css('display', 'none');
			setTimeout(function (){
				$('#WebRoom').css('display', 'block');
				//屏蔽弹幕
				setInterval(function (){
					thisMovie("WebRoom").js_barrage(false);
					//礼物屏蔽
					thisMovie("WebRoom").js_effectVisible(0)
				},500)

			},500)
			
		},1000)
		
	}
})

//抢鱼丸功能默认开启
$("#right_col_peck .peck-cdn").bind('DOMSubtreeModified',peck)
function peck(){
	/* 1为自动抢鱼丸模式  0为普通抢模式 */
	//判断是否有宝


	//强行去掉loading
	$("#right_col_peck").removeClass("peck-loading").addClass("peck-close");
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
	    	window.close();
	    }
    },500)
}