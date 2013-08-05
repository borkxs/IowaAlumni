var GetFeed = require('ui/common/GetFeed');
var GameWatchWindow = require('ui/common/GameWatchWindow');

var ApplicationWindow = require('ui/common/ApplicationWindow');


function ClubsWindow(title){
	
	var self = new ApplicationWindow(title);
	
	var introLabel = Ti.UI.createLabel({
			 text: 'Want to connect with fellow UI grads, need a place to watch the next game with fellow Hawkeye fans? IOWA clubs have you covered—find a location near you!',
			 textAlign: 'left',
			 left: 10,
			 width: 300,
			 top: 53,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
	self.add(introLabel);		
	
	var table = Ti.UI.createTableView({
		height: 'auto',
		bottom: 70,
		top: 185
	});
	
	var people = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/mobile/clubs.png',
	  top:   130
	});
	
	self.add(people);
	
	var clubs = new GetFeed("http://iowalum.com/clubs/feed_xml.cfm");
	var clubsInfo = new GetFeed("http://iowalum.com/clubs/feed_p2_xml.cfm");
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= clubs.length - 1; i++) {
		if ((i == 0) || ((clubs[i - 1].state != clubs[i].state) && i != 0) ){ 
		if (rowCounter % 2 == 0){
			    var row = Ti.UI.createTableViewRow({
			    	text: clubs[i].state,
			        height: 50
			    });
		  }
		  else{
		  		var row = Ti.UI.createTableViewRow({
			    	text: clubs[i].state,
			    	backgroundColor:'#cccccc',
			        height: 50
			    });
		  }

		var label = Ti.UI.createLabel({
			 text: clubs[i].state,
			 textAlign: 'center',
			 font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
			        
		});
		   
		    row.add(label);
		    data.push(row);
		  	rowCounter++;
	    }
	    
	};


	
 
	table.setData(data);
	self.add(table);
	table.addEventListener('click', function(e){
		var stateClubs = getStateList(clubs, clubsInfo, e.row.text);
		(new GameWatchWindow(stateClubs[0], stateClubs[1])).open();
	});
	
	var currentAd = new GetFeed("http://iowalum.com/mobile-app/feed_xml.cfm");
	
	var ad = Ti.UI.createImageView({
	  image:    currentAd[0].staticAd,
	  width: 320,
	  height: 70,
	  top: 395,
	  left: 0
	  
	});
	ad.addEventListener('click', function(e) {
		new WebView (currentAd[0].staticAdUrl);
	}); 
	self.add(ad);

	return self;
	
}

function getStateList (clubsList, clubsInfoList, state){
	var data = [];
	var stateList = [];
	var stateInfoList = [];
	for (var i = 0; i <= clubsList.length - 1; i++){
		if (clubsList[i].state == state ){
			stateList.push(clubsList[i]);
		}
	} 
	data.push(stateList);
	for (var i = 0; i <= clubsInfoList.length - 1; i++){
		if ((clubsInfoList[i].state).toUpperCase() == state ){
			stateInfoList.push(clubsInfoList[i]);
		}
	} 
	
	data.push(stateInfoList);
	return data;
}


module.exports = ClubsWindow;