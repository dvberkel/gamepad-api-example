(function(window, document, navigator){
    function gamepadSupported() {
	return !!navigator.webkitGetGamepads
    }

    var body = document.getElementsByTagName('body')[0];

    var paragraph = document.createElement('p');
    paragraph.textContent = 'gamepad api supported: ' + gamepadSupported();
    body.appendChild(paragraph);
})(window, document, navigator);
