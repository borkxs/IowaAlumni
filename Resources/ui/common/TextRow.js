var DateObject = require('ui/common/DateObject');
/*
 * Post Object
 * Essential attributes
 */

function TextRow(post) {

    this.postheight		= 0;

    var row = Ti.UI.createTableViewRow({
		hasChild: 			true,
		link: 				post.url,
		height: 			'auto',
		padding: 			0,
		top: 				0,
		bottom: 			0,
		layout: 			'vertical',
		backgroundColor: 	'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	var container =  Titanium.UI.createView({
		backgroundColor: 	'ffffff',
		height:				'auto',
		width: 				300,
		left: 				0,
		top:				0,
		bottom:				0,
		padding:			0
	});

	titlelbl = getTitleLabel(post.title);
	container.add(titlelbl);

	desclbl  = getDescriptionLabel(post.description);
	container.add(desclbl);
	desclbl.top = titlelbl.height + 15;

	var posted = Ti.UI.createLabel({
		text: 			(new DateObject(post.pubDate)).prettyDate(),
		left: 			15,
		bottom: 		10,
		height: 		15,
		textAlign: 		'left',
		width: 			270,
		color: 			'#616161',
		shadowColor: 	'#ffffff',
        shadowOpacity: 	0.5,
        shadowOffset: 	{x:0, y:1},
		font: 			{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	posted.top = titlelbl.height + desclbl.height + 20;
	container.add(posted);

	container.height = titlelbl.height + desclbl.height + posted.height + 35;
	row.height = container.height;

	/*
	var icon = Ti.UI.createImageView({
		top: 3,
		left: 280,
		width: 20,
		image:'clock1.png'
	});
	container.add(icon); */

	row.add(container);
	
	return row;
}

/*
 * Helper Functions
 */

function getContainerHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
	});
    cachedImageView('imageDirectoryName', img, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = height / width;

	return Math.floor( 300 * ratio );
}

function getTitleLabel(title) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width: 250,
		color:'#efc006',
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: 250,
		height:'auto'
	});
	view.add(temp);
	//Ti.API.info('[' + view.toImage().width + ' x ' + view.toImage().height + '][' + view.toImage().size + '] ' + title);

	var label = Ti.UI.createLabel({
		text: title,
		left: 15,
		top: 15,
		bottom:10,
		height: view.toImage().height,
		textAlign:'left',
		width: 270,
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	});
	
	return label;

}

function getDescriptionLabel(description) {

	var text = Ti.UI.createLabel({
		text: description,
		left: 15,
		bottom: 10,
		top: 0,
		height: 70,
		textAlign:'left',
		width: 200,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}
 
module.exports = TextRow;
