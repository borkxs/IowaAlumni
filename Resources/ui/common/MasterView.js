var Post = require('ui/common/Post'),
	DateObject = require('ui/common/DateObject'),
	PostTable = require('ui/common/PostTable'),
	Description = require('ui/common/Description');

var createRssRow = function(item) {

	/* 
	*  Replace this with 
	*  var post = new Post(item);
	*  var row  = new Row(Post);
	*/

	var desc 		= new Description(item.description);
	description 	= desc.getDescription();
	//Ti.API.info(description);
	var imageurlstr = desc.getImage();
	Ti.API.info(imageurlstr);
			
	var date 		= new DateObject(item.pubDate);
	var time 		= date.dateString();
	var post 		= new Post(item.title,description,time,imageurlstr,item.link);
	var row 		= post.featureRow();
	return row;
};

//Master View Component Constructor
function MasterView() {
	var self = Ti.UI.createView({
		backgroundColor:'#fff'
	});
	
	var table = (new PostTable(self)).table;
	self.add(table);
	
	function refreshRSS() {
		rss.loadRssFeed({
			success: function(data) {
	    		masterView.refreshRssTable(data);
	    	}
		});
	}
	
	self.refreshRssTable = function(data) {
		if (Object.prototype.toString.apply(data) === '[object Array]') {
			var rows = [];
			for (var i = 0; i < data.length; i++) {
				rows.push(createRssRow(data[i]));
			}
			table.setData(rows);
		}
	};

	return self;
}

module.exports = MasterView;