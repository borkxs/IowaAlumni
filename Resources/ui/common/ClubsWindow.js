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
	
	var data = [];
	
	for (var i = 0; i <= clubs.length - 1; i++) {
		if ((i == 0) || ((clubs[i - 1].state != clubs[i].state) && i != 0) ){ 
		    var row = Ti.UI.createTableViewRow({
		    	text: clubs[i].state,
		        height: 50
		    });
		  

		var label = Ti.UI.createLabel({
			 text: clubs[i].state,
			 textAlign: 'center',
			 //left: 10,
			 font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
			        
		});
		   
		    row.add(label);
		    data.push(row);
		   
	    }
	    
	};


	
 
	table.setData(data);
	self.add(table);
	table.addEventListener('click', function(e){
		var stateClubs = getStateList(clubs, e.row.text);
		//Ti.API.info(stateClubs);
		(new GameWatchWindow(stateClubs)).open();
	});
	
	

	return self;
	
}

function getStateList (clubsList, state){
	var stateList = [];
	for (var i = 0; i <= clubsList.length - 1; i++){
		if (clubsList[i].state == state ){
			stateList.push(clubsList[i]);
		}
	} 
	return stateList;
}



module.exports = ClubsWindow;