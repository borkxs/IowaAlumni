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
	  image:    currentAd[14].ad,
	  width: 300,
	  height: 52,
	  top: 350,
	  left: 10
	  
	});
	ad.addEventListener('click', function(e) {
		new WebView (currentAd[14].adUrl);
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
		emailDialog.toRecipients = ['alumni@uiowa.edu'];
		var f = Ti.Filesystem.getFile('cricket.wav');
		emailDialog.addAttachment(f);
		emailDialog.open();
	}); 
	
	
	
	// Social Network View
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
		new WebView ('https://www.facebook.com/UIowaAlumni');
	}); 
	
	
	var twitterimage = Ti.UI.createImageView({
	  image:    'twitter.png',
	  top:    37,
	  left: 115
	});

	
	twitterimage.addEventListener('click', function(e) {
		new WebView ('https://twitter.com/uiowaAlumni');
	}); 
	
	
	var foursquareimage = Ti.UI.createImageView({
	  image:    'fourquare.png',
	  top:   97,
	  left: 175
	});
	
	foursquareimage.addEventListener('click', function(e) {
		new WebView ('https://foursquare.com/uiowaalumni');
	}); 
	

	var linkedInimage = Ti.UI.createImageView({
	  image:    'linkedin.png',
	  top:    97,
	  left: 55
	});
	
	
	linkedInimage.addEventListener('click', function(e) {
		new WebView ('http://www.linkedin.com/groups?gid=1814071&trk=hb_side_g');
	}); 
	
	
	var pinterestimage = Ti.UI.createImageView({
	  image:    'pinterest.png',
	   top:    97,
	  left: 115
	});

	pinterestimage.addEventListener('click', function(e) {
		new WebView ('https://www.pinterest.com/uiowaalumni');
	}); 
	
	
	var instagramimage = Ti.UI.createImageView({
	  image:    'instagram.png',
	  top:    37,
	  left: 175
	});
	
	instagramimage.addEventListener('click', function(e) {
		new WebView ('http://instagram.com/uiowaalumni');
	
	}); 
	
	
	
	
	//---------------------------------------------------------   Adjust Common Arttributes Here  -----------------------------------\\
	
	//Font
	 
	   emailLabel.font 
	= phoneLabel.font = addressLabel.font =  levittLabel.font = {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'};
	
	// Font (Header)
	socialMdeiaLabel.font =  contactLabel.font = {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'} ;
	
	//Text Align(For All Text)
	 emailLabel.textAlign = phoneLabel.textAlign = addressLabel.textAlign =  levittLabel.textAlign = 
	socialMdeiaLabel.textAlign =   contactLabel.textAlign = 'left' ;
	
	
	//Width (Images)
	instagramimage.width = pinterestimage.width = linkedInimage.width = foursquareimage.width = twitterimage.width = facebookimage.width = 48;
	
	//Height (Images)
	instagramimage.height = pinterestimage.height = linkedInimage.height = foursquareimage.height = twitterimage.height = facebookimage.height = 48;
	 
	 //Link Color
	 emailline.backgroundColor =  levittline.backgroundColor =  emailLabel.color =  levittLabel.color = "blue";
	
	// Line Height
	 emailline.height =  levittline.height = 1 ;
	
	//Left 
	socialMdeiaLabel.left =  contactLabel.left =
	  emailline.left =  levittline.left =  emailLabel.left = phoneLabel.left = addressLabel.left =  levittLabel.left = 10;
	
	
	//------------------------------------------   Contact View's Objects  ---------------------------------------------------------\\
	contactView.add(contactLabel);	contactView.add(levittLabel);	contactView.add(levittline);	contactView.add(addressLabel);
	contactView.add(phoneLabel);	contactView.add(emailLabel);	contactView.add(emailline);
	
	
	//------------------------------------------   Social Media View's Objects  ---------------------------------------------------------\\
	
		socialMediaView.add(socialMdeiaLabel);socialMediaView.add(facebookimage); socialMediaView.add(twitterimage);socialMediaView.add(foursquareimage);socialMediaView.add(linkedInimage);
	socialMediaView.add(pinterestimage);socialMediaView.add(instagramimage); 
	//------------------------------------------   Views    ---------------------------------------------------------------------------\\	
	scrollMainView.add(socialMediaView);	scrollMainView.add(contactView);	scrollMainView.add(ad);
	
	self.add(scrollMainView);
	return self;
}



module.exports = InfoWindow;