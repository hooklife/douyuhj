var wHash=window.location.hash
var ywtit=$('#ywtit');
//监视页面
if (wHash=="#event") {
	//拦截封包
	function Sttdecode(f) {
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

	    if(getsttdata(e,"gs")=='6'){
	        // window.location.href="/"+getsttdata(e,'drid');
	        //打开礼物窗口
	        window.open("/"+getsttdata(e,'drid')+"#huojian","room_"+getsttdata(e,'drid'));
	    }
	    return e
	}

	//加载成功监视
	ywtit.bind('DOMSubtreeModified',function (){
		var ywText= ywtit.text();
		if(ywText.indexOf('丸')>0){
			ywtit.unbind('DOMSubtreeModified');
			$.dialog.tips_black("斗鱼自动抢鱼丸 监视开启成功 获取新版本请加群：541978413");
			//人数部分监视
			setInterval(function (){
				//人太少了
				if($('#ol_num').text()<100000){
					$.dialog.tips_black("人数少于10W准备跳转");
					$.get('/directory/all?page=1&isAjax=1', function(data) {
						var div = $('<div/>');
						div.html(data);
						var href=div.find('li:eq(0) a').attr('href');
						window.location.href=href+"#event";
					});
				}
			},5000)
		}
	})
}

var status=0;
if(wHash=="#huojian"){
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
	    return e
	}

	ywtit.bind('DOMSubtreeModified',function (){
		var ywText = ywtit.text();
		if(ywText.indexOf('丸')>0){
			//屏蔽弹幕
		   	thisMovie("WebRoom").js_barrage(false);
		   	//礼物屏蔽
		   	thisMovie("WebRoom").js_effectVisible(0)

		   	$('#chart_content').val('监视火箭 秒抢鱼丸 群:541978413')
		   	sendmsg();
			ywtit.unbind('DOMSubtreeModified');
		}
	})
	status=1
}
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
		return;
	}
}

function openPeck(){
    var _Timer = setInterval(function () {
	    if ($(".peck-cdn").text() == "领取" && !$(".peck-cdn").is(":hidden")) {
	        $(".peck-cdn,#right_col_peck").click();
	    } else if ($(".peck-cdn").is(":hidden")) {
	    	if (status==1) {
	    		window.close();
	    	}else{
	    		clearInterval(_Timer);
	    		$("#right_col_peck .peck-cdn").bind('DOMSubtreeModified',peck)
	    	}
	    }
    },50)
}