function loadScript(url, callback)
{
	// Adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('body')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;

	// Fire the loading
	head.appendChild(script);
}

var ver="?ver=1.1.0zs";


var wHash=window.location.hash
if (wHash=="#event") {
	//监视模式
	loadScript("http://7xqtuw.com1.z0.glb.clouddn.com/dy_event.js"+ver); 
}
else if(wHash=="#huojian"){
	//强火箭模式
	loadScript("http://7xqtuw.com1.z0.glb.clouddn.com/dy_huojian.js"+ver); 
}else{
	//默认模式
	loadScript("http://7xqtuw.com1.z0.glb.clouddn.com/dy_peck.js"+ver); 
}

