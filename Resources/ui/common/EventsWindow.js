var Post = require('ui/common/Post'),
	FeatureRow = require('ui/common/FeatureRow'),
	Row = require('ui/common/Row'),
	SingleRow = require('ui/common/SingleRow'),
	HeaderRow = require('ui/common/HeaderRow'),
	IIBIntroRow = require('ui/common/IIBIntroRow'),
	IAMIntroRow = require('ui/common/IAMIntroRow'),
	PostGroup = require('ui/common/PostGroup'),
	PostTable = require('ui/common/PostTable'),
	Ad = require('ui/common/Ad'),
	GetFeed = require('ui/common/GetFeed'),
	FormatDate = require('ui/common/FormatDate'),
	RSS = require('services/rss');
	WebView = require('ui/common/WebView'),
	StaticAd = require('ui/common/StaticAd'),
 	NavigateWindow = require('ui/common/NavigateWindow'),
	StaticAd = require('ui/common/StaticAd');


function EventsWindow(events, title){
	
	var self = new NavigateWindow(title);
	
	
		var tableView = new PostTable();
	tableView.top = 43;
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
		tableView.updateDateText("Last Updated: "+ (new FormatDate()).getDate());
		tableView.hideActInd();
		tableView.updateLabelText("Pull down to refresh...");
	}


	function refreshRssTable() {
		
	
		var rows = [];
		var Counter = 0;
		var headerCounter = 0;
		var adIndex = 0;
		var ads = new GetFeed('http://iowalum.com/advertising/feed_xml.cfm');
		var tempDate = "";
		for (var i = 0; i < events.length; i++) {
			var post = new Post(events[i]);

			if ((Counter == 0) ||(tempDate != post.pubDate && Counter != 0)){
					var header = new HeaderRow(post);
						
					if (headerCounter != 0 && (headerCounter % 3) == 0 && adIndex < 3 ){
						var row = new Ad(ads[adIndex]);
						rows.push(row);
						adIndex++;
						if (adIndex == 3){
							adIndex = 0;
						} 
					}
					rows.push(header);
					headerCounter++;
				}
					var row = new SingleRow(post);
					
					rows.push(row);
				
				
				
				Counter++;
				tempDate = post.pubDate;
				
		}
	
		tableView.setData(rows);
		self.add(tableView);
	}
	
	function refreshRSS() {	
		refreshRssTable();

	}

	// load initial rss feed
	refreshRSS();

	var ad = new StaticAd(15,392);
	
	self.add(ad);

	return self;

}




module.exports = EventsWindow;