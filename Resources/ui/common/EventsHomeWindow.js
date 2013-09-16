var GetFeed = require('ui/common/GetFeed');
var GameWatchWindow = require('ui/common/GameWatchWindow');
var WebView = require('ui/common/WebView');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var StaticAd = require('ui/common/StaticAd');
var EventsWindow = require('ui/common/EventsWindow');

function EventsHomeWindow(title){
	
	var self = new ApplicationWindow(title);
	
	var introLabel = Ti.UI.createLabel({
			 text: 'Please select the category of events you want to view.',
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
		top: 100
	});
	

	
	var events = new GetFeed ("http://iowalum.com/calendar/feed_xml.cfm");
	var categories = new GetFeed("http://www.iowalum.com/mobile-app/events_category_feed.cfm");
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= categories.length - 1; i++) {
		
		if (rowCounter % 2 == 0){
			    var row = Ti.UI.createTableViewRow({
			    	text: categories[i].category,
			        height: 50
			    });
		  }
		  else{
		  		var row = Ti.UI.createTableViewRow({
			    	text: categories[i].category,
			    	backgroundColor:'#cccccc',
			        height: 50
			    });
		  }

		var label = Ti.UI.createLabel({
			 text: categories[i].category,
			 textAlign: 'center',
			 font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
			        
		});
		   
		    row.add(label);
		    data.push(row);
		  	rowCounter++;
	    
	    
	};


	
 
	table.setData(data);
	self.add(table);
	
	table.addEventListener('click', function(e){
		if (e.row.text == categories[0].category){
			(new EventsWindow(events, "All Events")).open();
		}
		else{
			var eventsList = getEvents(events, e.row.text);
			(new EventsWindow(eventsList, (e.row.text).concat("'s Events"))).open();
		}
		
		
	});
	
	var ad = new StaticAd(10,395);
	self.add(ad);
	
	

	return self;
	
}

function getEvents (list, category){
	var results = [];
	for (var i = 0; i <= list.length - 1; i++) {
		if(list[i].category == category){
			results.push(list[i]);		
		}
	}
	return results;
} 




module.exports = EventsHomeWindow;