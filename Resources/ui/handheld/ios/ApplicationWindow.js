//Application Window Component Constructor
function ApplicationWindow(feed,windowtitle) {
	//declare module dependencies
	var RSS = require('services/rss'),
		MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');
		
	var rssfeed = new RSS(feed);

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		barImage: 'navbar.png'
	});

	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:windowtitle,
		barImage: 'navbar.png'
	});
	var button = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	});
	button.addEventListener('click', function(e) {
		refreshRSS();
	});
	masterContainerWindow.rightNavButton = button;
	masterContainerWindow.add(masterView);

	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({barImage: 'navbar.png'});
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
	
	function refreshRSS() {
		rssfeed.loadRssFeed({
			success: function(data) {
	    		masterView.refreshRssTable(data);
	    	}
		});
	}
	
	// load initial rss feed
	refreshRSS();
	
	return self;
};
module.exports = ApplicationWindow;