var GetFeed = require('ui/common/GetFeed');
var GameWatchWindow = require('ui/common/GameWatchWindow');

var ApplicationWindow = require('ui/common/ApplicationWindow');


function ClubsWindow(title){
	
	var self = new ApplicationWindow(title);
	
	
	
	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 43
	});
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
			 //left: 10,
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
		//Ti.API.info(stateClubs);
		(new GameWatchWindow(stateClubs[0], stateClubs[1])).open();
	});
	
	

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
			//clubsInfoList[i].state = setStateTitle(state);
			//Ti.API.info(clubsInfoList[i].state)
			stateInfoList.push(clubsInfoList[i]);
		}
	} 
	
	data.push(stateInfoList);
	return data;
}

function setStateTitle (string){
	if (string.toUpperCase() == 'DISTRICT OF COLUMBIA'){
		return 'DC'
	}
	else if (string.toUpperCase() == 'MASSACHUSETTS'){
		return 'MA'
	}
	else if (string.toUpperCase() == 'NEW MEXICO'){
		return 'NM'
	}
	else if (string.toUpperCase() == 'NEW YORK'){
		return 'New York'
	}
	else if (string.toUpperCase() == 'NORTH CAROLINA'){
		return 'NC'
	}
	else if (string.toUpperCase() == 'SOUTH CAROLINA'){
		return 'SC'
	}
	else if (string.toUpperCase() == 'PENNSYLVANIA'){
		return 'PA'
	}
	else if (string.toUpperCase() == 'WASHINGTON'){
		return 'WA'
	}
	else{
		return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
	}
    
}

module.exports = ClubsWindow;