var GetFeed = require('ui/common/GetFeed');
var FormatDate = require('ui/common/FormatDate');
var WebView = require('ui/common/WebView');

function StaticAd(index, topPosition){
	var currentAd = new GetFeed("http://iowalum.com/mobile-app/feed_xml.cfm");
	var ad = Ti.UI.createImageView({
	  image:    currentAd[index].ad,
	  width: 320,
	  height: 70,
	  bottom:0,
	  left: 0
	  
	});
	ad.addEventListener('click', function(e) {
		new WebView (currentAd[index].adUrl);
	}); 	
	
	return ad;
}

module.exports = StaticAd;
