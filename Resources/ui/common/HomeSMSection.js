var WebView = require('ui/common/WebView');
var GetFeed = require('ui/common/GetFeed');


function HomeSMSection(){
	var socialMediaView = Ti.UI.createView({
			
			backgroundColor: 	'#e2e2e2',
			height:				36,
			width: 				300,
			left: 				10,
			top:				10,
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(socialMediaView);
		
	var facebookimage = Ti.UI.createImageView({
		  image:    'facebook.png',
		  top:    0,
		  left: 0,
		});
		
		facebookimage.addEventListener('click', function(e) {
			new WebView ('https://www.facebook.com/UIowaAlumni');
		}); 
		
		var twitterimage = Ti.UI.createImageView({
		  image:    'twitter.png',
		  top:    0,
		  left: 53.6
		});
		
		twitterimage.addEventListener('click', function(e) {
			new WebView ('https://twitter.com/uiowaAlumni');
		}); 
		
		var instagramimage = Ti.UI.createImageView({
		  image:    'instagram.png',
		  top:    0,
		  left: 107.2
		});
		
		instagramimage.addEventListener('click', function(e) {
			new WebView ('http://instagram.com/uiowaalumni');
		}); 
		
		var linkedInimage = Ti.UI.createImageView({
		  image:    'linkedin.png',
		  top:    0,
		  left: 160.8
		});
		
		linkedInimage.addEventListener('click', function(e) {
			new WebView ('http://www.linkedin.com/groups?gid=1814071&trk=hb_side_g');
		}); 
		
		var foursquareimage = Ti.UI.createImageView({
		  image:    'fourquare.png',
		  top:   0,
		  left: 214.4
		});
		
		foursquareimage.addEventListener('click', function(e) {
			new WebView ('https://foursquare.com/uiowaalumni');
		}); 
		
		var pinterestimage = Ti.UI.createImageView({
		  image:    'pinterest.png',
		   top:    0,
		  left: 268
		});
		
		pinterestimage.addEventListener('click', function(e) {
			new WebView ('https://www.pinterest.com/uiowaalumni');
		}); 
		
		//Width (Images)
		pinterestimage.width =  foursquareimage.width = linkedInimage.width = instagramimage.width = twitterimage.width = facebookimage.width = 32;
		
		//Height (Images)
		pinterestimage.height =   foursquareimage.height =  linkedInimage.height = instagramimage.height = twitterimage.height = facebookimage.height = 32;
	//----------------------------------------------------------------------------------------------------------	 
		socialMediaView.add(facebookimage);
		socialMediaView.add(twitterimage);
		socialMediaView.add(instagramimage);
		socialMediaView.add(linkedInimage);
		socialMediaView.add(foursquareimage);
		socialMediaView.add(pinterestimage);
		
		return row;
}

module.exports = HomeSMSection;