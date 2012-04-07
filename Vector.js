/**
 * I'd like to make some convention about
 */

var Vector = function() {
	// The Vector object is actually just the init constructor 'enhanced'
	return new Vector.fn.init(arguments);
};

Vector.fn = Vector.prototype = {
	// ---------------------- FIELDS -----------------------
	type : "Vector",
	operators : {
		add : function(a, b) {
			return a + b;
		},
		div : function(a, b) {
			return a / b;
		},
		sub : function(a, b) {
			return a - b;
		},
		mult : function(a, b) {
			return a * b;
		}
	},
	exceptions : {
		operatorArgumentType : function(operator, arg) {
			throw "Operator `"
					+ operator.toString()
					+ "` argument type violation.\n"
					+ "Operation couldn't be done with such type of argument.\nArgument: "
					+ arg.toString();
		},
		operatorArgumentDim : function(operator, arg) {
			throw "Operator `" + operator.toString()
					+ "` argument dim violation.\n"
					+ "Arguments dimensions should be equals.\nArgument: "
					+ arg.toString();
		},
		operatorNotImplemented : function(operator, arg) {
			throw "Operator `" + operator.toString()
					+ "` does not implemented.\n" + "There is no `"
					+ arg.toString() + "` operator.";
		},
	},

	// ---------------------- METHODS ----------------------
	constructor : Vector,
	init : function() {
		this.data = [];
		var args = arguments['0'];
		for (i in args) {
			this.data.push(args[i]);
		}
		;
	},
	push : function(val) {
		this.data.push(val);
	},
	pop : function() {
		return this.data.pop();
	},
	size : function() {
		return this.data.length;
	},
	toString : function() {
		return this.data.toString();
	},
	add : function(val) {
		return this._byElementOperator("add", val);
	},
	sub : function(val) {
		return this._byElementOperator("sub", val);
	},
	div : function(val) {
		return this._byElementOperator("div", val);
	},
	mult : function(val) {
		return this._byElementOperator("mult", val);
	},
	sum : function() {
		for(var i = 0, s = 0; i < this.size(); s += this.data[i++]);
		return s;
	},
	scalarMult: function(val) {
		return this.mult(val).sum();
	},
	_byElementOperator : function(operatorType, val) {
		if (this.operators[operatorType] === undefined) {
			this.exceptions.operatorNotImplemented("Vector._byElementOperator",
					val);
		}
		;
		var result = new Vector();
		var operatorName = "Vector." + operatorType.toString();
		if (val instanceof Vector) {
			if (val.size() == this.size()) {
				for ( var i = 0; i < this.size(); i++) {
					result.push(this.operators[operatorType](this.data[i],
							val.data[i]));
				}
				;
			} else {
				this.exceptions.operatorArgumentDim(operatorName, val);
			}
			;
		} else {
			this.exceptions.operatorArgumentType(operatorName, val);
		}
		;
		return result;
	},
};

Vector.fn.init.prototype = Vector.fn;

var f = new Vector(1, 2, 3);
var g = new Vector(5, 6, 7);
console.log(f.scalarMult(g));