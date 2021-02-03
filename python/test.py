"""
Example for using the RFM69HCW Radio with Raspberry Pi.

Learn Guide: https://learn.adafruit.com/lora-and-lorawan-for-raspberry-pi
Author: Brent Rubell for Adafruit Industries
"""
# Import Python System Libraries
import time

lastTime = time.time_ns();

while True:
	if time.time_ns() - lastTime > 1000 * 1000 * 1000:
		print("tick!");
		lastTime = time.time_ns();
