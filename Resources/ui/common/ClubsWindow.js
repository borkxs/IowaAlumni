var GetFeed = require('ui/common/GetFeed');

var ApplicationWindow = require('ui/common/ApplicationWindow');


function ClubsWindow(title){
	
	var self = new ApplicationWindow(title);
	
	
	
	var table = Ti.UI.createTableView({
		height: 420,
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
		        textAlign: 'left',
		        left: 10,
		        font: {fontFamily:'Helvetica',fontSize:12,fontWeight:'bold'}
		    });
		  
		    row.add(label);
		    data.push(row);
		   
	    }
	    
	};


	
 
	table.setData(data);
	self.add(table);
	table.addEventListener('click', function(e){
		//Ti.API.info(e) ;
		//(StateWindow()).open();
	});
	
	

	return self;
	
}



module.exports = ClubsWindow;