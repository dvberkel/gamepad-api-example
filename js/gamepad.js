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

	var gamepadData = document.createElement('p');
	var leftX = document.createElement('span'); leftX.setAttribute('class', 'bracket');
	var leftY = document.createElement('span'); leftY.setAttribute('class', 'bracket');
	var rightX = document.createElement('span'); rightX.setAttribute('class', 'bracket');
	var rightY = document.createElement('span'); rightY.setAttribute('class', 'bracket');
	gamepadData.appendChild(leftX);
	gamepadData.appendChild(leftY);
	gamepadData.appendChild(rightX);
	gamepadData.appendChild(rightY);
	body.appendChild(gamepadData);

	function logGamepad() {
	    var gamepad = navigator.webkitGetGamepads()[0];
	    if (!!gamepad) {
		leftX.textContent = gamepad.axes[0];
		leftY.textContent = gamepad.axes[1];
		rightX.textContent = gamepad.axes[2];
		rightY.textContent = gamepad.axes[3];
	    }
	    requestAnimationFrame(logGamepad);
	}
	logGamepad();
    }

})(window, document, navigator);
