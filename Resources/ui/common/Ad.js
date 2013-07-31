var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
/*
 * Ad Object
 * Essential attributes
 */

function Ad(post, index) {
	
	this.containerheight = 0;

    var row = Ti.UI.createTableViewRow({
		hasChild:true,
		linkIndex: index,
		height: 55,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'e2e2e2',
		borderRadius: 0.5,
		selectionStyle: 'none'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	var container =  Titanium.UI.createView({
		backgroundColor: 'transparent',
			height:			300,
			width: 			300,
			left: 			10,
			top:			-5,
			bottom:			0,
			padding:		0,
			borderRadius:	5
	});


	this.containerheight = getContainerHeight(post);
	container.height 	 = this.containerheight;
	row.height 			 = 62;

	var imagebox = Ti.UI.createImageView({
		width: 300,
		height: 70,
		hires: true,
		top: 10
		
	});
	
	new CachedImageView('imageDirectoryName', post, imagebox);
	container.add(imagebox);
	

	row.add(container);
	
	return row;

}



function getContainerHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 300,
		height: 70,
		hires: true
	});
    
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = height / width;

	return Math.floor( 300 * ratio );
}

module.exports = Ad;
