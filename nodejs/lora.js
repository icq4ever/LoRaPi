const RFM69 = require('rfm69radio');
const rfm69 = new RFM69();

rfm69.initialize({
	address: 1,
	encryptionKey : '0123456789abcdef',
	isRFM69HW : true,
	resetPin: 25,	// GPIO25 = 22
	interruptPin:  22, // GPIO22 = 15
	//verbose : true,
	powerLevelPercent : 20,
})
	.then(()=>{
		console.log('Initialized');
		rfm69.registerPacketReceivedCallback(cb1);
		rfm69.registerPacketReceivedCallback(cb2);
		return true;
	})
	.then(() => rfm69.readTemperature())
	.then((temp) => {
		console.log('Temp : ${temp}');
		rfm69.calibrateRadio();
		return true;
	})
	.then(() => {
		setInterval(() => {
			const toAddress = 2;
			console.log('sending packet to address ${toAddress}');
			rfm69.send({ toAddress:toAddress, payload: 'Hello ${timeStamp()}', attempts : 3, requireAck:true})
				.then((packet) => {
					console.log('Sent on attemp ${packet.attempts} after ${packet.ackTimestampe - packet.timestamp}ms');
					return true;
				})
				.catch(err => console.log(err));
		}, 3000);
		
		setTimeout(() => {
			rfm69.broadcast('Broadcast!!!')
				.then(() => {
					console.log('Sent broadcast');
					return true;
				})
				.catch(err => console.log(err));
			}, 2000);
			return true;
	})
	.catch(err => {
		console.log(`Error initializing radio: ${err}`);
		rfm69.shutdown();
	});


function cb1(packet){
	console.log('Packet received (callback1) from peer ${packet.senderAddress} "${packet.payload}" RSSI:${packet.rssi}');
}

function cb1(packet){
	console.log('Packet received (callback1) from peer ${packet.senderAddress} "${packet.payload}" RSSI:${packet.rssi}');
}
