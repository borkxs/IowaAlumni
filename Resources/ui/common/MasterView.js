var Post = require('ui/common/Post'),
	PostTable = require('ui/common/PostTable');

/* 
 * Master View Component Constructor
 */
function MasterView() {

	/*
	 * Container View
	 */
	var self = Ti.UI.createView({
		backgroundColor:'#fff'
	});
	
	/*
	 * PostTable
	 */
	var table = (new PostTable(self)).table;
	self.add(table);
	
	function refreshRSS() {
		rss.loadRssFeed({
			success: function(data) {
	    		masterView.refreshRssTable(data);
	    	}
		});
	}
	
	/*
	 * Populate PostTable with Post objects
	 */
	self.refreshRssTable = function(data) {
		if (Object.prototype.toString.apply(data) === '[object Array]') {
			var rows = [];
			for (var i = 0; i < data.length; i++) {
				rows.push((new Post(data[i])).featureRow());
			}
			table.setData(rows);
		}
	};

	return self;
}

module.exports = MasterView;