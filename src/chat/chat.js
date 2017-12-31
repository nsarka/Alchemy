/*
	chat.js : Handles all socket.io events
*/

'use strict'

// Treating it as a queue
var recentChatMessages = []

// Helper functions
function updateRecent(data) {
	recentChatMessages.push(data);

	if(recentChatMessages.length > 12) {
		// Removes the first entry in the array and shifts the rest left by one
		recentChatMessages.shift();
	}
}

exports = module.exports = function(io) {
	io.sockets.on('connection', function (socket) {
		socket.on('chatSend', function (data) {
			updateRecent(data);
			io.sockets.emit('chatRcv', data);
		});

		socket.on('getRecentChatMessages', function (data) {
			io.sockets.emit('recentChatMessages', recentChatMessages);
		});
	});
}