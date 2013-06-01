

function MapWindow(data) {
	
	var self = Ti.UI.createWindow({
	    //title:'Window 1',
	    backgroundColor:'#ffffff',
		navBarHidden: true
	});

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:'Member Benefits',
		navBarHidden:false,
		barImage:'navbar.png',
		//hires:true,
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	var menuButton = Ti.UI.createButton({
		backgroundImage: 'newmenubutton.png',
		backgroundSelectedImage: 'newmenubuttonselected.png',
		title: '',
		height: 22,
		width: 37,
		//left: 15,
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);

	//menuButton event
	menuButton.addEventListener('click', function(e){
		self.fireEvent('menuClick');
	});

	self.addEventListener('swipeToggle', function(e){
		self.fireEvent('menuClick');
	});
	self.addEventListener('swipe', function(e){
		self.fireEvent('menuClick');
	});
	self.addEventListener('swipeListen', function(e){
		self.fireEvent('menuClick');
	});

	var mapWin = Ti.UI.createWindow({
	    //title:'Window 1',
	    backgroundColor:'#ffffff',
		navBarHidden: true
	});

	var annotation = Titanium.Map.createAnnotation(
	{
	    latitude:41.659255,
	    longitude:-91.534460,
	    title:"Active Endeavors",
	    subtitle:'10% off regular-priced footwear',
	    pincolor: Titanium.Map.ANNOTATION_RED,
	    animate:true,
	});

	var map = Ti.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {latitude: 41.659255, longitude: -91.534460,
			latitudeDelta:0.01, longitudeDelta:0.01 },
		animate: true,
		regionFit: true,
		userLocation: true,
		height: 250,
	    annotations:[annotation],
		top: 0
	});

	var table = Ti.UI.createTableView({
		height: 300,
		top: 250
	});

	var businesses = ['Active Endeavors','All Seasons Auto','Anytime Fitness Iowa City','Azul Tequila','Biolife Plasma Services',
	                    'Bo-James','Boubin Tire & Automotive','Buffalo Wild Wings',"Chili's",'Complete Nutrition','Cookies by Design'];



	var data = [];
	for (var i = 0; i <= businesses.length - 1; i++) {
	    var row = Ti.UI.createTableViewRow({
	        height: 50
	    });
	    var label = Ti.UI.createLabel({
	        text: businesses[i],
	        textAlign: 'left',
	        left: 10,
	        font: {fontFamily:'Helvetica',fontSize:12,fontWeight:'bold'}
	    });
	    row.add(label);
	    data.push(row);
	};

	table.setData(data);

	mapWin.add(map);
	mapWin.add(table);

	
	masterContainerWindow.add(mapWin);

	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);

	return self;

}

module.exports = MapWindow;