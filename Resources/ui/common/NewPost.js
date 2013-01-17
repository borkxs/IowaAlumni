/*
 * Post Object
 * Essential attributes
 */

function FeatureRow(post) {

	this.containerheight = 0;

    var row = Ti.UI.createTableViewRow({
		hasChild:true,
		link: this.url,
		height: 355,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'e2e2e2',
		borderRadius: 0.5
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	var container =  Titanium.UI.createView({
		backgroundColor: 'transparent',
			height:			300,
			width: 			300,
			left: 			10,
			top:			10,
			bottom:			0,
			padding:		0,
			borderRadius:	5
			//borderColor: 	'#d5d5d5',
			//borderWidth: 	2
	});

	//cacheImage(this.image);
	this.containerheight = getContainerHeight(post.image);
	//Ti.API.info(this.containerheight);
	container.height 	 = this.containerheight + 65;
	row.height 			 = this.containerheight + 105;

	var imagebox = Ti.UI.createImageView({
		width: 300,
		height: this.containerheight,
		hires: true,
		top: 0
		//top: -10, // this works for some reason
		//url: this.image
	});
	cachedImageView('imageDirectoryName', post.image, imagebox);
	var overlay = Ti.UI.createImageView({
		width: 300,
		height: 40,
		hires: true,
		top: 0,
		image: 'gold.png'
	});
	var shadow = Ti.UI.createImageView({
		width: 300,
		height: 150,
		hires: true,
		top: this.containerheight-150,
		image: 'shadow.png'
	});
	container.add(imagebox);
	container.add(shadow);
	container.add(overlay);
	
	titlelbl = getTitleLabel(post.title,this.containerheight);
	container.add(titlelbl);

	desclbl  = getDescriptionLabel(post.description,this.containerheight);
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
		text: 			post.timestring,
		top: 			7,
		left: 			15,
		textAlign: 		'left',
		width: 			200,
		color: 			'#222222',
		shadowColor: 	'#f0da72',
		shadowOffset:   {x:0,y:1},
		font: 			{fontFamily:'HelveticaNeue-CondensedBold',fontSize:13,fontWeight:'bold'}
	});
	container.add(date);

	row.add(container);

	var posted = Ti.UI.createLabel({
		text: 'Posted 2 hours ago in Kudos to Iowa People',
		top: 7,
		left: 25,
		bottom: 10,
		height: 15,
		textAlign:'left',
		width: 270,
		color:'#616161',
		shadowColor:'#ffffff',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	row.add(posted);
	
	return row;

}



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

function getTitleLabel(title,postheight) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width: 250,
		color:'#efc006',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: 250,
		height:'auto'
	});
	view.add(temp);
	theheight = view.toImage().height;
	//Ti.API.info('[' + view.toImage().width + ' x ' + view.toImage().height + '][' + view.toImage().size + '] ' + title);

	var titlelbl = Ti.UI.createLabel({
		text: title,
		left: 15,
		bottom:10,
		height:theheight,
		textAlign:'left',
		width: 250,
		color:'#efc006',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});
	
	titlelbl.top = postheight - theheight - 5;
	
	return titlelbl;

}

function getDescriptionLabel(description,postheight) {

	var view = Ti.UI.createView({
		backgroundColor: '#0c0c0c',
		backgroundImage: 'dark.jpg',
		width: 300,
		height: 65,
		top: postheight
	});

	var text = Ti.UI.createLabel({
		text: description,
		left: 15,
		top: 0,
		bottom: 10,
		height: 55,
		textAlign:'left',
		width: 260,
		color:'#ffffff',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
	});
	view.add(text);

	return view;

}

/* 
	Developed by Kevin L. Hopkins (http://kevin.h-pk-ns.com)
	You may borrow, steal, use this in any way you feel necessary but please
	leave attribution to me as the source.  If you feel especially grateful,
	give me a linkback from your blog, a shoutout @Devneck on Twitter, or 
	my company profile @ http://wearefound.com.

/* Expects parameters of the directory name you wish to save it under, the url of the remote image, 
   and the Image View Object its being assigned to. */
cachedImageView = function(imageDirectoryName, url, imageViewObject)
{
	// Grab the filename
	var filename = url.split('/');
	filename = filename[filename.length - 1];
	// Try and get the file that has been previously cached
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);
	
	if (file.exists()) {
		// If it has been cached, assign the local asset path to the image view object.
		imageViewObject.image = file.nativePath;
		//To release memory
		file = null;
	} else {
		// If it hasn't been cached, grab the directory it will be stored in.
		var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
		if (!g.exists()) {
			// If the directory doesn't exist, make it
			g.createDirectory();
		};
		
		// Create the HTTP client to download the asset.
		var xhr = Ti.Network.createHTTPClient();
		
		xhr.onload = function() {
			if (xhr.status == 200) {
				// On successful load, take that image file we tried to grab before and 
				// save the remote image data to it.
				file.write(xhr.responseData);
				// Assign the local asset path to the image view object.
				imageViewObject.image = file.nativePath;
				//To release memory
				file = null;
			};
		};
		
		// Issuing a GET request to the remote URL
		xhr.open('GET', url);
		// Finally, sending the request out.
		xhr.send();
	};
};
 
module.exports = Post;
