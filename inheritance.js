
/**
 * Extending Child class with Parent properties and methods. 
 * This method do not create unused objects
 * @param Child - class to be extended
 * @param Parent - inherit class
 * @taken http://javascript.ru/tutorial/object/inheritance
 */
exports.inherit = function(Child, Parent) {
	var F = function() {
	};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.superclass = Parent.prototype;
};
//Rabbit.superclass.constructor.apply(this, arguments)


/**
 * Recursive checking instances of object
 * @param object - object to define parentage
 * @param constructor - candidate to parent
 * @returns {Boolean}
 */
exports.instanceOf = function(object, constructor) {
	var o = object;

	while (o.__proto__ != null) {
		if (o.__proto__ === constructor.prototype)
			return true;
		o = o.__proto__;
	}
	;
	return false;
};
