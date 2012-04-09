var vb = require("./Vector.base.js");

var Matrix = function() {
	return new Matrix.fn.init(arguments);
};

Matrix.fn = vb.Vector.prototype;

Matrix.fn.exceptions.NonQuadraticDim = function(operator, arg) {
	throw "Operator `" + operator.toString()
			+ "` require quadratic matrix to be done.";
};

Matrix.fn.init = function() {
	var args = arguments[0];
	this.rows = args[0] === undefined ? 0 : args[0];
	this.columns = args[1] === undefined ? 0 : args[1];
	var dim = this.rows * this.columns;
	data = args[2] === undefined ? [] : args[2];
	data = data instanceof Array ? data : [];

	if (data.length < dim) {
		var deficit = dim - data.length;
		for ( var i = 0; i < deficit; data.push(0), i++)
			;
	}
	;
	this.data = data;
};

Matrix.fn.toString = function() {
	var str = '';
	for ( var i = 0; i < this.rows; ++i) {
		for ( var j = 0; j < this.columns; ++j) {
			str += data[i * this.columns + j].toString() + ' ';
		}
		;
		str += '\n';
	}
	;
	return str;
};

Matrix.fn.at = function() {
	if (arguments.length == 1) {
		var result = new vb.Vector();
		var row = parseInt(arguments[0]) * this.columns;
		for ( var i = 0; i < this.columns; result.push(this.data[row + i++]))
			;
		return result;
	} else if (arguments.length == 2) {
		return this.data[parseInt(arguments[0]) * this.columns
				+ parseInt(arguments[1])];
	}
	;
	return undefined;
};

Matrix.fn.cofactor = function(i, j) {
	if (this.rows == 1 && this.columns == 1) {
		return this.data[0];
	}
	;

	var data = [];
	for ( var n = 0; n < this.rows; n++) {
		if (n == i)
			continue;
		for ( var m = 0; m < this.columns; m++) {
			if (m == j)
				continue;
			data.push(this.at(n, m));
		}
		;
	}
	;
	M = new Matrix(this.rows - 1, this.columns - 1, data);
	return (((i + j) % 2 == 0) ? 1 : -1) * M.det();
};

Matrix.fn.det = function() {
	if (this.rows != this.columns) {
		this.exceptions.NonQuadraticDim();
	}
	;
	if (this.rows == 1) {
		return this.data[0];
	}
	;
	if (this.rows == 2) {
		return this.at(0, 0) * this.at(1, 1) - this.at(0, 1) * this.at(1, 0);
	}
	;
	var det = 0.;
	for ( var i = 0; i < this.rows; i++) {
		det += this.at(0, i) * this.cofactor(0, i);
	}
	;
	return det;
};

Matrix.fn.adjugate = function() {
	var data = [];
	for ( var i = 0; i < this.rows; i++) {
		for ( var j = 0; j < this.columns; j++) {
			var c = this.cofactor(i, j);
			data.push(c);
		}
		;
	}
	;
	return new Matrix(this.rows, this.columns, data);
};

Matrix.fn.multе = function(val) {
	if (typeof (val) == 'number') {
		return this.operatorConvolution("mult", val);
	} else if (val instanceof vb.Vector) {
		return 0;
	} else if (val instanceof Matrix) {
		return 0;
	} else {
		return 0;
	}
	;
};

Matrix.fn.invertible = function() {
	var A = this.adjugate();
	A.mult(1. / this.det());
	return A;
};

Matrix.fn.init.prototype = Matrix.fn;
exports.Matrix = Matrix;

var m = new Matrix(2, 2, [ 1, 0, 0, 1 ]);
console.log(m.at(1));