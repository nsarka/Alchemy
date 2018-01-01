/*
	chat.js : Handles all socket.io events for chat
*/

'use strict'

// Treating it like a queue
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
		// All chat socket events here
		socket.on('chatSend', function (msg) {

			// Make sure they're logged in before sending any messages to the rest of the users
			if(	typeof socket.handshake.session.passport !== 'undefined' &&
				typeof socket.handshake.session.passport.user !== 'undefined' &&
				typeof socket.handshake.session.passport.user.id !== 'undefined'
			) {

				// Grab their name and profile picture from the session
				var data = {
					msg: msg,
					name: socket.handshake.session.passport.user.displayName,
					pic: socket.handshake.session.passport.user.photos[1].value
				}
				updateRecent(data);
				io.sockets.emit('chatRcv', data);
			} else {
				socket.emit('chatRcv', {
					msg: 'Please log in before using the chat.'
				})
			}
		});

		socket.on('chatRecentReq', function () {
			socket.emit('chatRecentRes', recentChatMessages);
		});
	});
}