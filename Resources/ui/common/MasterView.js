var Post = require('ui/common/Post'),
	FeatureRow = require('ui/common/FeatureRow'),
	Row = require('ui/common/Row'),
	TextRow = require('ui/common/TextRow'),
	SingleRow = require('ui/common/SingleRow'),
	HeaderRow = require('ui/common/HeaderRow'),
	IIBIntroRow = require('ui/common/IIBIntroRow'),
	IAMIntroRow = require('ui/common/IAMIntroRow'),
	PostGroup = require('ui/common/PostGroup'),
	PostTable = require('ui/common/PostTable'),
	Ad = require('ui/common/Ad'),
	GetFeed = require('ui/common/GetFeed'),
	RSS = require('services/rss');
	WebView = require('ui/common/WebView');

/* 
 * Master View Component Constructor
 */

function MasterView(feed) {
	
	var minheight = 200;

	var rssfeed = new RSS(feed);
	

	var self = Ti.UI.createView({
		backgroundColor:'#fff'
	});

	var table = new PostTable();

	// PostTable Event Listeners
	
	table.addEventListener('scroll',function(e)
	{
		var offset = e.contentOffset.y;
		if (offset < -65.0 && !table.pulling && !table.eloading)
		{
			table.pulling = true;
			table.updateLabelText("Release to refresh...");
		}
		else if((offset > -65.0 && offset < 0 ) && table.pulling && !table.reloading)
		{
			table.pulling = false;
			table.updateLabelText("Pull down to refresh...");
		}    
	});
	table.addEventListener('dragEnd', function()
	{	
		if(table.pulling && !table.reloading)
		{
			table.reloading = true;
			table.pulling = false;
			table.showActInd();
			table.setContentInsets({top:60},{animated:true});
			table.scrollToTop(-60,true);
			beginReloading();
		}
	});

	
	
	
	
	function beginReloading() {
		// just mock out the reload
		refreshRSS();
		endReloading();
	}
	function endReloading() {
		table.setContentInsets({top:60},{animated:true});
		table.reloading = false;
		table.updateLabelText("Refreshing...");
		setTimeout(resetTable,700);
	}
	function resetTable() { 
		table.setContentInsets({top:0},{animated:true});
		table.updateDateText("Last Updated: "+ formatDate());
		table.hideActInd();
		table.updateLabelText("Pull down to refresh...");
	}


	function refreshRssTable(data) {
		if (Object.prototype.toString.apply(data) === '[object Array]') {
			var rows = [];
			var group = [];
			var featureSet = false;
			var groupCount = 0;
			//Ti.API.log('error', data);
			var Counter = 0;
			var headerCounter = 0;
			var adIndex = 0;
			var adEIndex = 0;
			var ads = new GetFeed('http://iowalum.com/advertising/feed_xml.cfm');
			//Ti.API.info( ads);
			var tempDate = "";
			for (var i = 0; i < data.length; i++) {
				var post = new Post(data[i]);
				
				if (i == 0 && feed == 'http://iowalum.com/blog/?feed=rss2'){
						
						var row = new IIBIntroRow();
						rows.push(row);
					}
				
				if (i == 0 && feed == 'http://iowalum.com/magazine/feed_xml.cfm'){
						
						var row = new IAMIntroRow();
						rows.push(row);
					}
				
				if (Counter != 0 && (Counter % 3) == 0 && adIndex < 3 && feed == 'http://iowalum.com/blog/?feed=rss2'){
					var the_Ad = (ads[adIndex + 3].ad).replace("#", "");
					the_Ad = (the_Ad).replace("#", "");
					var row = new Ad(the_Ad, adIndex + 3);
					
					//Ti.API.info(the_Link);
					row.addEventListener('click', function(e) {
						
						var the_Link = (ads[e.row.linkIndex].link).replace("#", "");
						the_Link = (the_Link).replace("#", "");
						new WebView (the_Link );
					});
					rows.push(row);
					adIndex++;
				}
				
				if (Counter != 0 && (Counter % 3) == 0 && adIndex < 3 && feed == 'http://iowalum.com/magazine/feed_xml.cfm'){
					var the_Ad = (ads[adIndex + 6].ad).replace("#", "");
					the_Ad = (the_Ad).replace("#", "");
					var row = new Ad(the_Ad, adIndex + 6);
					
					//Ti.API.info(the_Link);
					row.addEventListener('click', function(e) {
						
						var the_Link = (ads[e.row.linkIndex].link).replace("#", "");
						the_Link = (the_Link).replace("#", "");
						new WebView (the_Link );
					});
					rows.push(row);
					adIndex++;
				}
				
				
				
				if(post.imageheight != null && post.imageheight > 150 && post.imageheight < 300 && featureSet == false) {
					
					var row = new FeatureRow(post);
					featureSet = true;
					row.addEventListener('click', function(e) {
						
						new WebView (e.row.link);
					});
					row.addEventListener('swipe', function(e){
				 		self.fireEvent('swipeToggle');
					});
					rows.push(row);
				}
				else if (feed == 'http://iowalum.com/calendar/feed_xml.cfm'){
					if ((Counter == 0) ||(tempDate != post.pubDate && Counter != 0)){
						var header = new HeaderRow(post);
						
						if (headerCounter != 0 && (headerCounter % 3) == 0 && adEIndex < 3 ){
							
							var the_Ad = (ads[adEIndex].ad).replace("#", "");
							the_Ad = (the_Ad).replace("#", "");
							var row = new Ad(the_Ad, adEIndex);
							
				
							row.addEventListener('click', function(e) {

								var the_Link = (ads[e.row.linkIndex].link).replace("#", "");
								the_Link = (the_Link).replace("#", "");
								new WebView (ads[e.row.linkIndex].link);
								
							});
							rows.push(row);
							adEIndex++;
							if (adEIndex == 3){
								adEIndex = 0;
							} 
						}
						rows.push(header);
						headerCounter++;
					}
					var row = new SingleRow(post);
					
					rows.push(row);
				}
				else {
					var row = (post.imageheight!=null) ? new Row(post) : new TextRow(post);
					
					row.addEventListener('click', function(e) {
						
						new WebView (e.row.link);
					});
					if(groupCount >= 1) {
						group.push(row);
						rows.push(new PostGroup(group));
						group = [];
						groupCount = 0;
						
						featureSet = false;
					}
					else {
						group.push(row);
						groupCount++;
					}
				}
				Counter++;
				tempDate = post.pubDate;
			}
			
			
			
			table.setData(rows);
			
			
			
		}
		
	}
	function refreshRSS() {
		
		 rssfeed.loadRssFeed({
			success: function(data) {
	    		refreshRssTable(data);
	    				
	    }
		});
		
	}

	// load initial rss feed
	refreshRSS();
	table.bottom = 70;
	self.add(table);
	
	
	var currentAd = new GetFeed("http://iowalum.com/mobile-app/feed_xml.cfm");
	
	var ad = Ti.UI.createImageView({
	  image:    currentAd[0].staticAd,
	  width: 320,
	  height: 70,
	  top: 350,
	  left: 0
	  
	});
	ad.addEventListener('click', function(e) {
		new WebView (currentAd[0].staticAdUrl);
	}); 
	self.add(ad);

	return self;
}

module.exports = MasterView;

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