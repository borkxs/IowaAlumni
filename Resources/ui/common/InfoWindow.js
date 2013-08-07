var ApplicationWindow = require('ui/common/ApplicationWindow');
var WebView = require('ui/common/WebView');
var GetFeed = require('ui/common/GetFeed');

function InfoWindow(title) {
	var self = new ApplicationWindow(title);

	//The Different Views
	var contactView = Ti.UI.createView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				160,
		width: 				300,
		left: 				10,
		top:				10,
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1
	});
	
	var socialMediaView = Ti.UI.createView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				160,
		width: 				300,
		left: 				10,
		top:				180,
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1
		
	});
		
	var scrollMainView = Ti.UI.createScrollView({
	  top: 45,
	  contentWidth: 320,
	  contentHeight: 420,
	  showVerticalScrollIndicator: false,
	  showHorizontalScrollIndicator: false
	});
	
	var currentAd =  new GetFeed ('http://iowalum.com/mobile-app/feed_xml.cfm');
	
	var ad = Ti.UI.createImageView({
	  image:    currentAd[0].contactUsAd,
	  width: 300,
	  height: 52,
	  top: 350,
	  left: 10
	  
	});
	ad.addEventListener('click', function(e) {
		new WebView (currentAd[0].contactUsUrl);
	}); 
	
	// The Contact View 
	var textCurrentTop = 0;
	
	var contactLabel = Ti.UI.createLabel({
		text: "Contact Us",
		top: 10
	});
	
	var levittLabel = Ti.UI.createLabel({
		text: "Levitt Center",
		top: 30
	});
	textCurrentTop = levittLabel.top;
	
	var levittline = Ti.UI.createView({
		width: 				67,
		top:				44			
		
	});
	
	levittLabel.addEventListener('click', function(e) {
		vistedLink (levittLabel, levittline, "purple" );
		new WebView ('http://www.iowalum.com/about/levitt.cfm');
	}); 
	
	
	var addressLabel = Ti.UI.createLabel({
		text: ("P.O. Box 1970").concat('\n').concat("Iowa City, IA 52244-1970"),
		top: textCurrentTop + 15
	});
	
	
	var phoneLabel = Ti.UI.createLabel({
		text: ("Phone: 319/335-3294").concat('\n').concat("Toll Free: 800/469-2586").concat('\n').concat("FAX: 319/335-1079"),
		top: 85
	});
	
	
	var emailLabel = Ti.UI.createLabel({
		text: "alumni@uiowa.edu",
		top: 128
	});
	
	var emailline = Ti.UI.createView({
		width: 				99,
		top:				142			
	});
	
	emailLabel.addEventListener('click', function(e) {
		vistedLink (emailLabel, emailline, "purple" );
		var emailDialog = Ti.UI.createEmailDialog()
		//emailDialog.subject = "Hello from Titanium";
		emailDialog.toRecipients = ['alumni@uiowa.edu'];
		//emailDialog.messageBody = '<b>Appcelerator Titanium Rocks!</b>';
		var f = Ti.Filesystem.getFile('cricket.wav');
		emailDialog.addAttachment(f);
		emailDialog.open();
	}); 
	
	
	
	// Social Network View
	var textCurrentTop = 0;
	var imageCurrentTop = 32;
	var lineCurrentTop = 46;
	
	var socialMdeiaLabel = Ti.UI.createLabel({
		text: "Social Networks",
		left: 10,
		top: 10
	});
	
	var facebookimage = Ti.UI.createImageView({
	  image:    'facebook.png',
	  top:    37,
	  left: 55
	});
	
	facebookimage.addEventListener('click', function(e) {
		vistedLink (facebookLabel, facebookline, "purple" );
		new WebView ('https://www.facebook.com/UIowaAlumni');
	}); 
	
	var facebookLabel = Ti.UI.createLabel({
		text: "Facebook",
		color: "blue",
		top: 32
	});
	var textCurrentTop = facebookLabel.top;
	
	var facebookline = Ti.UI.createView({
		width: 				53,
		top:				lineCurrentTop		
		
	});
	
	facebookLabel.addEventListener('click', function(e) {
		vistedLink (facebookLabel, facebookline, "purple" );
		new WebView ('https://www.facebook.com/UIowaAlumni');
	}); 
	
	var twitterimage = Ti.UI.createImageView({
	  image:    'twitter.png',
	  top:    37,
	  left: 115
	});
	imageCurrentTop = imageCurrentTop + 15;
	
	twitterimage.addEventListener('click', function(e) {
		vistedLink (twitterLabel, twitterline, "purple" );
		new WebView ('https://twitter.com/uiowaAlumni');
	}); 
	
	var twitterLabel = Ti.UI.createLabel({
		text: "Twitter",
		top: textCurrentTop + 15
	});
	textCurrentTop = textCurrentTop + 15;
	
	
	var twitterline = Ti.UI.createView({
		width: 				36,
		top:				lineCurrentTop + 15			
		
	});
	lineCurrentTop = lineCurrentTop + 15;
	
	twitterLabel.addEventListener('click', function(e) {
		vistedLink (twitterLabel, twitterline, "purple" );
		new WebView ('https://twitter.com/uiowaAlumni');
	}); 
	
	var foursquareimage = Ti.UI.createImageView({
	  image:    'fourquare.png',
	  top:   97,
	  left: 175
	});
	
	foursquareimage.addEventListener('click', function(e) {
		vistedLink (foursquareLabel, foursquareline, "purple" );
		new WebView ('https://foursquare.com/uiowaalumni');
	}); 
	imageCurrentTop = imageCurrentTop + 15;
	
	var foursquareLabel = Ti.UI.createLabel({
		text: "Four Square",
		top: textCurrentTop + 15
	});
	textCurrentTop = textCurrentTop + 15;
	
	var foursquareline = Ti.UI.createView({
		width: 				66,
		top:				lineCurrentTop + 15			
		
	});
	lineCurrentTop = lineCurrentTop + 15;
	
	foursquareLabel.addEventListener('click', function(e) {
		vistedLink (foursquareLabel, foursquareline, "purple" );
		new WebView ('https://foursquare.com/uiowaalumni');
	}); 

	var linkedInimage = Ti.UI.createImageView({
	  image:    'linkedin.png',
	  top:    97,
	  left: 55
	});
	imageCurrentTop = imageCurrentTop + 15;
	
	linkedInimage.addEventListener('click', function(e) {
		vistedLink (linkedInLabel, linkedInline, "purple" );
		new WebView ('http://www.linkedin.com/groups?gid=1814071&trk=hb_side_g');
	}); 
	
	var linkedInLabel = Ti.UI.createLabel({
		text: "LinkedIn",
		top: textCurrentTop + 15
	});
	textCurrentTop = textCurrentTop + 15;
	
	var linkedInline = Ti.UI.createView({
		width: 				45,
		top:				lineCurrentTop + 15			
		
	});
	lineCurrentTop = lineCurrentTop + 15;
	
	linkedInLabel.addEventListener('click', function(e) {
		vistedLink (linkedInLabel, linkedInline, "purple" );
		new WebView ('http://www.linkedin.com/groups?gid=1814071&trk=hb_side_g');
	}); 
	
	var pinterestimage = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/socialNet/images/pinterest.png',
	   top:    97,
	  left: 115
	});
	imageCurrentTop = imageCurrentTop + 15;
	
	pinterestimage.addEventListener('click', function(e) {
		vistedLink (pinterestLabel, pinterestline, "purple" );
		new WebView ('https://www.pinterest.com/uiowaalumni');
	}); 
	
	var pinterestLabel = Ti.UI.createLabel({
		text: "Pinterest",
		top: textCurrentTop + 15
	});
	textCurrentTop = textCurrentTop + 15;
	
	var pinterestline = Ti.UI.createView({
		width: 				48,
		top:				lineCurrentTop + 15				
	});
	lineCurrentTop = lineCurrentTop + 15;	
	
	pinterestLabel.addEventListener('click', function(e) {
		vistedLink (pinterestLabel, pinterestline, "purple" );
		new WebView ('https://www.pinterest.com/uiowaalumni');
	}); 
	
	var instagramimage = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/socialNet/images/instagram.png',
	  top:    37,
	  left: 175
	});
	 imageCurrentTop = imageCurrentTop + 15;
	
	instagramimage.addEventListener('click', function(e) {
		vistedLink (instagramLabel, instagramline, "purple" );
		new WebView ('http://instagram.com/uiowaalumni');
	
	}); 
	
	var instagramLabel = Ti.UI.createLabel({
		text: "Instagram",
		top: textCurrentTop + 15
	});
	
	
	var instagramline = Ti.UI.createView({
		width: 				52,
		top:				lineCurrentTop + 15			
		
	});
	
	instagramLabel.addEventListener('click', function(e) {
		vistedLink (instagramLabel, instagramline, "purple" );
		new WebView ('http://instagram.com/uiowaalumni');
	}); 
	
	
	
	//---------------------------------------------------------   Adjust Common Arttributes Here  -----------------------------------\\
	
	//Font
	 instagramLabel.font = pinterestLabel.font = linkedInLabel.font = foursquareLabel.font = twitterLabel.font = facebookLabel.font = 
	   emailLabel.font 
	= phoneLabel.font = addressLabel.font =  levittLabel.font = {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'};
	
	// Font (Header)
	socialMdeiaLabel.font =  contactLabel.font = {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'} ;
	
	//Text Align(For All Text)
	instagramLabel.textAlign = pinterestLabel.textAlign = linkedInLabel.textAlign = foursquareLabel.textAlign = twitterLabel.textAlign = 
	facebookLabel.textAlign = emailLabel.textAlign = phoneLabel.textAlign = addressLabel.textAlign =  levittLabel.textAlign = 
	socialMdeiaLabel.textAlign =   contactLabel.textAlign = 'left' ;
	
	//Left (Social Media Links)
	 instagramLabel.left = pinterestLabel.left = linkedInLabel.left = foursquareLabel.left = twitterLabel.left = facebookLabel.left =
	 instagramline.left = pinterestline.left = linkedInline.left = foursquareline.left = twitterline.left = facebookline.left = 25;
	
	//Width (Images)
	instagramimage.width = pinterestimage.width = linkedInimage.width = foursquareimage.width = twitterimage.width = facebookimage.width = 48;
	
	//Height (Images)
	instagramimage.height = pinterestimage.height = linkedInimage.height = foursquareimage.height = twitterimage.height = facebookimage.height = 48;
	 
	 //Link Color
	 instagramLabel.color = pinterestLabel.color = linkedInLabel.color = foursquareLabel.color = twitterLabel.color = facebookLabel.color 
	instagramline.backgroundColor = pinterestline.backgroundColor = linkedInline.backgroundColor = foursquareline.backgroundColor = twitterline.backgroundColor = facebookline.backgroundColor = 
	 emailline.backgroundColor =  levittline.backgroundColor =  emailLabel.color =  levittLabel.color = "blue";
	
	// Line Height
	 instagramline.height = pinterestline.height = linkedInline.height = foursquareline.height = twitterline.height = facebookline.height =  emailline.height =  levittline.height = 1 ;
	
	//Left 
	/* instagramimage.left = pinterestimage.left = linkedInimage.left = foursquareimage.left = twitterimage.left = facebookimage.left = */socialMdeiaLabel.left =  contactLabel.left =
	  emailline.left =  levittline.left =  emailLabel.left = phoneLabel.left = addressLabel.left =  levittLabel.left = 10;
	
	
	//------------------------------------------   Contact View's Objects  ---------------------------------------------------------\\
	contactView.add(contactLabel);	contactView.add(levittLabel);	contactView.add(levittline);	contactView.add(addressLabel);
	contactView.add(phoneLabel);	contactView.add(emailLabel);	contactView.add(emailline);
	
	
	//------------------------------------------   Social Media View's Objects  ---------------------------------------------------------\\
	/*
			socialMediaView.add(facebookLabel);	socialMediaView.add(facebookline);
		socialMediaView.add(twitterLabel);	socialMediaView.add(twitterline);	
	socialMediaView.add(foursquareLabel);	socialMediaView.add(foursquareline);		socialMediaView.add(linkedInLabel);
	socialMediaView.add(linkedInline);		socialMediaView.add(pinterestLabel);	socialMediaView.add(pinterestline);
		socialMediaView.add(instagramLabel);	socialMediaView.add(instagramline);	
		*/
		socialMediaView.add(socialMdeiaLabel);socialMediaView.add(facebookimage); socialMediaView.add(twitterimage);socialMediaView.add(foursquareimage);socialMediaView.add(linkedInimage);
	socialMediaView.add(pinterestimage);socialMediaView.add(instagramimage); 
	//------------------------------------------   Views    ---------------------------------------------------------------------------\\	
	scrollMainView.add(socialMediaView);	scrollMainView.add(contactView);	scrollMainView.add(ad);
	
	self.add(scrollMainView);
	return self;
}


function vistedLink (label,line, color ){
	label.color = line.backgroundColor = color;
}
module.exports = InfoWindow;