
/*
 * Post Object
 * Essential attributes
 */

function Post(title,description,timestring,image,url) {
    this.title = title;
    this.description = description;
    this.timestring = timestring;
    this.image = image;
    this.url = url;
}


// Refactor featureRow and thumbRow to 
// Row with various subtypes

Post.prototype.row = function() {



}

Post.prototype.featureRow = function() {
	
	var row = Ti.UI.createTableViewRow({
		hasChild:true,
		link: this.url,
		height: 250,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'efc006'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;
	
	var container =  Titanium.UI.createView({
		backgroundColor: 'transparent',
			height:			250,
			width: 			320,
			left: 			0,
			top:			0,
			bottom:			0,
			padding:		0,
			borderRadius:	0
	});
	var tempimagebox = Ti.UI.createImageView({
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
		image: this.image
	});
	aheight = tempimagebox.toImage().height;
	dawidth = tempimagebox.toImage().width;
	//Ti.API.info( '[' + dawidth + ' x ' + aheight + '] ' + this.image );
	daheight = (dawidth>320) ? (Math.floor((320 / dawidth) * aheight)) : (Math.floor(dawidth / 320) * aheight) ;
	container.height = daheight;
	row.height=daheight;
	//Ti.API.info( '[' + dawidth + ' x ' + daheight + '] ' + this.image );
	
	var imagebox = Ti.UI.createImageView({
		width: 320,
		height: daheight,
		hires: true,
		//top: -10, // this works for some reason
		image: this.image
	});
	var overlay = Ti.UI.createImageView({
		width: 320,
		height: 36,
		hires: true,
		top: 0,
		image: 'goldover.png'
	});
	var shadow = Ti.UI.createImageView({
		width: 320,
		height: 165,
		hires: true,
		top: daheight-165,
		image: 'overshadow.png'
	});
	//container.add(imagebox);
	//container.add(overlay);
	//container.add(shadow);
	
	titlelbl = getTitleLabel(this.title,daheight);
	container.add(titlelbl);
	
	desclbl  = getDescriptionLabel(this.description,daheight);
	container.add(desclbl);

	/*
	var icon = Ti.UI.createImageView({
		top: 3,
		left: 280,
		width: 20,
		image:'clock1.png'
	});
	container.add(icon); */

	var date = Ti.UI.createLabel({
		text: this.timestring,
		top: 5,
		left:10,
		textAlign:'left',
		width:200,
		color:'#222222',
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:14,fontWeight:'bold'}
	});
	container.add(date);

	row.add(container);
	
	return row;
	
};

Post.prototype.thumbRow = function() {
	
	var row = Ti.UI.createTableViewRow({
		hasChild:true,
		link: this.url,
		height: 165,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'ffffff'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;
	
	var container =  Titanium.UI.createView({
		backgroundColor: 'transparent',
			height:			165,
			width: 			320,
			left: 			0,
			top:			0,
			bottom:			0,
			padding:		0,
			borderRadius:	0
	});
	var imagebox = Ti.UI.createImageView({
		width: 160,
		hires: true,
		top: 0,
		image: this.image
	});
	var overlay = Ti.UI.createImageView({
		width: 320,
		height: 165,
		hires: true,
		top: 0,
		image: 'over2.png'
	});
	var arr = Ti.UI.createImageView({
		width: 15,
		height: 27,
		hires: true,
		left: 300,
		image: 'blackarr.png'
	});
	//container.add(imagebox);
	container.add(overlay);
	container.add(arr);
	
	var titlelbl = Ti.UI.createLabel({
		text: this.title,
		left: 10,
		top: 50,
		bottom:10,
		height:'auto',
		textAlign:'left',
		width: 270,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});

	
	
	var text = Ti.UI.createLabel({
		text: this.description,
		left: 10,
		//top: 'auto',	
		bottom: 10,
		height: 55,
		textAlign:'left',
		width: 270,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
	});
	
	var title_height = titlelbl.toImage().size;
	//Ti.API.info(title_height + ' : ' + Math.floor(title_height / 270));
	title_height = Math.floor(title_height / 270);
	
	if (title_height > 60) {
		text.top = 150;
		row.height = 225;
		container.height = 225;
		arr.top = 112;
	}
	else if (title_height > 30) {
		text.top = 120;
		row.height = 195;
		container.height = 195;
		arr.top = 97;
	}
	else {
		text.top = 90;
		row.height = 165;
		container.height = 165;
		arr.top = 82;
	}
	
	container.add(titlelbl);
	container.add(text);

	/*
	var icon = Ti.UI.createImageView({
		top: 3,
		left: 280,
		width: 20,
		image:'clock1.png'
	});
	container.add(icon); */

	var date = Ti.UI.createLabel({
		text: this.timestring,
		top: 5,
		left:10,
		textAlign:'left',
		width:200,
		color:'#222222',
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:14,fontWeight:'bold'}
	});
	container.add(date);

	row.add(container);
	
	return row;
	
};



function getTitleLabel(title,postheight) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width: 270,
		color:'#efc006',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: 270,
		height:'auto'
	})
	view.add(temp);
	theheight = view.toImage().height;
	//Ti.API.info('[' + view.toImage().width + ' x ' + view.toImage().height + '][' + view.toImage().size + '] ' + title);

	var titlelbl = Ti.UI.createLabel({
		text: title,
		left: 10,
		top: 140,
		bottom:10,
		height:theheight,
		textAlign:'left',
		width: 270,
		color:'#efc006',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});
	
	titlelbl.top = postheight - theheight - 65 - (7 * (theheight / 32));
	
	return titlelbl;

}

function getDescriptionLabel(description,postheight) {

	var text = Ti.UI.createLabel({
		text: description,
		left: 10,
		bottom: 10,
		height: 55,
		textAlign:'left',
		width: 270,
		color:'#ffffff',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
	});
	
	text.top = postheight - 70;

	return text;

}
 
module.exports = Post;
