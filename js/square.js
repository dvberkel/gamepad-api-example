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
	this.container.style.width = square.width;
	this.container.style.height = square.width;
    }

    function extend(target, extention) {
	for (key in extention) {
	    target[key] = extention[key];
	}
	return target;
    }

    function SquareController(square, options) {
	this.square = square;
	this.options = extend({vx : 1, vy : 1, vw: 1}, options || {});
    };
    SquareController.prototype.update = function update(){
	var gamepad = navigator.webkitGetGamepads()[0];
	if (!!gamepad) {
	    var deltaX = gamepad.axes[0];
	    var deltaY = gamepad.axes[1];
	    var deltaW = gamepad.axes[3];
	    if (Math.abs(deltaX) > 0.2) {
		this.square.dx(this.options.vx * deltaX);
	    }
	    if (Math.abs(deltaY) > 0.2) {
		this.square.dy(this.options.vy * deltaY);
	    }
	    if (Math.abs(deltaW) > 0.2) {
		this.square.dw(-1 * this.options.vw * deltaW);
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
    new SquareController(square, { vx: 10, vy: 10, vw: 3 }).control();
    square.notify();
})(window, document, navigator);
