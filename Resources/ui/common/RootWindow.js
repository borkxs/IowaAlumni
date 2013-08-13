var GetFeed = require('ui/common/GetFeed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var CachedImageView = require('ui/common/CachedImageView');
var DateObject = require('ui/common/DateObject');
var SingleRow = require('ui/common/SingleRow');
var PostTable = require('ui/common/PostTable');
var HomeImageSlider = require('ui/common/HomeImageSlider');
var HomeMagazineSection = require('ui/common/HomeMagazineSection');
var HomeInsiderSection = require('ui/common/HomeInsiderSection');
var HomeSMSection = require('ui/common/HomeSMSection');
var Row = require('ui/common/Row');

var WebView = require('ui/common/WebView');
function RootWindow(data) {
	
	var self = new ApplicationWindow("Home");
	
	
	
	
	var tableView = new PostTable();
	tableView.top = 45;
	tableView.bottom = 70;
	tableView.selectionStyle ='none';
	
	// PostTable Event Listeners
	
	tableView.addEventListener('scroll',function(e)
	{
		var offset = e.contentOffset.y;
		if (offset < -65.0 && !tableView.pulling && !tableView.reloading)
		{
			tableView.pulling = true;
			tableView.updateLabelText("Release to refresh...");
		}
		else if((offset > -65.0 && offset < 0 ) && tableView.pulling && !tableView.reloading)
		{
			tableView.pulling = false;
			tableView.updateLabelText("Pull down to refresh...");
		}    
	});
	
	tableView.addEventListener('dragEnd', function()
	{	
		if(tableView.pulling && !tableView.reloading)
		{
			tableView.reloading = true;
			tableView.pulling = false;
			tableView.showActInd();
			tableView.setContentInsets({top:60},{animated:true});
			tableView.scrollToTop(-60,true);
			beginReloading();
		}
	});
	
	function beginReloading() {
		// just mock out the reload
		refreshRSS();
		endReloading();
	}
	function endReloading() {
		tableView.setContentInsets({top:60},{animated:true});
		tableView.reloading = false;
		tableView.updateLabelText("Refreshing...");
		setTimeout(resetTable,700);
	}
	function resetTable() { 
		tableView.setContentInsets({top:0},{animated:true});
		tableView.updateDateText("Last Updated: "+ formatDate());
		tableView.hideActInd();
		tableView.updateLabelText("Pull down to refresh...");
	}


	function refreshRssTable() {
		var rows = [];
	
		var row = new HomeImageSlider();
		rows.push(row);
	//----------------------------------------------------------------------------------------	
		var introLabel = Ti.UI.createLabel({
			text: "No matter how many years or miles may separate you from the campus, the UI Alumni Association can help you feel part of the life of the University of Iowa.",
			width: 300,
			top: 10,
			left: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
		});
		
		var row = Ti.UI.createTableViewRow();
		
		row.add(introLabel);
		rows.push(row);
	//-----------------------------------------------------------------------------------------	
		var events = new GetFeed ('http://iowalum.com/mobile-app/root_events_feed.cfm');
		
		if(events.length != null){
			var eventHeaderLabel = Ti.UI.createLabel({
				text: "Today Events",
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			row.add(eventHeaderLabel);
			
			rows.push(row);
			
			var events = new GetFeed ('http://iowalum.com/mobile-app/root_events_feed.cfm');
			for (var i = 0; i < events.length; i++) {
				var row = new SingleRow (events[0]);
				
				rows.push(row);
			}
		}
	//-----------------------------------------------------------------------------------------
		var magazineHeaderLabel = Ti.UI.createLabel({
			text: "Article of the Day",
			width: 300,
			top: 10,
			left: 10,
			font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(magazineHeaderLabel);
		
		rows.push(row);
	
		
		var row = new HomeMagazineSection();
		
		rows.push(row);
	//----------------------------------------------------------------------------	
		var iowaInsiderLabel = Ti.UI.createLabel({
			text: "Iowa Insider",
			width: 300,
			top: 10,
			left: 10,
			font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		
		var row = Ti.UI.createTableViewRow();
		
		row.add(iowaInsiderLabel);
		rows.push(row);
	
		var row = new HomeInsiderSection();
		rows.push(row);
	
		
		var row = new HomeSMSection();
		
		rows.push(row);
		
		tableView.setData(rows);
		self.add(tableView);
	}
	
	function refreshRSS() {	
		refreshRssTable();

	}

	// load initial rss feed
	refreshRSS();
	
	var currentAd = new GetFeed("http://iowalum.com/mobile-app/feed_xml.cfm");
	
	var ad = Ti.UI.createImageView({
	  image:    currentAd[0].staticAd,
	  width: 320,
	  height: 70,
	  top: 392,
	  left: 0
	  
	});
	ad.addEventListener('click', function(e) {
		new WebView (currentAd[0].staticAdUrl);
	}); 
	self.add(ad);



	return self;

}

function formatDate()
{
	var date = new Date();
	var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
	if (date.getHours()>=12)
	{
		datestr+=' '+(date.getHours()==12 ? date.getHours() : date.getHours()-12)+':'+date.getMinutes()+' PM';
	}
	else
	{
		datestr+=' '+date.getHours()+':'+date.getMinutes()+' AM';
	}
	return datestr;
}

module.exports = RootWindow;