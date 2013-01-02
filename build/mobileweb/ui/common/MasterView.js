var Post = require('ui/common/Post'),
	DateObject = require('ui/common/DateObject'),
	Description = require('ui/common/Description')

var createRssRow = function(item) {

	var desc 		= new Description(item.description);
	description 	= desc.getDescription();

	var imageurlstr = desc.getImage();	
			
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
	
	var table = Ti.UI.createTableView({separatorColor: 'transparent', backgroundColor: 'efc006'});
	self.add(table);
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', { link: e.row.link });
	});
	
	self.refreshRssTable = function(data) {
		if (Object.prototype.toString.apply(data) === '[object Array]') {
			var rows = [];
			for (var i = 0; i < data.length; i++) {
				rows.push(createRssRow(data[i]));
				Ti.API.info(i + ' : ' + data[i].title);
			}
			table.setData(rows);
		}
	};

	return self;
}
module.exports = MasterView;