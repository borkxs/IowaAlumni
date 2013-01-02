function DateObject(pubDate) {
	this.pubDate = pubDate;
}

/*
 * Returns format 'Mon 00 00:00AM'
 */

DateObject.prototype.dateString = function() {
	
	var date = new Date(this.pubDate);
			
	var m_names = new Array("Jan", "Feb", "Mar", 
	"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
	"Oct", "Nov", "Dec");
			
	var day = date.getDate();
	if(day<10) day = '0' + day;
	var mon = date.getMonth();
	var textdate = m_names[mon] + ' ' + day;
	var ampm = "AM";
	var hours = date.getHours();
	var mins = date.getMinutes();
	if (hours>=12) {
		ampm = "PM";
	}
	if (hours>12) hours -= 12;
	if (mins<10) mins = "0"+mins.toString();
	if (hours<10) hours = "0"+hours.toString();
	var texttime = hours + ':' + mins + ampm;
		
	return textdate + ' ' + texttime;
	
}

DateObject.prototype.magazineDateString = function() {
	
	var date = new Date(this.pubDate);
			
	var m_names = new Array("Jan", "Feb", "Mar", 
	"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
	"Oct", "Nov", "Dec");
			
	var mon = date.getMonth();
	var textdate = m_names[mon];
		
	return textdate + ' ' + date.getYear();
	
}

module.exports = DateObject;