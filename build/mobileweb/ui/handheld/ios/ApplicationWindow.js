//Application Window Component Constructor
function ApplicationWindow(feed,windowtitle) {
	//declare module dependencies
	var RSS = require('services/rss'),
		MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView'),	
		Description = require('ui/common/Description');
		
	var rssfeed = new RSS(feed);

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		//barImage: 'navbar.png'
		navBarHidden: true
	});

	//construct UI
	var masterView = new MasterView(feed),
		detailView = new DetailView();

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:windowtitle,
		navBarHidden:false,
		barImage:'navbar.png',
		//hires:true,
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	var menuButton = Ti.UI.createButton({
		backgroundImage: 'newmenubutton.png',
		backgroundSelectedImage: 'newmenubuttonselected.png',
		title: '',
		height: 22,
		width: 37,
		//left: 15,
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);
	masterContainerWindow.add(masterView);

	//menuButton event
	menuButton.addEventListener('click', function(e){
		self.fireEvent('menuClick');
	});

	self.addEventListener('swipeToggle', function(e){
		self.fireEvent('menuClick');
	});
	self.addEventListener('swipe', function(e){
		self.fireEvent('menuClick');
	});
	self.addEventListener('swipeListen', function(e){
		self.fireEvent('menuClick');
	});

	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({barImage: 'navbar.png',navBarHidden:false});
	detailContainerWindow.add(detailView);

	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.showArticle(e.link);
		navGroup.open(detailContainerWindow);
	});
	
	
	return self;
};
module.exports = ApplicationWindow;