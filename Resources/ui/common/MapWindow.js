
//var GetLocation = require('ui/common/GetLocation');
var GetFeed = require('ui/common/GetFeed');
var ApplicationWindow = require('ui/common/ApplicationWindow');

function MapWindow(data) {
	
	var self = new ApplicationWindow("Member Benefits");
	
	
	var mapWin = Ti.UI.createWindow({
	    //title:'Window 1',
	    top: 43,
	    backgroundColor:'#ffffff',
		navBarHidden: true
	});


	
	
	var businessesInfo =  new GetFeed ('http://iowalum.com/membership/feed_xml.cfm');
	
	var companyInfo = [];
	for (var i = 0; i <= businessesInfo.length - 1; i++) {
		companyInfo.push(
			Titanium.Map.createAnnotation(
			{
			    latitude:  businessesInfo[i].latitude,
			    longitude: businessesInfo[i].longitude,
			    title: businessesInfo[i].company,
			    subtitle: businessesInfo[i].street,
			    pincolor: Titanium.Map.ANNOTATION_RED,
			    animate:true,
			})
		);
	}
 
	
	var map = Ti.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {latitude: businessesInfo[0].latitude, longitude: businessesInfo[0].longitude,
			latitudeDelta:0.01, longitudeDelta:0.01 },
		animate: true,
		regionFit: true,
		userLocation: true,
		height: 250,
	    annotations: companyInfo,
		top: 0
	});

	var table = Ti.UI.createTableView({
		height: 300,
		top: 250
	});

	
	var data = [];
	for (var i = 0; i <= businessesInfo.length - 1; i++) {
	    var row = Ti.UI.createTableViewRow({
	    	company: businessesInfo[i].company,
	    	latitude:  businessesInfo[i].latitude,
			longitude: businessesInfo[i].longitude,
	        height: 50
	    });
	    var companyLabel = Ti.UI.createLabel({
	        text: (businessesInfo[i].company),
	        textAlign: 'left',
	        left: 10,
	        font: {fontFamily:'Helvetica',fontSize:12,fontWeight:'bold'}
	    });
	    var discountLabel = Ti.UI.createLabel({
	        text: (businessesInfo[i].discount),
	        textAlign: 'left',
	        left: 10,
	        top: 35,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:10,fontWeight:'bold'}
	    });
	    row.add(companyLabel);
	    row.add(discountLabel);
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
		    annotations: companyInfo,
			top: 0
		});
		
		mapWin.add(map);
		
		map.selectAnnotation(companyInfo[e.index]);
	});
	//new GetLocation();
	return self;

}



module.exports = MapWindow;