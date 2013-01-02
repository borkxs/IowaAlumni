var Post = require('ui/common/Post'),
	DateObject = require('ui/common/DateObject'),
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
	
	var table = Ti.UI.createTableView({separatorColor: 'transparent'});
	self.add(table);
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', { link: e.row.link });
	});
	
	var border = Ti.UI.createView({
		backgroundColor:"#576c89",
		height:2,
		bottom:0
	});

	var tableHeader = Ti.UI.createView({
		backgroundColor:"#e2e7ed",
		width:320,
		height:60
	});

	// fake it til ya make it..  create a 2 pixel
	// bottom border
	tableHeader.add(border);

	var statusLabel = Ti.UI.createLabel({
		text:"Pull to reload",
		left:55,
		width:200,
		bottom:30,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:13,fontWeight:"bold"},
		shadowColor:"#999",
		shadowOffset:{x:0,y:1}
	});

	var lastUpdatedLabel = Ti.UI.createLabel({
		text:"Last Updated: "+formatDate(),
		left:55,
		width:200,
		bottom:15,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:12},
		shadowColor:"#999",
		shadowOffset:{x:0,y:1}
	});

	var actInd = Titanium.UI.createActivityIndicator({
		left:20,
		bottom:13,
		width:30,
		height:30
	});

	tableHeader.add(statusLabel);
	tableHeader.add(lastUpdatedLabel);
	tableHeader.add(actInd);

	table.headerPullView = tableHeader;


	var pulling = false;
	var reloading = false;

	function beginReloading() {
		// just mock out the reload
		setTimeout(endReloading,2000);
	}

	function endReloading() {
		// simulate loading
		for (var c=lastRow;c<lastRow+10;c++)
		{
			table.appendRow({title:"Row "+c});
		}
		lastRow += 10;

		// when you're done, just reset
		table.setContentInsets({top:0},{animated:true});
		reloading = false;
		lastUpdatedLabel.text = "Last Updated: "+formatDate();
		statusLabel.text = "Pull down to refresh...";
		actInd.hide();
		//arrow.show();
	}


	table.addEventListener('scroll',function(e) {
		var offset = e.contentOffset.y;
		if (offset <= -65.0 && !pulling)
		{
			//var t = Ti.UI.create2DMatrix();
			//t = t.rotate(-180);
			//pulling = true;
			//arrow.animate({transform:t,duration:180});
			statusLabel.text = "Release to refresh...";
		}
		else if (pulling && offset > -65.0 && offset < 0)
		{
			pulling = false;
			//var t = Ti.UI.create2DMatrix();
			//arrow.animate({transform:t,duration:180});
			statusLabel.text = "Pull down to refresh...";
		}
	});
	table.addEventListener('scrollEnd',function(e) {
		if (pulling && !reloading && e.contentOffset.y <= -65.0)
		{
			reloading = true;
			pulling = false;
			//arrow.hide();
			actInd.show();
			statusLabel.text = "Reloading...";
			table.setContentInsets({top:60},{animated:true});
			//arrow.transform=Ti.UI.create2DMatrix();
			beginReloading();
		}
	});
	
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
module.exports = MasterView;