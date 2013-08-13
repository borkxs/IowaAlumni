var GetFeed = require('ui/common/GetFeed');
var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');

function HomeInsiderSection(){
	var table = Ti.UI.createTableView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				'auto',
		width: 				300,
		left: 				10,
		top:				10,
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1,
		scrollable: 		false
	});

	 var rowText = Ti.UI.createTableViewRow({
	        height: 100
	    });

	 rowText.addEventListener('click', function(e) {
			//new WebView (post.url);
	 });
	 
	 table.height = rowText.height;
	var data = [];
	 data.push(rowText);
	table.setData(data);

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: table.height+15,
		padding: 0,
		top: 0,
		bottom: 0,
		//link: 				post.url,
		layout: 'vertical',
		selectionStyle: 'none',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	row.add(table);
	 
	/*
	var iowaInsiderView = Ti.UI.createView({
			separatorColor: 	'd5d5d5',
			backgroundColor: 	'ffffff',
			height:				100,
			width: 				300,
			left: 				10,
			top:				10,
			bottom:				0,
			padding:			0,
			borderRadius:		5,
			borderColor: 		'#d5d5d5',
			borderWidth: 		1
		});
		
		
		var row = Ti.UI.createTableViewRow();
		row.add(iowaInsiderView);
		
		
		row.selectionStyle ='none';
		*/
		return row;
}

module.exports = HomeInsiderSection;