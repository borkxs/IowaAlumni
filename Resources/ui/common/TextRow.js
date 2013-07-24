var DateObject = require('ui/common/DateObject');
var EditText = require('ui/common/EditText');
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

	var overlay = Ti.UI.createImageView({
		width: 300,
		height: 40,
		hires: true,
		top: 0,
		image: 'gold.png'
	});
	/*
	datelbl = getTitleLabel(post.title);
	container.add(datelbl);
	
	desclbl  = getDescriptionLabel(post.description);
	container.add(desclbl);
	*/
	container.add(overlay);
	datebl  = getpubDateLabel(post.pubDate);
	container.add(datebl);

	titlelbl = getTitleLabel(post.title);
	container.add(titlelbl);

	timebl  = timeLabel();
	container.add(timebl);

	inputtimebl  = getTime(post.snl);
	container.add(inputtimebl);

	inputplacebl  = getPlace(post.place);
	container.add(inputplacebl);

	placebl  = placeLabel();
	container.add(placebl);


	timebl.top = datebl.height + titlelbl.height + 15 ;
	inputtimebl.top = datebl.height + titlelbl.height + 15 ;
	placebl.top =  timebl.height + datebl.height + titlelbl.height + 15 ;
	inputplacebl.top =  placebl.top;


/*
	var posted = Ti.UI.createLabel({
		text: 			(new DateObject(post.pubDate)).prettyDate(),
		//text: 			post.pubDate,
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
	Posted.top = titlelbl.height + desclbl.height + 20;
	container.add(posted);
*/
	container.height = titlelbl.height + inputtimebl.height + inputplacebl.height + datebl.height + 35;
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
		top: 35,
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


/*
function getDescriptionLabel(description) {

	var text = Ti.UI.createLabel({
		text: description,
		left: 15,
		bottom: 10,
		
		top:0,
		height: 70,
		textAlign:'left',
		width: 200,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	//this.postheight += text.toImage().height;

	return text;

}
*/

function getpubDateLabel(pubDate) {

	var text = Ti.UI.createLabel({
		//text: (new DateObject(pubDate)).prettyDate(),
		text: pubDate,
		left: 15,
		top: 10,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#5c4e1a',
		shadowColor:'#f0d87f',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:12,fontWeight:'bold'}
	});

	return text;

}

function timeLabel (){

	var text = Ti.UI.createLabel({
		text: 'Time: ',
		left: 15,
		top: 0,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:12,fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}

function getTime (snl){

	var text = Ti.UI.createLabel({
		text: snl,
		left: 55,
		top: 0,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});

	return text;
}

function getPlace (place){

	var text = Ti.UI.createLabel({

		text: (new EditText (place)).adjustedText(),
		left: 55,
		bottom: 10,
		top:0,
		height: 20,
		textAlign:'left',
		width: 200,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});

	return text;
}


function placeLabel (){

	var text = Ti.UI.createLabel({
		text: 'Place: ',
		left: 15,
		top: 0,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:12,fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}


module.exports = TextRow;