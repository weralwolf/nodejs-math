var inh = require('./inheritance.js');

var Vector = function() {
	this.data = [];
	for (i in arguments) {
		this.data.push(arguments[i]);
	}
	;

	this.toString = function() {
		var str = '';
		for ( var i = 0; i < this.data.length; i++) {
			str += this.data[i].toString() + ' ';
		}
		;
		return str;
	};

	this.at = function(i) {
		return this.data[i];
	};

	this.set = function(i, val) {
		this.data[i] = val;
		return this;
	};

	this.dim = function() {
		return this.data.length;
	};
	
	this.mult = function(vector) {
	};
};

