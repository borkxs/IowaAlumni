
var GetFeed = require('ui/common/GetFeed');

function GetLocation(){
	var discount =  new GetFeed ('http://iowalum.com/membership/feed_xml.cfm');
	var businessesInfo = discount.getCompaniesInfo();
	
	if (Ti.Geolocation.locationServicesEnabled) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	            Ti.API.info(e.coords);
	            Ti.API.info(e.coords.latitude);
	            if (e.coords.latitude == "37.78583526611328" || e.coords.longitude == "-122.4064178466797"){
	            	alert(((('Stop by at ').concat(businessesInfo[0].company)).concat(" for a ")).concat(businessesInfo[0].discount));
	            }
	        }
	    });
	}
	 else {
	    alert('Please enable location services');
	}
}

module.exports = GetLocation;