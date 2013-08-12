var GetFeed = require('ui/common/GetFeed');
var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');

function HomeInsiderSection(){
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
		
		row.selectedColor = 'blue';
		
		return row;
}

module.exports = HomeInsiderSection;