var ApplicationWindow = require('ui/common/ApplicationWindow');
var WebView = require('ui/common/WebView');
var DetailView = require('ui/common/DetailView');

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
	
	var ad = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/images/redesign10/rewards_new.jpg',
	  width: 300,
	  height: 52,
	  top: 350,
	  left: 10
	  
	});
	ad.addEventListener('click', function(e) {
		new WebView ('http://www.iowalum.com/iowarewards/index.cfm');
	}); 
	
	// The Contact View 
	var contactLabel = Ti.UI.createLabel({
		text: "Contact Us",
		top: 10
	});
	var levittLabel = Ti.UI.createLabel({
		text: "Levitt Center",
		top: 30
	});
	
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
		top: 45
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
	var socialMdeiaLabel = Ti.UI.createLabel({
		text: "Social Networks",
		left: 10,
		top: 10
	});
	
	var facebookimage = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/images/icons/facebook.png',
	  top:    32
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
	
	var facebookline = Ti.UI.createView({
		width: 				53,
		top:				46			
		
	});
	
	facebookLabel.addEventListener('click', function(e) {
		vistedLink (facebookLabel, facebookline, "purple" );
		new WebView ('https://www.facebook.com/UIowaAlumni');
	}); 
	
	var twitterimage = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/images/icons/twitter.png',
	  top:    47
	});
	
	twitterimage.addEventListener('click', function(e) {
		vistedLink (twitterLabel, twitterline, "purple" );
		new WebView ('https://twitter.com/uiowaAlumni');
	}); 
	
	var twitterLabel = Ti.UI.createLabel({
		text: "Twitter",
		top: 47
	});
	
	var twitterline = Ti.UI.createView({
		width: 				36,
		top:				61			
		
	});
	
	twitterLabel.addEventListener('click', function(e) {
		vistedLink (twitterLabel, twitterline, "purple" );
		new WebView ('https://twitter.com/uiowaAlumni');
	}); 
	
	var foursquareimage = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/images/icons/fourquare.png',
	  top:    62
	});
	
	foursquareimage.addEventListener('click', function(e) {
		vistedLink (foursquareLabel, foursquareline, "purple" );
		new WebView ('https://foursquare.com/uiowaalumni');
	}); 
	
	var foursquareLabel = Ti.UI.createLabel({
		text: "Four Square",
		top: 62
	});
	
	var foursquareline = Ti.UI.createView({
		width: 				66,
		top:				76			
		
	});
	
	foursquareLabel.addEventListener('click', function(e) {
		vistedLink (foursquareLabel, foursquareline, "purple" );
		new WebView ('https://foursquare.com/uiowaalumni');
	}); 

	var linkedInimage = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/images/icons/linkedin.png',
	  top:    77
	});
	
	linkedInimage.addEventListener('click', function(e) {
		vistedLink (linkedInLabel, linkedInline, "purple" );
		new WebView ('http://www.linkedin.com/groups?gid=1814071&trk=hb_side_g');
	}); 
	
	var linkedInLabel = Ti.UI.createLabel({
		text: "LinkedIn",
		top: 77
	});
	
	var linkedInline = Ti.UI.createView({
		width: 				45,
		top:				91			
		
	});
	
	linkedInLabel.addEventListener('click', function(e) {
		vistedLink (linkedInLabel, linkedInline, "purple" );
		new WebView ('http://www.linkedin.com/groups?gid=1814071&trk=hb_side_g');
	}); 
	
	var blogimage = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/images/icons/insider.png',
	  top:    92
	});
	
	blogimage.addEventListener('click', function(e) {
		vistedLink (blogLabel, blogline, "purple" );
		new WebView ('http://www.iowalum.com/blog/');
	}); 
	
	var blogLabel = Ti.UI.createLabel({
		text: "Blog: Iowa Insider",
		top: 92
	});
	
	var blogline = Ti.UI.createView({
		width: 				93,
		top:				106				
	});
	
	blogLabel.addEventListener('click', function(e) {
		vistedLink (blogLabel, blogline, "purple" );
		new WebView ('http://www.iowalum.com/blog/');
	}); 
	
	var onIowaimage = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/images/icons/oniowa.png',
	  top:    107
	});
	
	onIowaimage.addEventListener('click', function(e) {
		vistedLink (onIowaLabel, onIowaline, "purple" );
		new WebView ('http://oniowa.iowalum.com/page.aspx?pid=631&bm=-232377308');
	}); 
	
	var onIowaLabel = Ti.UI.createLabel({
		text: "OnIowa.com",
		top: 107
	});
	
	var onIowaline = Ti.UI.createView({
		width: 				69,
		top:				121			
		
	});
	
	onIowaLabel.addEventListener('click', function(e) {
		vistedLink (onIowaLabel, onIowaline, "purple" );
		new WebView ('http://oniowa.iowalum.com/page.aspx?pid=631&bm=-232377308');
	}); 
	
	var feedimage = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/images/icons/feed.png',
	  top:    122
	});
	
	feedimage.addEventListener('click', function(e) {
		vistedLink (feedLabel, feedline, "purple" );
		new WebView ('http://www.iowalum.com/rss.cfm');
	}); 
	
	var feedLabel = Ti.UI.createLabel({
		text: "Feeds",
		top: 122,
	});
	
	var feedline = Ti.UI.createView({
		width: 				35,
		top:				136			
		
	});
	
	feedLabel.addEventListener('click', function(e) {
		vistedLink (feedLabel, feedline, "purple" );
		new WebView ('http://www.iowalum.com/rss.cfm');
	}); 
	
	
	//---------------------------------------------------------   Adjust Common Arttributes Here  -----------------------------------\\
	
	//Font
	feedLabel.font = onIowaLabel.font = blogLabel.font = linkedInLabel.font = foursquareLabel.font = twitterLabel.font = facebookLabel.font = 
	   emailLabel.font 
	= phoneLabel.font = addressLabel.font =  levittLabel.font = {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'};
	
	// Font (Header)
	socialMdeiaLabel.font =  contactLabel.font = {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'} ;
	
	//Text Align(For All Text)
	feedLabel.textAlign = onIowaLabel.textAlign = blogLabel.textAlign = linkedInLabel.textAlign = foursquareLabel.textAlign = twitterLabel.textAlign = 
	facebookLabel.textAlign = emailLabel.textAlign = phoneLabel.textAlign = addressLabel.textAlign =  levittLabel.textAlign = 
	socialMdeiaLabel.textAlign =   contactLabel.textAlign = 'left' ;
	
	//Left (Social Media Links)
	feedLabel.left = onIowaLabel.left = blogLabel.left = linkedInLabel.left = foursquareLabel.left = twitterLabel.left = facebookLabel.left =
	feedline.left = onIowaline.left = blogline.left = linkedInline.left = foursquareline.left = twitterline.left = facebookline.left = 25;
	
	//Width (Images)
	feedimage.width = onIowaimage.width = blogimage.width = linkedInimage.width = foursquareimage.width = twitterimage.width = facebookimage.width = 12;
	
	//Height (Images)
	feedimage.height = onIowaimage.height = blogimage.height = linkedInimage.height = foursquareimage.height = twitterimage.height = facebookimage.height = 12;
	 
	 //Link Color
	feedLabel.color = onIowaLabel.color = blogLabel.color = linkedInLabel.color = foursquareLabel.color = twitterLabel.color = facebookLabel.color = feedline.backgroundColor = 
	onIowaline.backgroundColor = blogline.backgroundColor = linkedInline.backgroundColor = foursquareline.backgroundColor = twitterline.backgroundColor = facebookline.backgroundColor = 
	 emailline.backgroundColor =  levittline.backgroundColor =  emailLabel.color =  levittLabel.color = "blue";
	
	// Line Height
	feedline.height = onIowaline.height = blogline.height = linkedInline.height = foursquareline.height = twitterline.height = facebookline.height =  emailline.height =  levittline.height = 1 ;
	
	//Left 
	feedimage.left = onIowaimage.left = blogimage.left = linkedInimage.left = foursquareimage.left = twitterimage.left = facebookimage.left = socialMdeiaLabel.left =  contactLabel.left =
	  emailline.left =  levittline.left =  emailLabel.left = phoneLabel.left = addressLabel.left =  levittLabel.left = 10;
	
	
	//------------------------------------------   Contact View's Objects  ---------------------------------------------------------\\
	contactView.add(contactLabel);	contactView.add(levittLabel);	contactView.add(levittline);	contactView.add(addressLabel);
	contactView.add(phoneLabel);	contactView.add(emailLabel);	contactView.add(emailline);
	
	
	//------------------------------------------   Social Media View's Objects  ---------------------------------------------------------\\
	socialMediaView.add(socialMdeiaLabel);	socialMediaView.add(facebookimage);	socialMediaView.add(facebookLabel);	socialMediaView.add(facebookline);
	socialMediaView.add(twitterimage);	socialMediaView.add(twitterLabel);	socialMediaView.add(twitterline);	socialMediaView.add(foursquareimage);
	socialMediaView.add(foursquareLabel);	socialMediaView.add(foursquareline);	socialMediaView.add(linkedInimage);	socialMediaView.add(linkedInLabel);
	socialMediaView.add(linkedInline);	socialMediaView.add(blogimage);	socialMediaView.add(blogLabel);	socialMediaView.add(blogline);
	socialMediaView.add(onIowaimage);	socialMediaView.add(onIowaLabel);	socialMediaView.add(onIowaline);	socialMediaView.add(feedimage);
	socialMediaView.add(feedLabel);	socialMediaView.add(feedline);
	
	//------------------------------------------   Views    ---------------------------------------------------------------------------\\	
	scrollMainView.add(socialMediaView);	scrollMainView.add(contactView);	scrollMainView.add(ad);
	
	self.add(scrollMainView);
	return self;
}


function vistedLink (label,line, color ){
	label.color = line.backgroundColor = color;
}
module.exports = InfoWindow;