var DateObject = require('ui/common/DateObject'),
	Description = require('ui/common/Description');
/*
 * Post Object
 * Essential attributes
 */

/*
function Post(title,description,timestring,image,url) {
    this.title = title;
    this.description = description;
    this.timestring = timestring;
    this.image = image;
    this.url = url;
}*/

function Post(item) {
    this.title = item.title;
    this.description = (new Description(item.description)).getDescription();
    this.timestring = (new DateObject(item.pubDate)).dateString();
    this.image = (new Description(item.description)).getImage();
    this.url = item.link;
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
		//image: this.image,
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
	});
	
	var tempimagebox = Ti.UI.createImageView({
        width: 'auto',
        height: 'auto'
    });

    cachedImageView('imageDirectoryName', this.image, tempimagebox);
	
	aheight = tempimagebox.toImage().height;
	dawidth = tempimagebox.toImage().width;
	
	//Ti.API.info(awidth + ' ' + aheight);
	imgratio = dawidth / aheight;
	//Ti.API.info(imgratio);
	//Ti.API.info( '[' + dawidth + ' x ' + aheight + '] ' + this.image );
	daheight = (dawidth>320) ? (Math.floor((320 / dawidth) * aheight)) : (Math.floor(dawidth / 320) * aheight);
	//Ti.API.info(daheight);
	//min height
	if(daheight<200) {
		daheight = 200;
		dawidth = Math.floor(200 * imgratio);
	}
	else {
		dawidth = 320;
	}
	
	Ti.API.info(dawidth + ' ' + daheight);
	
	container.height = daheight;
	row.height=daheight;
	//Ti.API.info( '[' + dawidth + ' x ' + daheight + '] ' + this.image );
	
	var imagebox = Ti.UI.createImageView({
		width: dawidth,
		height: daheight,
		hires: true,
		//top: -10, // this works for some reason
		//url: this.image
	});
	cachedImageView('imageDirectoryName', this.image, imagebox);
	var overlay = Ti.UI.createImageView({
		width: 320,
		height: 36,
		hires: true,
		top: 0,
		image: 'goldover.png'
	});
	var shadow = Ti.UI.createImageView({
		width: 320,
		height: 200,
		hires: true,
		top: daheight-200,
		image: 'overshadow.png'
	});
	container.add(imagebox);
	container.add(overlay);
	container.add(shadow);
	
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
		shadowColor:'#f0da72',
		shadowOffset:{x:0,y:1},
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

	var date = Ti.UI.createLabel({
		text: 'this.title',
		top: 5,
		left:10,
		textAlign:'left',
		width:200,
		color:'#222222',
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:14,fontWeight:'bold'}
	});	

	row.add(date);
	Ti.API.info(this.title);
	
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
		//shadowColor:'#896e03',
        //shadowOpacity:0.5,
        //shadowOffset:{x:0, y:-1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});
	
	titlelbl.top = postheight - theheight - 70;
	
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
