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
		indexOutOfRange : function(operator, arg) {
			throw "Index in `" + operator.toString()
					+ "` is out of range.\nArgument: " + arg.toString();
		}
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
	toString : function() {
		return this.data.toString();
	},
	// ----------------------- STACK -----------------------
	push : function(val) {
		this.data.push(val);
	},
	pop : function() {
		return this.data.pop();
	},
	size : function() {
		return this.data.length;
	},
	// ---------------------- ACCESS -----------------------
	at : function(index) {
		if (this.checkIndex(index)) {
			return this.data[index];
		} else {
			this.exceptions.indexOutOfRange("at", index);
		}
		;
	},
	set : function(index, value) {
		if (this.checkIndex(index)) {
			this.data[index] = value;
		} else {
			this.exceptions.indexOutOfRange("at", index);
		}
		;
		return this;
	},
	checkIndex : function(index) {
		return index < this.size() && index >= 0;
	},
	// -------------------- ARITHMETIC ---------------------
	add : function(val) {
		return this.operatorConvolution("add", val);
	},
	sub : function(val) {
		return this.operatorConvolution("sub", val);
	},
	div : function(val) {
		return this.operatorConvolution("div", val);
	},
	mult : function(val) {
		return this.operatorConvolution("mult", val);
	},
	sum : function() {
		for ( var i = 0, s = 0; i < this.size(); s += this.data[i++])
			;
		return s;
	},
	scalarMult : function(val) {
		return this.mult(val).sum();
	},
	vectorMult : function(val) {
		if (val.size() == this.size() && this.size() == 3) {
			return new Vector(this.at(1) * val.at(2) - this.at(2) * val.at(1),
					this.at(2) * val.at(0) - this.at(0) * val.at(2), this.at(0)
							* val.at(1) - this.at(1) * val.at(0));
		} else {
			this.exceptions.operatorArgumentDim("vectorMult", val);
		}
		;
	},

	// ---------------------- SPECIAL ----------------------
	/**
	 * By element convolution using operator function as base
	 * @argument operator - string id of embeded operator of functional
	 *           reference of 2 argumental function
	 * @argument val - other vector for convolution
	 */
	operatorConvolution : function(operator, val) {
		var _action;
		if (operator instanceof Function) {
			_action = operator;
		} else if (this.operators[operator] === undefined) {
			this.exceptions.operatorNotImplemented(
					"Vector.operatorConvolution", val);
		} else {
			_action = this.operators[operator];
		}
		;
		var result = new Vector();
		var operatorName = "Vector." + operator.toString();
		if (val instanceof Vector) {
			if (val.size() == this.size()) {
				for ( var i = 0; i < this.size(); i++) {
					result.push(_action(this.data[i], val.data[i]));
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

exports.Vector = Vector;