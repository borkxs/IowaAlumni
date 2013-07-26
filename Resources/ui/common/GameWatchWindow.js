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
 		Ti.API.info(gameWatchInfo.length);
	
	var map = Ti.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {latitude: clubData[0].latitude, longitude: clubData[0].longitude,
			latitudeDelta:0.01, longitudeDelta:0.01 },
		animate: true,
		regionFit: true,
		userLocation: true,
		height: 250,
	    annotations: gameWatchInfo,
		top: 0
	});

	var table = Ti.UI.createTableView({
		height: 300,
		top: 250
	});

	
	var data = [];
	for (var i = 0; i <= gameWatchInfo.length - 1; i++) {
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
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var streetLabel = Ti.UI.createLabel({
	        text: (clubData[i].street),
	        textAlign: 'left',
	        left: 10,
	        top: 35,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    row.add(clubLabel);
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
			height: 250,
		    annotations: gameWatchInfo,
			top: 0
		});
		
		mapWin.add(map);
		
		map.selectAnnotation(gameWatchInfo[e.index]);
	});
	//new GetLocation();
	return self;

}



module.exports = GameWatchWindow;