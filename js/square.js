(function(window, document, navigator){
    function Square(x, y, width) {
	this.x = x;
	this.y = y;
	this.width = width;
    };
    Square.prototype.dx = function dx(delta){
	this.x += delta;
	this.notify();
    };
    Square.prototype.dy = function dy(delta){
	this.y += delta;
	this.notify();
    };
    Square.prototype.dw = function dw(delta){
	this.width += delta;
	this.notify();
    };
    Square.prototype.addObserver = function addObserver(observer) {
	this.observers = this.observers || [];
	this.observers.push(observer);
    }
    Square.prototype.notify = function notify() {
	this.observers = this.observers || [];
	for (var index = 0; index < this.observers.length; index++) {
	    var observer = this.observers[index];
	    observer.call(null);
	}
    }

    function createSquareDiv() {
	var div = document.createElement('div');
	div.setAttribute('class', 'square');
	document.getElementsByTagName('body')[0].appendChild(div);
	return div;
    }

    function SquareView(square) {
	var self = this;
	square.addObserver(function(){ self.redraw(); });
	self.square = square;
	self.container = createSquareDiv();
	self.redraw
    }
    SquareView.prototype.redraw = function redraw(){
	this.container.style.left = square.x;
	this.container.style.top = square.y;
	this.container.style.width = square.widht;
	this.container.style.height = square.widht;
    }

    function SquareController(square) {
	this.square = square;
    };
    SquareController.prototype.update = function update(){
	var gamepad = navigator.webkitGetGamepads()[0];
	if (!!gamepad) {
	    var deltaX = gamepad.axes[0];
	    var deltaY = gamepad.axes[1];
	    if (Math.abs(deltaX) > 0.2) {
		this.square.dx(deltaX);
	    }
	    if (Math.abs(deltaY) > 0.2) {
		this.square.dy(deltaY);
	    }
	}
    }
    SquareController.prototype.control = function control() {
	if (! this.controlling ) {
	    this.controlling = true;
	    var self = this;
	    function updateContinously(){
		self.update();
		requestAnimationFrame(updateContinously);
	    }
	    updateContinously();
	}
    }

    var square = new Square(document.width/2, document.height/2, 100);
    new SquareView(square);
    new SquareController(square).control();
    square.notify();
})(window, document, navigator);
