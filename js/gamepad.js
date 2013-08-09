(function(window, document, navigator){
    function gamepadSupported() {
	return !!navigator.webkitGetGamepads
    }

    var body = document.getElementsByTagName('body')[0];

    var paragraph = document.createElement('p');
    paragraph.textContent = 'gamepad api supported: ' + gamepadSupported();
    body.appendChild(paragraph);

    if (gamepadSupported()) {
	var listOfGamepads = document.createElement('ul');
	var gamepads = navigator.webkitGetGamepads();
	for (var index = 0; index < gamepads.length; index++) {
	    var gamepad = gamepads.item(index);
	    if (!!gamepad) {
		console.log(gamepads.item(index));
		var gamepadItem = document.createElement('li');
		gamepadItem.textContent = gamepad.id;
		listOfGamepads.appendChild(gamepadItem);
	    }

	}
	body.appendChild(listOfGamepads);
    }

})(window, document, navigator);
