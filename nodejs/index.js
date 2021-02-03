var i2c = require('i2c-bus');
var font = require('oled-font-5x7');
i2cBus = i2c.openSync(1);
oled = require('oled-i2c-bus');

var opts = {
	width:128,
	height: 32,
	address:0x3C	// check with $ i2cdetect -y 1 (sudo apt install i2c-tools)
};

try {
	var oled = new oled(i2cBus, opts);

	printStringWithCursorPos('Hello', 1, 1);
} catch(err){			
	// print an error message and terminate te application
	console.log(err.message);
	process.exit(1);
}

function printStringWithCursorPos(st, w, h){
	oled.clearDisplay();
	oled.turnOnDisplay();
	oled.setCursor(w, h);
	oled.writeString(font, 1, st, 1, true);
}
