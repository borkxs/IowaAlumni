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

		var MenuRow = require('ui/common/MenuRow');

		//// ---- Menu window, positioned on the left
		var menuWindow = Ti.UI.createWindow({
		    top: 		0,
		    left: 		0,
		    width: 		0
		});
		
		var logorow = Ti.UI.createTableViewRow({
			layout: 'vertical',
			height: 125,
			backgroundColor: 'transparent'
		});
		var logo = Ti.UI.createImageView({
			image: 'logo.png',
			width: 210,
			height: 75,
			top: 50,
			left: 10,
			hires: true
		});
		logorow.add(logo);

		//// ---- Menu Table
		// Menu Titles
		var menuTitles = [
			(logorow),
		    (new MenuRow('Iowa Insider','insider','http://iowalum.com/blog/?feed=rss2',true)),
		    (new MenuRow('Iowa Alumni Magazine','magazine','http://iowalum.com/magazine/feed_xml.cfm',false)),
		    (new MenuRow('Events','events',false))
		];

		// Tableview
		var tableView = Ti.UI.createTableView({
			separatorColor: '000000',
			backgroundImage: 'menubg.jpg',
		    footerTitle:'',
		    top: 0
		});
		tableView.setData(menuTitles);
		
		menuWindow.add(tableView);

		//// ---- Window with navigationGroup
		var navWindow = Ti.UI.createWindow({
		    width:320, // Set the width of the sliding window to avoid cut out from animation
			navBarHidden:true
		});
		menuWindow.open();
		navWindow.open();
		menuWindow.width = 270;

		// Main window
		var win = new Window('http://iowalum.com/blog/?feed=rss2','Iowa Insider');
		win.moving = false;
		win.axis = 0;
		win.navBarHidden = true;

		// NavigationGroup
		var navGroup = Ti.UI.iPhone.createNavigationGroup({
		    window:win
		});
		navWindow.add(navGroup);

		win.addEventListener('menuClick', function(e){
		    // If the menu is opened
		    if(e.source.toggle == true){
		        navWindow.animate({
		            left:0,
		            duration:400,
		            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		        });
		        e.source.toggle = false;
		    }
		    // If the menu isn't opened
		    else{
		        navWindow.animate({
		            left:270,
		            duration:400,
		            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		        });
		        e.source.toggle  = true;
		    }
		});

		tableView.addEventListener('click', function(e) {
			
			//Ti.API.info(JSON.stringify(e));
			//// ---- Window with navigationGroup
			var navWindow = Ti.UI.createWindow({
			    width:320, // Set the width of the sliding window to avoid cut out from animation
				navBarHidden:true
			});
			menuWindow.open();
			navWindow.open();
			menuWindow.width = 270;

			// Main window
			var win = new Window(e.row.feed,e.row.feedTitle);
			win.moving = false;
			win.axis = 0;
			win.navBarHidden = true;

			// NavigationGroup
			var navGroup = Ti.UI.iPhone.createNavigationGroup({
			    window:win
			});
			navWindow.add(navGroup);

			win.addEventListener('menuClick', function(e){
			    // If the menu is opened
			    if(e.source.toggle == true){
			        navWindow.animate({
			            left:0,
			            duration:400,
			            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
			        });
			        e.source.toggle = false;
			    }
			    // If the menu isn't opened
			    else{
			        navWindow.animate({
			            left:270,
			            duration:400,
			            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
			        });
			        e.source.toggle  = true;
			    }
			});

		});

		/*
		win.addEventListener('fireTouchstart', function(e){
		    // Get starting horizontal position
		    e.source.axis = parseInt(e.x);
		});

		win.addEventListener('fireTouchmove', function(e){
		    // Subtracting current position to starting horizontal position
		    var coordinates = parseInt(e.globalPoint.x) - e.source.axis;
		    // Detecting movement after a 20px shift
		    if(coordinates > 20 || coordinates < -20){
		        e.source.moving = true;
		    }
		    // Locks the window so it doesn't move further than allowed
		    if(e.source.moving == true && coordinates <= 180 && coordinates >= 0){
		        // This will smooth the animation and make it less jumpy
		        navWindow.animate({
		            left:coordinates,
		            duration:20
		        });
		        // Defining coordinates as the final left position
		        navWindow.left = coordinates;
		    }
		});

		win.addEventListener('fireTouchend', function(e){
		    // No longer moving the window
		    e.source.moving = false;
		    if(navWindow.left >= 75 && navWindow.left < 270){
		        // Repositioning the window to the right
		        navWindow.animate({
		            left:270,
		            duration:300
		        });
		        menuButton.toggle = true;
		    }else{
		        // Repositioning the window to the left
		        navWindow.animate({
		            left:0,
		            duration:300
		        });
		        menuButton.toggle = false;
		    }
		});
	*/


		/*

		var tgrp = Ti.UI.createTabGroup();
		var win1 = new Window('http://iowalum.com/blog/?feed=rss2','Iowa Insider');
		var win2 = new Window('http://iowalum.com/magazine/feed_xml.cfm?start=1&end=10','Alumni Magazine');
		//var win3 = new Window('http://now.uiowa.edu/recent/feed','Iowa Now');
		win1.navBarHidden = true;
		win2.navBarHidden = true;
		//win3.navBarHidden = true;
		var tab1 = Ti.UI.createTab({window:win1,titleid:'Iowa Insider'});
		var tab2 = Ti.UI.createTab({window:win2,titleid:'Alumni Magazine'});
		//var tab3 = Ti.UI.createTab({window:win3,titleid:'Iowa Now'});
		tgrp.addTab(tab1);
		tgrp.addTab(tab2);
		//tgrp.addTab(tab3);
		tgrp.open();
		*/

	})();
}
