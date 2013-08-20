var MapWindow = require('ui/common/MapWindow');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var GetFeed = require('ui/common/GetFeed');
var WebView = require('ui/common/WebView');

function NationalBenefitsWindow(){
	var self = new ApplicationWindow('National Member Benefits');
	
	var textView = Ti.UI.createView({
		backgroundColor: 	'#e2e2e2',
		height:				70,
		top:				43,
		
	});
	var introLabel = Ti.UI.createLabel({
			 text: ('As a UIAA member, you gain access to a variety of exclusive benefits that show our appreciation for your support of the UIAA.'),
			 textAlign: 'left',
			 left: 10,
			 width: 300,
			 top: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
	textView.add(introLabel);	
	
	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 113
	});
	
	var linkLabel = Ti.UI.createLabel({
			 text: 'IC benefits',
			 //textAlign: 'left',
			 left: 250,
			 top: 60,
			 color: 'blue',
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
		
	linkLabel.addEventListener('click', function(e){
		(new MapWindow()).open();
	});
	
	var discount = new GetFeed ('http://www.iowalum.com/membership/feed_benefits_xml.cfm');
	
	var data = [];
	for (var i = 0; i <= discount.length - 1; i++) {
		if (i % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		        height: 'auto',
		        bottom: 10,
		    });
		}
		else{
			var row = Ti.UI.createTableViewRow({
		        height: 'auto',
		        backgroundColor:'#cccccc',
		        bottom: 10,
		    });
		}
	    var titleLabel = Ti.UI.createLabel({
	        text: (discount[i].title),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var descriptionLabel = Ti.UI.createLabel({
	        text: (discount[i].description),
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    row.add(titleLabel);
	    row.add(descriptionLabel);
	    data.push(row);
	};
	
	table.addEventListener('click', function(e){
		new WebView (discount[e.index].link);
	});
	

	table.setData(data);
	
	textView.add(linkLabel);
	self.add(textView);
	self.add(table);
	
	return self;
	
}
module.exports = NationalBenefitsWindow;