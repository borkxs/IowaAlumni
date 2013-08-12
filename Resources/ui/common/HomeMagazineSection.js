var GetFeed = require('ui/common/GetFeed');
var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');

function HomeMagazineSection(){
	var magazineView = Ti.UI.createView({
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
		
		var article = new GetFeed ('http://iowalum.com/mobile-app/root_feed.cfm');
		
		var titleLabel = getTitleLabel(article[0].title);
		magazineView.add(titleLabel);
		
		var desclbl = getDescriptionLabel(article[0].description);
		magazineView.add(desclbl);
		
		desclbl.top = titleLabel.height + 10;
		magazineView.height = titleLabel.height + desclbl.height + 35;
		
		var posted = Ti.UI.createLabel({
			text: 			(new DateObject(article[0].pubDate)).prettyDate(),
			left: 			10,
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
		posted.top = titleLabel.height + desclbl.height + 10; 
		magazineView.add(posted);
		
		
		var imageContainer = Ti.UI.createView({
			width: 			60,
			height: 		60,
			right: 			15,
			top: 			titleLabel.height+20,
			borderRadius:	4,
			borderColor: 	'#d5d5d5',
			borderWidth: 	1
	
		});
		var postImage = getPostImage(article[0].image);
		new CachedImageView('imageDirectoryName', article[0].image, postImage);
		imageContainer.add(postImage);
		magazineView.add(imageContainer);
		
		var row = Ti.UI.createTableViewRow();
		row.add(magazineView);
		
		return row;
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
	

	var label = Ti.UI.createLabel({
		text: title,
		left: 10,
		top: 10,
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
		left: 10,
		bottom: 10,
		top: 0,
		height: 70,
		textAlign:'left',
		width: 200,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	

	return text;

}

function getPostImage(image) {
	var tempimagebox = Ti.UI.createImageView({
		image: image,
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
	});
    new CachedImageView('imageDirectoryName', image, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = width / height;

	var adjustedWidth = Math.floor(60 * ratio);

	var imagebox = Ti.UI.createImageView({
		image: this.image,
		hires: true,
		width: adjustedWidth,
		top: 0
	});

	return imagebox;
}

module.exports = HomeMagazineSection;