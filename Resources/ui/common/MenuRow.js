function MenuRow(title) {
	
	var self = Ti.UI.createTableViewRow({
		height: 45,
		layout: 'vertical',
		backgroundImage: 'menu.jpg',
		backgroundFocusedImage: 'pressed.jpg',
		backgroundSelectedImage: 'pressed.jpg'
	});
	var text = Ti.UI.createLabel({
		text: title,
		left: 10,
		height: 45,
		textAlign:'left',
		width: 150,
		color:'#cccccc',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:15,fontWeight:'bold'}
	});
	self.add(text);

	return self;

}

module.exports = MenuRow;