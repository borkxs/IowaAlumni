if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else {
	// This is a single context application with multiple windows in a stack
	(function() {
		//determine platform and form factor and render appropriate components
		var osname = Ti.Platform.osname,
			height = Ti.Platform.displayCaps.platformHeight,
			width = Ti.Platform.displayCaps.platformWidth;
	
		//considering tablet to have one dimension over 900px - can define your own
		var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
		
		var Window;
		if (isTablet) {
			Window = require('ui/tablet/ApplicationWindow');
		}
		else {
			if (osname === 'android') {
				
				Tabs = require('ui/handheld/android/ApplicationWindow');
			}
			else if (osname === 'mobileweb') {
				Window = require('ui/handheld/mobileweb/ApplicationWindow');
			}
			else {
				Window = require('ui/handheld/ios/ApplicationWindow');
			}
		}

		var tgrp = Ti.UI.createTabGroup();
		var win1 = new Window('http://iowalum.com/blog/?feed=rss2','Iowa Insider');
		var win2 = new Window('http://iowalum.com/magazine/feed_xml.cfm?start=1&end=10','Alumni Magazine');
		win1.navBarHidden = true;
		win2.navBarHidden = true;
		var tab1 = Ti.UI.createTab({window:win1,titleid:'Iowa Insider'});
		var tab2 = Ti.UI.createTab({window:win2,titleid:'Alumni Magazine'});
		tgrp.addTab(tab1);
		tgrp.addTab(tab2);
		tgrp.open();
	})();
}
