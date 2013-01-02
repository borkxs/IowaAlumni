function Description(description) {
	this.description = description;
}

Description.prototype.getImage = function() {
	var imageregex  = /(img|src)=("|')[^"'>]+/;
	var imageurl    = imageregex.exec(this.description);
	imageurlstr     = imageurl[0];
	imageurlstr     = imageurlstr.substring(5, imageurlstr.length - 12) + '.jpg';
	return imageurlstr;
}

Description.prototype.getDescription = function() {
	var description = this.description;
	var regex       = /(<([^>]+)>)/ig;
	description     = description.replace(regex, "");
	var regex2      = /&[^;]+?;/;
	description     = description.replace(regex2, "");
	description		= description.replace(/(\r\n|\n|\r)/gm," ");
			
	var cur = description.substr(0,1);
	while(cur == ' ' || cur == '\t') {
		description = description.substring(description.length - 1, 1);
		cur = description.substr(0,1);
	}
	return description;
}

module.exports = Description;
