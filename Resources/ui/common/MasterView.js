var Post = require('ui/common/Post'),
	FeatureRow = require('ui/common/FeatureRow'),
	Row = require('ui/common/Row'),
	PostGroup = require('ui/common/PostGroup'),
	PostTable = require('ui/common/PostTable'),
	RSS = require('services/rss');

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
		table.updateDateText("Last Updated: "+formatDate());
		table.hideActInd();
		table.updateLabelText("Pull down to refresh...");
	}


	function refreshRssTable(data) {
		if (Object.prototype.toString.apply(data) === '[object Array]') {
			var rows = [];
			var group = [];
			var featureSet = false;
			for (var i = 0; i < data.length; i++) {
				var post = new Post(data[i]);
				if(post.imageheight > 150 && featureSet == false) {
					var row = new FeatureRow(post);
					featureSet = true;
					row.addEventListener('click', function(e) {
						self.fireEvent('itemSelected', { link: e.row.link });
					});
					rows.push(row);
				}
				else {
					var row = new Row(post);
					row.addEventListener('click', function(e) {
						self.fireEvent('itemSelected', { link: e.row.link });
					});
					group.push(row);
				}
			}
			rows.push(new PostGroup(group));
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