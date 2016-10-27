require(["common"], function(common) {
	QUnit.module('common', {
		setup: function() {
			common.defaults.xBounds = -1;
			common.defaults.yBounds = 15;
			common.defaults.MAX_COORD = 60;
			common.defaults.MAX_INSTRUCTION = 60;
		}
	});

	QUnit.test('defaults()', function(assert) {
		assert.strictEqual(common.defaults.xBounds === 5, true, "assigning a negative number to bounds will return the default of 5");
		assert.strictEqual(common.defaults.yBounds === 15, true, "assigning a positive number to bounds will return the number");
		assert.strictEqual(common.defaults.MAX_COORD === 50, true, "assigning a value should fail thus returning the original value of 50");
		assert.strictEqual(common.defaults.MAX_INSTRUCTION === 100, true, "assigning a value should fail thus returning the original value of 100");
	});
	
	QUnit.test('isNumber()', function(assert) {
		assert.strictEqual(common.isNumber(null), false, "Null test");
		assert.strictEqual(common.isNumber(undefined), false, "undefined test");
		assert.strictEqual(common.isNumber("undefined"), false, "string test");
		assert.strictEqual(common.isNumber(16), true, "actual number");
		assert.strictEqual(common.isNumber(-1), true, "a negative number is still a number");
	});
	
	QUnit.test("cardinalPoints()", function(assert) {
		assert.strictEqual(common.cardinalPoints.points["N"], 0, "N is a point");
		assert.strictEqual(common.cardinalPoints.points["SE"], undefined, "SE is not a point");
		common.cardinalPoints.points["N"] = 15;
		assert.strictEqual(common.cardinalPoints.points["N"], 0, "assigning a value to a point should fail, as such this point value remains 0");
	});
});

require(["interface"], function(interface) {
	QUnit.module('interface', {
		setup: function() {
			
		}
	});

	QUnit.test('testInstructions()', function(assert) {
		assert.strictEqual(interface.testInstructions(""), false, "empty string is invalid");
		assert.strictEqual(interface.testInstructions("1 1 E \n RFRFRFRF"), false, "less than 3 lines is invalid");
		assert.strictEqual(interface.testInstructions("5 3 \n 1 1 E \n RFRFRFRF"), true, "3 or more lines is safe to try and process");
	});
});

require(["robotActions", "robot", "common"], function(robotActions, robotObj, common) {
	var bot1, bot2, bot3, bot4, bot5;
	
	QUnit.module('robotActions', {
		setup: function() {
			// reset these defaults since we tested with them earlier
			common.defaults.xBounds = 5;
			common.defaults.yBounds = 3;
			
			bot1 = new robotObj.robot("bot 1", 1, 1, "E", true);
			bot2 = new robotObj.robot("bot 2", 3, 2, "N", true);
			bot3 = new robotObj.robot("bot 3", 0, 3, "W", true);
		}
	});

	QUnit.test('instructBot()', function(assert) {
		console.log("1. bot1: %s, %s", bot1.isAlive, bot1.isAliveStr());
		assert.strictEqual(robotActions.instructBot(bot1, "RFRFRFRF").toString(), "1 1 E", "Test: 1 1 E");
		console.log("2. bot1: %s, %s", bot1.isAlive, bot1.isAliveStr());
		
		console.log("1. bot2: %s, %s", bot2.isAlive, bot2.isAliveStr());
		assert.strictEqual(robotActions.instructBot(bot2, "FRRFLLFFRRFLL").toString(), "3 3 N LOST", "Test: 3 2 N");
		console.log("2. bot2: %s, %s", bot2.isAlive, bot2.isAliveStr());
		
		console.log("1. bot3: %s, %s", bot3.isAlive, bot3.isAliveStr());
		assert.strictEqual(robotActions.instructBot(bot3, "LLFFFLFLFL").toString(), "2 3 S", "Test: 0 3 W");
		console.log("2. bot3: %s, %s", bot3.isAlive, bot3.isAliveStr());
	});
	
	QUnit.module('robot', {
		setup: function() {
			bot4 = new robotObj.robot("bot 4", 0, 3, "W", true);
			bot5 = new robotObj.robot("bot 5", 0, 3, "W", "random string");
		}
	});
		
	QUnit.test('Test Robot Object Methods/Properties', function(assert) {
		assert.strictEqual(bot4.isAliveStr(), "", "If isAlive property is true then the isAliveStr property returns an empty string");
		
		bot4.isAlive = false;
		assert.strictEqual(bot4.isAliveStr(), " LOST", "If isAlive property is false then the isAliveStr property returns 'LOST'");
		
		bot4.isAlive = "random string";
		assert.strictEqual(bot4.isAlive, true, "Passing a string to 'isAlive' propertyshould default it to true");
		assert.strictEqual(bot5.isAlive, true, "Passing a string to 'isAlive' in the constructor should default it to true");
	});
});