var ywtit=$('#ywtit');
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
	if(getsttdata(e,"gs")=='6'){
		// window.location.href="/"+getsttdata(e,'drid');
		if (getsttdata(e,'drid')) {
			window.open("/"+getsttdata(e,'drid')+"?fromuid=123621#huojian","room_"+getsttdata(e,'drid'));
		}
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
		},1000)
		
		//暂停视频
		setTimeout(function (){
			var flashvars=$('#WebRoom param[name="flashvars"]');
			var flashvars_val=flashvars.val();
			flashvars.val(flashvars_val.replace('Status=true','Status=false'));
			$('#WebRoom').css('display', 'none');
			setTimeout(function (){
				$('#WebRoom').css('display', 'block');
				setInterval(function (){
					thisMovie("WebRoom").js_barrage(false);
					//礼物屏蔽
					thisMovie("WebRoom").js_effectVisible(0)
				},500)
			},500)
			
		},1000)
	}
})
