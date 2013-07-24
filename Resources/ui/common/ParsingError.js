var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
/*
 * Post Object
 * Essential attributes
 */

function ParsingError() {
	
	this.containerheight = 0;

    var row = Ti.UI.createTableViewRow({
		//hasChild:true,
		height: 55,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'e2e2e2',
		borderRadius: 0.5
	});
	

	var container =  Titanium.UI.createView({
		backgroundColor: 'transparent',
			height:			50,
			width: 			300,
			left: 			10,
			top:			0,
			bottom:			0,
			padding:		0,
			borderRadius:	5
		
	});

	

	var pageError = Ti.UI.createLabel({
		text: "Privacy Policy",
		textAlign: 'left',
	    left: 10,
		font: {fontFamily:'Helvetica',fontSize:12,fontWeight:'normal'}
	});
	container.add(pageError);
	

	row.add(container);
	
	return row;

}



function getContainerHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 300,
		height: 60,
		hires: true,
		//top: -10, // this works for some reason
	});
    //cachedImageView('imageDirectoryName', img, tempimagebox);
    
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = height / width;

	return Math.floor( 300 * ratio );
}

module.exports = ParsingError;
