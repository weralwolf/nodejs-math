var Matrix = function(rows, columns, data) {
	this.data = data;
	this.rows = rows;
	this.columns = columns;

	this.errors = {
		nonQuadratic : function() {
			return undefined;
		},
		outOfRange : function() {
			return undefined;
		},
		illegalOperation : function() {
			return undefined;
		}
	};

	this.invertible = function() {
		var A = this.adjugate();
		A.multiply(1 / this.det());
		return A;
	};

	this.multiply = function(val) {
		if (val instanceof Number) {
			for ( var i = 0; i < this.rows; i++) {
				for ( var j = 0; j < this.columns; j++) {
					this.data[i][j] *= val;
				}
				;
			}
			;
		} else if (val instanceof Vector) {
			// vector multiplication
		} else if (val instanceof Matrix) {
			// matrix multiplication
		} else {
			return this.errors.illegalOperation();
		}
		;
	};

	this.adjugate = function() {
		var data = [];
		for ( var i = 0; i < this.rows; i++) {
			var row = [];
			for ( var j = 0; j < this.columns; j++) {
				row.push(this.cofactor(i, j));
			}
			;
			data.push(row);
		}
		;
		return new Matrix(this.rows, this.columns, data);
	};

	this.cofactor = function(i, j) {
		if (this.rows == 1 && this.columns == 1)
			return this.data[0][0];

		var data = [];
		for ( var n = 0; n < this.rows; n++) {
			var row = [];
			if (n == i)
				continue;
			for ( var m = 0; m < this.columns; m++) {
				if (m == j)
					continue;
				row.push(this.data[n][m]);
			}
			;
			data.push(row);
		}
		;
		M = new Matrix(this.rows - 1, this.columns - 1, data);
		return (((i + j) % 2 == 0) ? 1 : -1) * M.det();
	};

	this.det = function() {
		if (this.rows != this.columns) {
			return this.errors.nonQuadratic();
		}
		if (this.rows == 2)
			return this.data[0][0] * this.data[1][1] - this.data[0][1]
					* this.data[1][0];
		var det = 0.;
		for ( var i = 0; i < this.rows; i++) {
			det += this.data[0][i] * this.cofactor(0, i);
		}
		;
		return det;
	};

	this.toString = function() {
		var str = '';
		for(var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.columns; j++) {
				str += data[i][j].toString() + ' ';
			};
			str += '\n';
		};
		return str;
	};
};

var M = new Matrix(2, 2, [ [ 1, 0 ], [ 0, 1 ] ]);

console.log(M.det());
console.log(M.adjugate().toString());