var Post = require('ui/common/Post'),
	FeatureRow = require('ui/common/FeatureRow'),
	Row = require('ui/common/Row'),
	TextRow = require('ui/common/TextRow'),
	PostGroup = require('ui/common/PostGroup'),
	PostTable = require('ui/common/PostTable'),
	Ad = require('ui/common/Ad'),
	GetFeed = require('ui/common/GetFeed'),
	FormatDate = require('ui/common/FormatDate'),
	RSS = require('services/rss');
	ParsingError = require('ui/common//ParsingError');

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

	/*
	 * PostTable Event Listeners
	 
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', { link: e.row.link });
	});
	*/
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

	self.addEventListener('swipe', function(e){
		self.fireEvent('menuClick');
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
			var adCounter = 0;
			var adIndex = 0;
			var ads = new GetFeed('http://iowalum.com/advertising/feed_xml.cfm');
			//Ti.API.info( ads);
			for (var i = 0; i < data.length; i++) {
				var post = new Post(data[i]);
				
				if (adCounter != 0 && (adCounter % 3) == 0 && adIndex < 3){
					var the_Ad = (ads[adIndex].ad).replace("#", "");
					the_Ad = (the_Ad).replace("#", "");
					var row = new Ad(the_Ad, adIndex);
					
					//Ti.API.info(the_Link);
					row.addEventListener('click', function(e) {
						
						var the_Link = (ads[e.row.linkIndex].link).replace("#", "");
						the_Link = (the_Link).replace("#", "");
						
						self.fireEvent('itemSelected', { link: the_Link });
					});
					rows.push(row);
					adIndex++;
				}
				adCounter++;
				
				// FeatureRow
				/*
				PostGroup(FeaturePost())
				PostGroup(Post(),Post(),Post())
				*/
				if(post.imageheight != null && post.imageheight > 150 && post.imageheight < 300 && featureSet == false) {
					var row = new FeatureRow(post);
					featureSet = true;
					row.addEventListener('click', function(e) {
						self.fireEvent('itemSelected', { link: e.row.link });
					});
					row.addEventListener('swipe', function(e){
				 		self.fireEvent('swipeToggle');
					});
					rows.push(row);
				}
				else {
					var row = (post.imageheight!=null) ? new Row(post) : new TextRow(post);
					
					row.addEventListener('click', function(e) {
						self.fireEvent('itemSelected', { link: e.row.link });
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
			}
			
			//Ti.API.info( new GetAd().theAd());
			//var post = new Post(new GetAd().theAd());
			
			
			table.setData(rows);
			
			
			
		}
		
	}
	function refreshRSS() {
		var t = 0;
		 rssfeed.loadRssFeed({
			success: function(data) {
	    		t = refreshRssTable(data);
	    		
	    }
		});
		
	/*	
	 if (1 < 2){
			self.add(table);
			
		}
		
		else{
			var pageError = Ti.UI.createLabel({
				text: "Sorry, This section of UIAA Moblie Application is currently. Try again in a few minutes. ",
				textAlign: 'left',
			    left: 10,
			    top: 10,
				font: {fontFamily:'Helvetica',fontSize:12,fontWeight:'normal'}
			});
			self.add(pageError);
		}
		*/
	}

	// load initial rss feed
	refreshRSS();
	self.add(table);

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