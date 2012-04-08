var vb = require("./Vector.base.js");

var Matrix = function() {
	return new Matrix.fn.init(arguments); 
};

Matrix.fn = vb.Vector.prototype;

Matrix.fn.init = function() {
	var args = arguments[0];
	this.rows = args[0] === undefined ? 0 : args[0];
	this.columns = args[1] === undefined ? 0 : args[1];
	var dim = this.rows * this.columns;
	data = args[2] === undefined ? [] : args[2];
	data = data instanceof Array ? data : [];

	if (data.length < dim) {
		var deficit = dim - data.length;
		for(var i = 0; i < deficit; data.push(0), i++);
	};
	this.data = data;
};

Matrix.fn.toString = function() {
	var str = '';
	for(var i = 0; i < this.rows; ++i) {
		for(var j = 0; j < this.columns; ++j) {
			str += data[i * this.columns + j].toString() + ' ';
		};
		str += '\n';
	};
	return str;
};

Matrix.fn.init.prototype = Matrix.fn;