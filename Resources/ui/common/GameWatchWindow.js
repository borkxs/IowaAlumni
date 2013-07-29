var ApplicationWindow = require('ui/common/ApplicationWindow');

function GameWatchWindow(clubData) {
	
	
	var self = Ti.UI.createWindow({
	    //title:'Window 1',
	    backgroundColor:'#e2e2e2',
		navBarHidden: true
	});

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title: clubData[0].state,
		navBarHidden:false,
		barImage:'navbar.png',
		//hires:true,
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	var menuButton = Ti.UI.createButton({
		
		title: 'Back',
		height: 30,
		width: 63,
		backgroundImage: 'backbutton.png',
		//left: 15,
		font: {fontFamily:'Helvetica Neue',fontSize:14,fontWeight:'bold'},
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);

	//menuButton event
	menuButton.addEventListener('click', function(e){
		tabGroup.close();
		self.close();
		
	});
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	
	
	var mapWin = Ti.UI.createWindow({
	    //title:'Window 1',
	    top: 43,
	    backgroundColor:'#ffffff',
		navBarHidden: true
	});


	
	
	
	
	var gameWatchInfo = [];
	for (var i = 0; i <= clubData.length - 1; i++) {
		gameWatchInfo.push(
			Titanium.Map.createAnnotation(
			{
			    latitude:  clubData[i].latitude,
			    longitude: clubData[i].longitude,
			    title: clubData[i].place,
			    subtitle: clubData[i].street,
			    pincolor: Titanium.Map.ANNOTATION_RED,
			    animate:true,
			})
		);
		
	}
 		
	
	var map = Ti.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {latitude: clubData[0].latitude, longitude: clubData[0].longitude,
			latitudeDelta:0.01, longitudeDelta:0.01 },
		animate: true,
		regionFit: true,
		userLocation: true,
		height: 200,
	    annotations: gameWatchInfo,
		top: 0
	});

	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 200
	});

	
	var data = [];
	for (var i = 0; i <= gameWatchInfo.length - 1; i++) {
	    var row = Ti.UI.createTableViewRow({
	    	club: clubData[i].club,
	    	latitude:  clubData[i].latitude,
			longitude: clubData[i].longitude,
	        height: 100
	    });
	    var clubLabel = Ti.UI.createLabel({
	        text: (clubData[i].club),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var placeLabel = Ti.UI.createLabel({
	        text: (clubData[i].place),
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    var streetLabel = Ti.UI.createLabel({
	        text: (clubData[i].street),
	        textAlign: 'left',
	        left: 10,
	        top: 46,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    row.add(clubLabel);
	    row.add(placeLabel);
	    row.add(streetLabel);
	    data.push(row);
	    
	};

	table.setData(data);
	
	mapWin.add(map);
	mapWin.add(table);
	
	
	self.add(mapWin);
	

	table.addEventListener('click', function(e){
		
		map = Ti.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude: e.row.latitude, longitude: e.row.longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
			animate: true,
			regionFit: true,
			userLocation: true,
			height: 200,
		    annotations: gameWatchInfo,
			top: 0
		});
		
		mapWin.add(map);
		
		map.selectAnnotation(gameWatchInfo[e.index]);
	});
	//new GetLocation();
	
	
	

var tabGroup = Titanium.UI.createTabGroup();



var navTab1 = Titanium.UI.iPhone.createNavigationGroup({
    window: self
});

var baseWinTab1 = Titanium.UI.createWindow({
    navBarHidden: true
});

baseWinTab1.add(navTab1);


//Club Window
var mainWinTab2 = Titanium.UI.createWindow({
    navBarHidden: true,
    backgroundColor:'#e2e2e2'
});

var navTab2 = Titanium.UI.iPhone.createNavigationGroup({
    window: mainWinTab2
});

	
	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title: (clubData[0].state).concat(" Clubs"),
		navBarHidden:false,
		barImage:'navbar.png',
		//hires:true,
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	var menuButton = Ti.UI.createButton({
		
		title: 'Back',
		height: 30,
		width: 63,
		backgroundImage: 'backbutton.png',
		//left: 15,
		font: {fontFamily:'Helvetica Neue',fontSize:14,fontWeight:'bold'},
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);

	//menuButton event
	menuButton.addEventListener('click', function(e){
		tabGroup.close();
		self.close();
		
	});
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	mainWinTab2.add(navGroup);
	
	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 45
	});

	
	var data = [];
	for (var i = 0; i <= clubData.length - 1; i++) {
	    var row = Ti.UI.createTableViewRow({
	    	club: clubData[i].club,
	    	latitude:  clubData[i].latitude,
			longitude: clubData[i].longitude,
	        height: 50
	    });
	    var clubLabel = Ti.UI.createLabel({
	        text: (clubData[i].club),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	   
	    row.add(clubLabel);
	    
	    data.push(row);
	    
	};

	table.setData(data);
	
	mainWinTab2.add(table);
 
var baseWinTab2 = Titanium.UI.createWindow({
    navBarHidden: true
});
baseWinTab2.add(navTab2);

var tab1 = Titanium.UI.createTab({  
    icon: 'info.png',
    title: 'Clubs',
    window: baseWinTab1
});
tabGroup.addTab(tab1);  
 
var tab2 = Titanium.UI.createTab({  
    icon: 'info.png',
    title: 'Game Watch',
    window: baseWinTab2
});
tabGroup.addTab(tab2);  
tabGroup.setActiveTab(0); 
tabGroup.open();

return self;
/*

 
// First tab, main window
 
var mainWinTab1 = Titanium.UI.createWindow({
    title: 'Window 1'
});
var data = [{title: 'item one'}, {title: 'item two'}, {title: 'item three'}];
var table = Titanium.UI.createTableView({
    data: data
}); 
mainWinTab1.add(table);
 
// First tab, navigator
 
var navTab1 = Titanium.UI.iPhone.createNavigationGroup({
    window: mainWinTab1
});
var baseWinTab1 = Titanium.UI.createWindow({
    navBarHidden: true
});
baseWinTab1.add(navTab1);
 
// First tab, subwindow
 
table.addEventListener('click', function(e){
    tabGroup.animate({bottom: -50, duration: 500});
 
    var subWinTab1 = Titanium.UI.createWindow({
        title: e.row.title
    });
    navTab1.open(subWinTab1);
 
    subWinTab1.addEventListener('close', function(e){
        tabGroup.animate({bottom: 0, duration: 500});
    });
});
 
// Second tab, main window
 
var mainWinTab2 = Titanium.UI.createWindow({
    title: 'Window 2'
});
var data = [{title: 'item a'}, {title: 'item b'}, {title: 'item c'}];
var table = Titanium.UI.createTableView({
    data: data
}); 
mainWinTab2.add(table);
 
// Second tab, navigator
 
var navTab2 = Titanium.UI.iPhone.createNavigationGroup({
    window: mainWinTab2
});
 
var baseWinTab2 = Titanium.UI.createWindow({
    navBarHidden: true
});
baseWinTab2.add(navTab2);
 
// Second tab, subwindow
 
table.addEventListener('click', function(e){
    var subWinTab2 = Titanium.UI.createWindow({
        title: e.row.title
    });
    navTab2.open(subWinTab2);
});
 
// Tab group
 
var tab1 = Titanium.UI.createTab({  
    icon: 'KS_nav_ui.png',
    title: 'Full nav',
    window: baseWinTab1
});
tabGroup.addTab(tab1);  
 
var tab2 = Titanium.UI.createTab({  
    icon: 'KS_nav_views.png',
    title: 'Embedded nav',
    window: baseWinTab2
});
tabGroup.addTab(tab2);  
 
tabGroup.open();
*/
}



module.exports = GameWatchWindow;