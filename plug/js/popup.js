document.getElementById('open').onclick=function (){
	chrome.tabs.query({active:true, currentWindow:true}, function(tab){
		// chrome.tabs.update(tab[0].id, {url: tab[0].url+"#event"})
		var code = 'window.location.hash="#event";window.location.reload();';
		chrome.tabs.executeScript(tab.id, {code: code});
	});
}
//点击链接跳转
var links=document.querySelectorAll('._href');
for (var i = 0; i < links.length; i++) {
	links[i].onclick=function (){
		chrome.tabs.create({url: this.href});
	}
}
