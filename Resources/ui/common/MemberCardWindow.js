
var ApplicationWindow = require('ui/common/ApplicationWindow');
var GetFeed = require('ui/common/GetFeed');

function  MemberCardWindow(title){
	var self = new ApplicationWindow(title);

	
	var passwordWin = Ti.UI.createWindow({
	    top: 43,
	    //backgroundColor:'#202020',
	    backgroundColor:'#cccccc',
		navBarHidden: true
	});
	
	
	var passwordLabel = Ti.UI.createLabel({
		text: "UIAA Member Login:",
		height:'auto',
		width: 250,
		//color:'#efc006',
		top: 100,
  		left: 80,
		font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	});
	
	var passwordTextField = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		passwordMask: true,
  		top: 120,
  		left: 90,
  		width: 140, 
  		height: 20
	});
	var loginButton = Ti.UI.createButton({
		title:'Login',
		width:50,
		height:25,
		//color:'#efc006',
		top: 142,
  		left: 130,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		
	});
	var wrongPasswordLabel = Ti.UI.createLabel({
		text: "You may have typed the password incorrectly, try again.",
		height:'auto',
		width: 310,
		color:'#FF0000',
		top: 169,
  		left: 10,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	
	var image = Ti.UI.createImageView({
	  image:    'http://iowalum.com/membership/images/MemberCard.png',
	  top:    0,
	  left:   0,
	  height: 420,
	  width:  320
	});
	passwordWin.add(wrongPasswordLabel);
	wrongPasswordLabel.setVisible(false);
	loginButton.addEventListener('click',function(){
		var password = (new GetFeed('http://iowalum.com/membership/password_feed_xml.cfm')[0]);
		password =  password.replace(" ","");
		password =  password.replace(" ","");
   		if (passwordTextField.value == password) {
			passwordWin.remove(passwordLabel);
			passwordWin.remove(passwordTextField);
			passwordWin.remove(loginButton);
			wrongPasswordLabel.setVisible(false);
			passwordWin.add(image);
			self.title = "Member's Card";
			
		}
		else {
			wrongPasswordLabel.setVisible(true);
		}
	});

	
	passwordWin.add(passwordLabel);
	passwordWin.add(passwordTextField);
	passwordWin.add(loginButton);
	self.add(passwordWin);
	return self;
}



module.exports = MemberCardWindow;