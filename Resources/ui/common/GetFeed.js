 var data = [];
function GetFeed (feed){
	data = [];
	xmlDoc=loadXMLDoc(feed);

	var items = xmlDoc.getElementsByTagName("item");
	
	var item = items.item(i);
	
	
	if (feed == "http://iowalum.com/mobile-app/root_feed.cfm"){
				data.push({
					title:  getRssText(item, 'title'),
					url:  getRssText(item, 'link'),
					image: getRssText(item, 'image'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate')
					
					});
			}
	else if (feed == "http://iowalum.com/mobile-app/root_date_feed.cfm"){
				data.push({
					date:  getRssText(item, 'date')
					
					});
			}
	
	else{
		for (var i = 0; i < items.length; i++) {
			var item = items.item(i);
			
		
			if (feed == "http://iowalum.com/clubs/feed_xml.cfm"){
				data.push({
					state:  getRssText(item, 'state'),
					club:  getRssText(item, 'club'),
					place: getRssText(item, 'place'),
					phone: getRssText(item, 'phone'),
					latitude: getRssText(item, 'latitude'),
					longitude: getRssText(item, 'longitude'),
					street: getRssText(item, 'street')
					});
			}
			else if (feed == "http://iowalum.com/mobile-app/feed_xml.cfm"){
				data.push({
					ad:   getRssText(item, 'ad'),
					adUrl:  getRssText(item, 'adUrl')
					});
		}
			
			else if (feed == "http://iowalum.com/mobile-app/root_events_feed.cfm"){
				data.push({
					snl: getRssText(item, 'snl'),
					place: getRssText(item, 'place'),
					title: getRssText(item, 'title'),
					url: getRssText(item, 'link'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate')
				
					
					});
			}
			
			else if (feed == "http://iowalum.com/clubs/feed_p2_xml.cfm"){
				data.push({
					state:  getRssText(item, 'state'),
					leader:  getRssText(item, 'leader'),
					city: getRssText(item, 'city'),
					web: getRssText(item, 'web'),
					email: getRssText(item, 'email'),
					phone: getRssText(item, 'phone')
					});
			}
			
			else if (feed == "http://iowalum.com/advertising/feed_xml.cfm"){
				data.push({
					ad: getRssText(item, 'ad'),
					link: getRssText(item, 'link'),
				});
				
			}
			
			else if (feed == "http://iowalum.com/mobile-app/root_homeImages_feed.cfm"){
				data.push({
					url: getRssText(item, 'url')
				});
				
			}
			else if (feed == "http://iowalum.com/membership/password_feed_xml.cfm"){
				data.push(
					getRssText (item, 'pass')
				);
				
			}
			
			else {
				data.push({
					company:  getRssText(item, 'company'),
					discount: getRssText(item, 'discount'),
					latitude: getRssText(item, 'latitude'),
					longitude: getRssText(item, 'longitude'),
					street: getRssText(item, 'street')
					});
			}
		}
	}
	return data;
}

var osname = Ti.Platform.osname;
var RSS_URL = osname === 'mobileweb' ? '/feed.xml' : 'http://iowalum.com/blog/?feed=rss2';


var getRssText = function(item, key) {
	return osname === 'mobileweb' ?
			item.getElementsByTagName(key).item(0).textContent : //childNodes[0].nodeValue :
			item.getElementsByTagName(key).item(0).text;
}

function loadXMLDoc(dname){
	var xmlhttp = Titanium.Network.createHTTPClient();
	xmlhttp.open("GET",dname,false);
	xmlhttp.send();
	return xmlhttp.responseXML;
}

module.exports = GetFeed;