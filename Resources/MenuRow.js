function MenuRow(title) {
	
	var self = Ti.UI.createTableViewRow({
		height: 45,
		layout: 'vertical',
		backgroundImage: 'menu.jpg'
	});
	var text = Ti.UI.createLabel({
		var titlelbl = Ti.UI.createLabel({
		text: title,
		left: 10,
		height: 45,
		textAlign:'left',
		width: 150,
		color:'#efc006',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica',fontSize:13,fontWeight:'bold'}
	});
	self.add(text);

	return self;

}

module.exports = MenuRow;